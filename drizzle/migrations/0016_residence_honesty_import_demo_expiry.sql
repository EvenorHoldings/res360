create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  show_demo_listings boolean not null default false,
  updated_at timestamptz not null default now());
grant select on public.site_settings to anon, authenticated; grant update on public.site_settings to authenticated; grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
drop policy if exists "public reads site settings" on public.site_settings;
create policy "public reads site settings" on public.site_settings for select using (true);
drop policy if exists "admin updates site settings" on public.site_settings;
create policy "admin updates site settings" on public.site_settings for update to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.site_settings (id) values (1) on conflict do nothing;

create or replace function public.show_demo_listings() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select show_demo_listings from public.site_settings where id = 1), false) $$;

alter table public.listings
  add column if not exists residence_type text check (residence_type in ('university_res','private_student_res','landlord_room','shared_house')),
  add column if not exists price_on_request boolean not null default false,
  add column if not exists nsfas_verified boolean not null default false;

alter table public.listings drop constraint if exists listings_status_check;
alter table public.listings add constraint listings_status_check check (status in ('pending','approved','rejected','stale'));

create or replace function public.guard_listing_changes() returns trigger
language plpgsql security definer set search_path = public as $$
BEGIN
  IF TG_OP='INSERT' THEN NEW.status='pending'; NEW.owner_id=auth.uid();
    IF NOT public.has_role(auth.uid(),'admin') THEN NEW.nsfas_verified=false; END IF;
    RETURN NEW; END IF;
  IF NOT public.has_role(auth.uid(),'admin') AND coalesce(current_setting('res360.trusted_status', true),'') <> 'on' THEN
    NEW.status=OLD.status; NEW.owner_id=OLD.owner_id; NEW.published_at=OLD.published_at; NEW.nsfas_verified=OLD.nsfas_verified;
  END IF;
  RETURN NEW;
END $$;

drop policy if exists "Anyone reads approved listings" on public.listings;
create policy "Anyone reads approved listings" on public.listings for select using (
  status = 'approved' and case when is_demo then public.show_demo_listings()
    else coalesce(last_confirmed_at, published_at, created_at) > now() - interval '30 days' end);

create or replace function public.confirm_listing_available(_listing uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.owns_listing(_listing, auth.uid()) then raise exception 'not allowed'; end if;
  perform set_config('res360.trusted_status','on', true);
  update public.listings set last_confirmed_at = now(),
    status = case when status = 'stale' then 'approved' else status end where id = _listing;
  perform set_config('res360.trusted_status','', true);
end $$;
revoke all on function public.confirm_listing_available(uuid) from public, anon;
grant execute on function public.confirm_listing_available(uuid) to authenticated;

create or replace function public.expire_stale_listings() returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  perform set_config('res360.trusted_status','on', true);
  with s as (
    update public.listings set status = 'stale'
    where status = 'approved' and not is_demo
      and coalesce(last_confirmed_at, published_at, created_at) <= now() - interval '30 days'
    returning id, owner_id, title)
  , a as (
    insert into public.alerts (recipient_user_id, listing_id, event_type, severity, channel, payload, dedupe_key, delivery_status)
    select owner_id, id, 'listing_stale', 'info', 'in_app',
      jsonb_build_object('title', title, 'message', 'Your listing is hidden from search until you confirm it is still available.'),
      'stale:' || id || ':' || to_char(now(),'YYYY-MM-DD'), 'pending' from s
    on conflict (dedupe_key) do nothing returning 1)
  select count(*) into n from s;
  perform set_config('res360.trusted_status','', true);
  return n;
end $$;
revoke all on function public.expire_stale_listings() from public, anon, authenticated;

create extension if not exists pg_cron;
select cron.schedule('res360-expire-stale-listings', '15 2 * * *', 'select public.expire_stale_listings()');

create or replace function public.import_directory_listings(_rows jsonb, _source text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb; i int := 0; ok int := 0; errs jsonb := '[]'::jsonb; cid uuid; nm text; price numeric; checked timestamptz;
begin
  if not public.has_role(auth.uid(),'admin') then raise exception 'not allowed'; end if;
  if _source not in ('admin_import','institution_directory') then raise exception 'invalid source'; end if;
  if jsonb_array_length(_rows) > 500 then raise exception 'max 500 rows per import'; end if;
  for r in select * from jsonb_array_elements(_rows) loop
    i := i + 1;
    begin
      nm := trim(r->>'name');
      if coalesce(nm,'') = '' or char_length(nm) > 120 then raise exception 'name is required (max 120 characters)'; end if;
      if coalesce(r->>'source_url','') !~ '^https?://' then raise exception 'source_url must be a web link'; end if;
      checked := nullif(trim(r->>'last_checked_at'),'')::timestamptz;
      if checked is null then raise exception 'last_checked_at is required'; end if;
      if coalesce(r->>'residence_type','') not in ('university_res','private_student_res','landlord_room','shared_house') then raise exception 'residence_type is not recognised'; end if;
      cid := null;
      select c.id into cid from public.campuses c join public.institutions ins on ins.id = c.institution_id
        where lower(ins.name) = lower(trim(r->>'institution')) and lower(c.name) = lower(trim(r->>'campus'));
      if cid is null then raise exception 'institution and campus not found'; end if;
      price := nullif(trim(r->>'price_from_zar'),'')::numeric;
      insert into public.listings (owner_id, title, location, province, institution, monthly_rent, price_on_request, description,
        residence_type, campus_id, lat, lng, beds, nsfas_accredited, source, verification_status, source_url, last_confirmed_at, status)
      values (auth.uid(), case when char_length(nm) < 5 then nm || ' residence' else nm end,
        left(coalesce(nullif(trim(r->>'address'),''), trim(r->>'campus')), 160), 'pending-geo', trim(r->>'institution'),
        coalesce(price, 0), price is null,
        'Directory entry imported from a published source. Contact the provider for fees and availability.',
        r->>'residence_type', cid, nullif(trim(r->>'lat'),'')::float8, nullif(trim(r->>'lng'),'')::float8,
        coalesce(nullif(trim(r->>'beds'),'')::int, 1), coalesce(nullif(trim(r->>'nsfas_accredited'),'')::boolean, false),
        _source, 'unverified', r->>'source_url', checked, 'pending');
      ok := ok + 1;
    exception when others then
      errs := errs || jsonb_build_object('row', i, 'error', sqlerrm);
    end;
  end loop;
  return jsonb_build_object('imported', ok, 'errors', errs);
end $$;
revoke all on function public.import_directory_listings(jsonb, text) from public, anon;
grant execute on function public.import_directory_listings(jsonb, text) to authenticated;

alter table public.listings disable trigger guard_listing;
alter table public.listings disable trigger phase2_listing_guard;
insert into public.listings (owner_id, title, location, province, institution, monthly_rent, description, residence_type,
  campus_id, city_id, lat, lng, beds, room_type, source, verification_status, is_demo, status, readiness_status, published_at)
select '00000000-0000-0000-0000-000000000000'::uuid,
  'DEMO ' || v.label || ' near ' || i.name, 'Demo address near ' || c.name || ' campus', 'pending-geo', i.name,
  v.rent, 'Demonstration listing for investor and partner presentations. This is not a real residence and cannot be booked.',
  v.rtype, c.id, c.city_id, c.lat + v.dlat, c.lng + v.dlng, v.beds, v.room::public.room_type, 'demo', 'unverified', true, 'approved', 'not_started', now()
from public.campuses c join public.institutions i on i.id = c.institution_id and i.kind = 'public_university'
cross join (values ('Residence A', 3800, 'private_student_res', 0.006, 0.004, 1, 'single'),
                   ('Shared House B', 2900, 'shared_house', -0.008, 0.007, 4, 'sharing')) v(label, rent, rtype, dlat, dlng, beds, room)
where c.is_main
  and not exists (select 1 from public.listings l where l.is_demo and l.campus_id = c.id and l.title = 'DEMO ' || v.label || ' near ' || i.name);
alter table public.listings enable trigger guard_listing;
alter table public.listings enable trigger phase2_listing_guard;
create table if not exists public.provinces (id smallint primary key, name text not null unique, code text not null unique);
grant select on public.provinces to anon, authenticated; grant all on public.provinces to service_role;
alter table public.provinces enable row level security;
drop policy if exists "public reads provinces" on public.provinces;
create policy "public reads provinces" on public.provinces for select using (true);
insert into public.provinces values
 (1,'Eastern Cape','EC'),(2,'Free State','FS'),(3,'Gauteng','GP'),(4,'KwaZulu-Natal','KZN'),
 (5,'Limpopo','LP'),(6,'Mpumalanga','MP'),(7,'Northern Cape','NC'),(8,'North West','NW'),(9,'Western Cape','WC')
 on conflict do nothing;

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  province_id smallint not null references public.provinces(id),
  name text not null, is_other boolean not null default false,
  unique (province_id, name));
grant select on public.cities to anon, authenticated; grant all on public.cities to service_role;
alter table public.cities enable row level security;
drop policy if exists "public reads cities" on public.cities;
create policy "public reads cities" on public.cities for select using (true);

create table if not exists public.city_aliases (
  alias text primary key,
  city_id uuid not null references public.cities(id) on delete cascade);
grant select on public.city_aliases to anon, authenticated; grant all on public.city_aliases to service_role;
alter table public.city_aliases enable row level security;
drop policy if exists "public reads city aliases" on public.city_aliases;
create policy "public reads city aliases" on public.city_aliases for select using (true);

alter table public.institutions
  add column if not exists kind text check (kind in ('public_university','tvet_college','private_institution')),
  add column if not exists is_national boolean not null default false,
  add column if not exists home_province_id smallint references public.provinces(id),
  add column if not exists official_url text,
  add column if not exists accreditation_ref text,
  add column if not exists last_verified_at timestamptz;

create table if not exists public.campuses (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  name text not null,
  city_id uuid not null references public.cities(id),
  lat double precision, lng double precision,
  is_main boolean not null default false,
  unique (institution_id, name));
grant select on public.campuses to anon, authenticated; grant all on public.campuses to service_role;
alter table public.campuses enable row level security;
drop policy if exists "public reads campuses" on public.campuses;
create policy "public reads campuses" on public.campuses for select using (true);

alter table public.listings
  add column if not exists city_id uuid references public.cities(id),
  add column if not exists campus_id uuid references public.campuses(id),
  add column if not exists province_id smallint references public.provinces(id),
  add column if not exists distance_to_campus_km numeric(6,2),
  add column if not exists source text not null default 'host_submitted'
    check (source in ('host_submitted','institution_directory','admin_import','demo')),
  add column if not exists verification_status text not null default 'unverified'
    check (verification_status in ('unverified','host_declared','res360_verified')),
  add column if not exists source_url text,
  add column if not exists last_confirmed_at timestamptz;

create or replace function public.haversine_km(a_lat float8,a_lng float8,b_lat float8,b_lng float8)
returns float8 language sql immutable set search_path = public as $$
  select 6371*2*asin(sqrt(power(sin(radians(b_lat-a_lat)/2),2)+
    cos(radians(a_lat))*cos(radians(b_lat))*power(sin(radians(b_lng-a_lng)/2),2)))$$;

create or replace function public.listings_sync_geo() returns trigger
language plpgsql set search_path = public as $$
declare c record; pname text; cname text;
begin
  if new.city_id is null and new.campus_id is not null then
    select city_id into new.city_id from public.campuses where id = new.campus_id;
  end if;
  if new.city_id is not null then
    select ci.province_id, ci.name, p.name into new.province_id, cname, pname
      from public.cities ci join public.provinces p on p.id = ci.province_id where ci.id = new.city_id;
    new.province := coalesce(pname, new.province);
    if new.city is null then new.city := cname; end if;
  end if;
  if new.campus_id is not null and new.lat is not null and new.lng is not null then
    select lat, lng into c from public.campuses where id = new.campus_id;
    if c.lat is not null then
      new.distance_to_campus_km := round(public.haversine_km(new.lat,new.lng,c.lat,c.lng)::numeric,2);
    end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_listings_sync_geo on public.listings;
create trigger trg_listings_sync_geo before insert or update of city_id,campus_id,lat,lng
  on public.listings for each row execute function public.listings_sync_geo();

-- cities
insert into public.cities (province_id, name) select p.id, v.city from (values
 ('Eastern Cape','Alice'),('Eastern Cape','Bhisho'),('Eastern Cape','Butterworth'),('Eastern Cape','East London'),('Eastern Cape','Gqeberha'),('Eastern Cape','Komani'),('Eastern Cape','Makhanda'),('Eastern Cape','Mthatha'),
 ('Free State','Bloemfontein'),('Free State','Phuthaditjhaba'),('Free State','Welkom'),
 ('Gauteng','Bedfordview'),('Gauteng','Carletonville / Randfontein'),('Gauteng','Ekurhuleni'),('Gauteng','Ga-Rankuwa'),('Gauteng','Johannesburg'),('Gauteng','Midrand'),('Gauteng','Pretoria'),('Gauteng','Roodepoort'),('Gauteng','Soshanguve'),('Gauteng','Soweto'),('Gauteng','Vanderbijlpark'),('Gauteng','Vereeniging'),
 ('KwaZulu-Natal','Durban'),('KwaZulu-Natal','KwaDlangezwa'),('KwaZulu-Natal','Ladysmith'),('KwaZulu-Natal','Pietermaritzburg'),('KwaZulu-Natal','Richards Bay'),('KwaZulu-Natal','Umlazi'),
 ('Limpopo','Mankweng'),('Limpopo','Polokwane'),('Limpopo','Thohoyandou'),
 ('Mpumalanga','Emalahleni'),('Mpumalanga','Mbombela'),('Mpumalanga','Siyabuswa'),
 ('Northern Cape','Kimberley'),
 ('North West','Klerksdorp'),('North West','Lichtenburg'),('North West','Mahikeng'),('North West','Potchefstroom'),('North West','Rustenburg / Brits'),
 ('Western Cape','Bellville'),('Western Cape','Cape Town'),('Western Cape','Claremont'),('Western Cape','George'),('Western Cape','Malmesbury'),('Western Cape','Stellenbosch'),('Western Cape','Tyger Valley'),('Western Cape','Wellington')
) v(prov, city) join public.provinces p on p.name = v.prov
on conflict (province_id, name) do nothing;
insert into public.cities (province_id, name, is_other) select id, 'Other town in ' || name, true from public.provinces
on conflict (province_id, name) do nothing;

insert into public.city_aliases (alias, city_id) select v.alias, c.id from (values
 ('Port Elizabeth','Gqeberha'),('Gqeberha (Port Elizabeth)','Gqeberha'),('Nelspruit','Mbombela'),('Nelspruit / Mbombela','Mbombela'),
 ('Grahamstown','Makhanda'),('Makhanda (Grahamstown)','Makhanda'),('Turfloop','Mankweng'),('Mankweng (Turfloop)','Mankweng'),
 ('Springs','Ekurhuleni'),('Germiston','Ekurhuleni'),('Ekurhuleni (Springs / Germiston)','Ekurhuleni'),('Qwaqwa','Phuthaditjhaba'),
 ('Queenstown','Komani'),('Witbank','Emalahleni'),('Mafikeng','Mahikeng')
) v(alias, city) join public.cities c on c.name = v.city and not c.is_other
on conflict (alias) do nothing;

-- institutions: kinds
update public.institutions set kind = 'public_university', home_province_id = p.id
  from public.provinces p where p.name = institutions.province and institutions.kind is null and institutions.name <> 'Other accredited college (TVET / private)';
update public.institutions set is_national = true where name = 'University of South Africa (Unisa)';

insert into public.institutions (name, province, sort_order, kind, home_province_id)
select v.name, p.name, 100 + row_number() over (), 'tvet_college', p.id from (values
 ('Eastern Cape','Buffalo City TVET College'),('Eastern Cape','Eastcape Midlands TVET College'),('Eastern Cape','Ikhala TVET College'),('Eastern Cape','Ingwe TVET College'),('Eastern Cape','King Hintsa TVET College'),('Eastern Cape','King Sabata Dalindyebo TVET College'),('Eastern Cape','Lovedale TVET College'),('Eastern Cape','Port Elizabeth TVET College'),
 ('Free State','Flavius Mareka TVET College'),('Free State','Goldfields TVET College'),('Free State','Maluti TVET College'),('Free State','Motheo TVET College'),
 ('Gauteng','Central Johannesburg TVET College'),('Gauteng','Ekurhuleni East TVET College'),('Gauteng','Ekurhuleni West TVET College'),('Gauteng','Sedibeng TVET College'),('Gauteng','South West Gauteng TVET College'),('Gauteng','Tshwane North TVET College'),('Gauteng','Tshwane South TVET College'),('Gauteng','Western TVET College'),
 ('KwaZulu-Natal','Coastal KZN TVET College'),('KwaZulu-Natal','Elangeni TVET College'),('KwaZulu-Natal','Esayidi TVET College'),('KwaZulu-Natal','Majuba TVET College'),('KwaZulu-Natal','Mnambithi TVET College'),('KwaZulu-Natal','Mthashana TVET College'),('KwaZulu-Natal','Thekwini TVET College'),('KwaZulu-Natal','Umfolozi TVET College'),('KwaZulu-Natal','Umgungundlovu TVET College'),
 ('Limpopo','Capricorn TVET College'),('Limpopo','Lephalale TVET College'),('Limpopo','Letaba TVET College'),('Limpopo','Mopani South East TVET College'),('Limpopo','Sekhukhune TVET College'),('Limpopo','Vhembe TVET College'),('Limpopo','Waterberg TVET College'),
 ('Mpumalanga','Ehlanzeni TVET College'),('Mpumalanga','Gert Sibande TVET College'),('Mpumalanga','Nkangala TVET College'),
 ('Northern Cape','Northern Cape Rural TVET College'),('Northern Cape','Northern Cape Urban TVET College'),
 ('North West','Orbit TVET College'),('North West','Taletso TVET College'),('North West','Vuselela TVET College'),
 ('Western Cape','Boland TVET College'),('Western Cape','College of Cape Town for TVET'),('Western Cape','False Bay TVET College'),('Western Cape','Northlink TVET College'),('Western Cape','South Cape TVET College'),('Western Cape','West Coast TVET College')
) v(prov, name) join public.provinces p on p.name = v.prov
where not exists (select 1 from public.institutions i where i.name = v.name);

-- public university campuses (unverified starting set)
insert into public.campuses (institution_id, name, city_id, is_main)
select i.id, v.campus, c.id, v.main from (values
 ('Cape Peninsula University of Technology','Bellville','Bellville','Western Cape',false),('Cape Peninsula University of Technology','Cape Town','Cape Town','Western Cape',true),('Cape Peninsula University of Technology','Mowbray','Cape Town','Western Cape',false),('Cape Peninsula University of Technology','Wellington','Wellington','Western Cape',false),
 ('Central University of Technology','Bloemfontein','Bloemfontein','Free State',true),('Central University of Technology','Welkom','Welkom','Free State',false),
 ('Durban University of Technology','Durban','Durban','KwaZulu-Natal',true),('Durban University of Technology','Pietermaritzburg','Pietermaritzburg','KwaZulu-Natal',false),
 ('Mangosuthu University of Technology','Umlazi','Umlazi','KwaZulu-Natal',true),
 ('Nelson Mandela University','Gqeberha','Gqeberha','Eastern Cape',true),('Nelson Mandela University','George','George','Western Cape',false),
 ('North-West University','Potchefstroom','Potchefstroom','North West',true),('North-West University','Mahikeng','Mahikeng','North West',false),('North-West University','Vanderbijlpark (Vaal Triangle)','Vanderbijlpark','Gauteng',false),
 ('Rhodes University','Makhanda','Makhanda','Eastern Cape',true),
 ('Sefako Makgatho Health Sciences University','Ga-Rankuwa','Ga-Rankuwa','Gauteng',true),
 ('Sol Plaatje University','Kimberley','Kimberley','Northern Cape',true),
 ('Stellenbosch University','Stellenbosch','Stellenbosch','Western Cape',true),('Stellenbosch University','Tygerberg','Cape Town','Western Cape',false),
 ('Tshwane University of Technology','Pretoria','Pretoria','Gauteng',true),('Tshwane University of Technology','Soshanguve','Soshanguve','Gauteng',false),('Tshwane University of Technology','Ga-Rankuwa','Ga-Rankuwa','Gauteng',false),('Tshwane University of Technology','Emalahleni','Emalahleni','Mpumalanga',false),('Tshwane University of Technology','Mbombela','Mbombela','Mpumalanga',false),('Tshwane University of Technology','Polokwane','Polokwane','Limpopo',false),
 ('University of Cape Town','Cape Town','Cape Town','Western Cape',true),
 ('University of Fort Hare','Alice','Alice','Eastern Cape',true),('University of Fort Hare','East London','East London','Eastern Cape',false),
 ('University of Johannesburg','Auckland Park','Johannesburg','Gauteng',true),('University of Johannesburg','Bunting Road','Johannesburg','Gauteng',false),('University of Johannesburg','Doornfontein','Johannesburg','Gauteng',false),('University of Johannesburg','Soweto','Soweto','Gauteng',false),
 ('University of KwaZulu-Natal','Durban','Durban','KwaZulu-Natal',true),('University of KwaZulu-Natal','Pietermaritzburg','Pietermaritzburg','KwaZulu-Natal',false),
 ('University of Limpopo','Mankweng (Turfloop)','Mankweng','Limpopo',true),
 ('University of Mpumalanga','Mbombela','Mbombela','Mpumalanga',true),('University of Mpumalanga','Siyabuswa','Siyabuswa','Mpumalanga',false),
 ('University of Pretoria','Pretoria','Pretoria','Gauteng',true),
 ('University of South Africa (Unisa)','Pretoria','Pretoria','Gauteng',true),
 ('University of Venda','Thohoyandou','Thohoyandou','Limpopo',true),
 ('University of Zululand','KwaDlangezwa','KwaDlangezwa','KwaZulu-Natal',true),('University of Zululand','Richards Bay','Richards Bay','KwaZulu-Natal',false),
 ('University of the Free State','Bloemfontein','Bloemfontein','Free State',true),('University of the Free State','Qwaqwa','Phuthaditjhaba','Free State',false),
 ('University of the Western Cape','Bellville','Bellville','Western Cape',true),
 ('University of the Witwatersrand','Johannesburg','Johannesburg','Gauteng',true),
 ('Vaal University of Technology','Vanderbijlpark','Vanderbijlpark','Gauteng',true),
 ('Walter Sisulu University','Mthatha','Mthatha','Eastern Cape',true),('Walter Sisulu University','Butterworth','Butterworth','Eastern Cape',false),('Walter Sisulu University','Komani','Komani','Eastern Cape',false),('Walter Sisulu University','East London','East London','Eastern Cape',false)
) v(inst, campus, city, prov, main)
join public.institutions i on i.name = v.inst
join public.provinces p on p.name = v.prov
join public.cities c on c.name = v.city and c.province_id = p.id
on conflict (institution_id, name) do nothing;

-- backfill + unmatched log
create table if not exists public.geo_backfill_unmatched (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null unique,
  province_text text, city_text text, institution_text text, reason text not null,
  created_at timestamptz not null default now(), resolved_at timestamptz);
grant select, update on public.geo_backfill_unmatched to authenticated; grant all on public.geo_backfill_unmatched to service_role;
alter table public.geo_backfill_unmatched enable row level security;
drop policy if exists "admins manage unmatched geo" on public.geo_backfill_unmatched;
create policy "admins manage unmatched geo" on public.geo_backfill_unmatched for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

update public.listings l set city_id = c.id
  from public.cities c join public.provinces p on p.id = c.province_id
  where l.city_id is null and p.name = l.province
    and (c.name = l.city or c.id = (select a.city_id from public.city_aliases a where a.alias = l.city));
insert into public.geo_backfill_unmatched (listing_id, province_text, city_text, institution_text, reason)
  select id, province, city, institution, 'No canonical city match' from public.listings where city_id is null
  on conflict (listing_id) do nothing;

create or replace function public.get_data_health() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.has_role(auth.uid(),'admin') then raise exception 'not allowed'; end if;
  return jsonb_build_object(
    'institutions_without_campus', (select count(*) from institutions i where i.kind is not null and not exists (select 1 from campuses c where c.institution_id = i.id)),
    'campuses_without_coordinates', (select count(*) from campuses where lat is null or lng is null),
    'listings_without_province', (select count(*) from listings where province_id is null),
    'duplicate_city_names', (select count(*) from (select lower(name) from cities where not is_other group by lower(name), province_id having count(*) > 1) d),
    'listings_city_campus_province_mismatch', (select count(*) from listings l join cities lc on lc.id = l.city_id join campuses cp on cp.id = l.campus_id join cities cc on cc.id = cp.city_id where lc.province_id <> cc.province_id),
    'cities_without_province', (select count(*) from cities where province_id is null),
    'unmatched_listings', (select count(*) from geo_backfill_unmatched where resolved_at is null));
end $$;
revoke all on function public.get_data_health() from public, anon;
grant execute on function public.get_data_health() to authenticated;
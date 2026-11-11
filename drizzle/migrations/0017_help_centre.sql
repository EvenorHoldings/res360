create table if not exists public.help_categories (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  audience text not null default 'all' check (audience in ('student','landlord','all')), sort int default 0);
create table if not exists public.help_articles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.help_categories(id) on delete set null,
  question text not null, answer_md text not null,
  audience text not null default 'all' check (audience in ('student','landlord','all')),
  status text not null default 'draft' check (status in ('draft','published')),
  helpful_yes int not null default 0, helpful_no int not null default 0,
  sort int default 0, updated_at timestamptz not null default now());
create unique index if not exists help_articles_question_key on public.help_articles (question);
grant select on public.help_categories, public.help_articles to anon, authenticated;
grant insert, update, delete on public.help_categories, public.help_articles to authenticated;
grant all on public.help_categories, public.help_articles to service_role;
alter table public.help_categories enable row level security;
alter table public.help_articles enable row level security;
drop policy if exists "public reads help categories" on public.help_categories;
create policy "public reads help categories" on public.help_categories for select using (true);
drop policy if exists "public reads published help" on public.help_articles;
create policy "public reads published help" on public.help_articles for select using (status = 'published');
drop policy if exists "admin manages categories" on public.help_categories;
create policy "admin manages categories" on public.help_categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
drop policy if exists "admin manages help" on public.help_articles;
create policy "admin manages help" on public.help_articles for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- one vote per article per browser session
create table if not exists public.help_votes (
  article_id uuid not null references public.help_articles(id) on delete cascade,
  session_id text not null check (char_length(session_id) between 16 and 64),
  helpful boolean not null, created_at timestamptz not null default now(),
  primary key (article_id, session_id));
grant all on public.help_votes to service_role;
alter table public.help_votes enable row level security;

create or replace function public.vote_help_article(_article uuid, _helpful boolean, _session text) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not exists (select 1 from help_articles where id = _article and status = 'published') then return false; end if;
  if (select count(*) from help_votes where session_id = _session and created_at > now() - interval '1 hour') >= 30 then return false; end if;
  insert into help_votes (article_id, session_id, helpful) values (_article, _session, _helpful) on conflict do nothing;
  get diagnostics n = row_count;
  if n = 0 then return false; end if;
  update help_articles set helpful_yes = helpful_yes + (case when _helpful then 1 else 0 end),
    helpful_no = helpful_no + (case when _helpful then 0 else 1 end) where id = _article;
  return true;
end $$;
revoke all on function public.vote_help_article(uuid, boolean, text) from public;
grant execute on function public.vote_help_article(uuid, boolean, text) to anon, authenticated;

alter table public.site_settings add column if not exists emergency_contacts jsonb not null default
  '[{"label":"Police (SAPS)","number":"10111"},{"label":"Ambulance and fire","number":"10177"},{"label":"Emergency from any mobile","number":"112"}]'::jsonb;

-- seed categories
insert into public.help_categories (slug, title, audience, sort) values
 ('finding-a-room','Finding a room','student',1),('rent-and-budgeting','Rent and budgeting','student',2),
 ('listing-a-space','Listing a space','landlord',3),('accounts','Accounts','all',4),
 ('safety-and-reports','Safety and reports','all',5),('about-res360','About Res360','all',6)
on conflict (slug) do nothing;

insert into public.help_articles (category_id, question, answer_md, audience, status, sort)
select c.id, v.q, v.a, v.aud, v.st, v.s from (values
 ('finding-a-room','How do I search by province, city or campus?','Choose a province first. The city list then shows only towns in that province, and the institution list shows only universities and colleges there. If you pick an institution with one campus, the province and city fill in for you. If it has several campuses, an optional Campus box appears. You can also type a city or a nickname such as "Wits", "UCT" or "Port Elizabeth" in the search box.','student','published',1),
 ('finding-a-room','What do the filters mean (price, room type, move-in month, distance to campus)?','Maximum monthly rent hides rooms above your budget. Room type is single, sharing, studio or bachelor. Move-in month hides rooms that only become available after that month. Max campus distance keeps rooms within the distance you choose from the selected campus. Residences that ask you to contact the provider for fees are not hidden by the rent filter.','student','published',2),
 ('finding-a-room','How is distance to campus calculated?','It is the straight-line distance between the residence''s map position and the campus''s map position. Walking or driving distance will usually be longer. Campus positions are being checked by our team, so treat distances as a guide.','student','published',3),
 ('finding-a-room','What does "approved listings only" mean?','Search only shows residences our team has approved. New submissions stay private until they are reviewed, and listings are hidden again if the host does not confirm availability every 30 days.','student','published',4),
 ('finding-a-room','What do LGBTQ+ Friendly, Pet Friendly and Special Needs Accessible mean, and who decides a listing carries them?','These tags are chosen by the host when they list the space. [CONFIRM] Res360 does not yet independently check them, so ask the host about anything important to you before you sign.','student','draft',5),
 ('finding-a-room','What does the NSFAS-accredited filter mean and how is it verified?','The filter only shows residences our team has verified as NSFAS-accredited. If a host says they are accredited but we have not checked it yet, the listing shows "NSFAS: host-declared" instead. [CONFIRM] how Res360 staff verify accreditation with NSFAS.','student','draft',6),
 ('finding-a-room','How do I save a listing and compare options?','Sign in, then tap the heart on any residence card. Your saved residences appear on the Saved page so you can compare them.','student','published',7),
 ('finding-a-room','Why can''t I find rooms near my campus?','There may not be approved residences near that campus yet. Try a wider distance, remove some filters, or choose "Any city in this province". Listings appear only after approval and must be reconfirmed every 30 days.','student','published',8),
 ('rent-and-budgeting','How does the rent calculator work?','Enter the monthly rent, how many months you will stay, any deposit and how many people share. It shows the total for your stay (rent times months plus deposit), what you pay up front (first month plus deposit), the cost per person and the yearly rent.','student','published',1),
 ('rent-and-budgeting','What costs should I budget beyond monthly rent?','Common extras are the deposit, electricity and water if not included, Wi-Fi, transport to campus, food and laundry. [CONFIRM] typical deposit rules and any NSFAS allowance amounts.','student','draft',2),
 ('listing-a-space','How do I list a room or residence?','Choose "List Your Space" on the home page, sign in, and fill in the title, location, province, city, nearest institution, monthly rent and a description. Your space is saved as pending and stays private until our team approves it.','landlord','published',1),
 ('listing-a-space','How long does approval take and what is checked?','[CONFIRM] expected approval time. Our team reviews the details you submitted and the residence''s readiness information before a listing can be published.','landlord','draft',2),
 ('listing-a-space','Why was my listing rejected or hidden?','A listing can be rejected during review, or hidden from search if you have not confirmed it is still available in the last 30 days. Open your residence page and choose "Confirm still available" to bring it back.','landlord','published',3),
 ('listing-a-space','How do I confirm my listing is still available?','Sign in and open your residence page. Choose "Confirm still available". You need to do this at least every 30 days, or the listing is hidden from search until you confirm.','landlord','published',4),
 ('listing-a-space','Which photos and details are required?','The form needs a title, location, province, monthly rent and a description of at least 20 characters. [CONFIRM] photo requirements; document uploads are switched off until virus checking is set up.','landlord','draft',5),
 ('accounts','How do I sign up and log in?','Use the Sign up page with your email address and a password, then confirm your email from the message we send you. After that, log in on the Login page.','all','published',1),
 ('accounts','How do I get the Student Verified badge?','Sign up with your university or college email address ending in .ac.za. Once you confirm that email, your account is marked as student verified.','student','published',2),
 ('accounts','How do I reset my password or delete my account and data?','[CONFIRM] Password reset and account deletion are not yet available in the app. Contact us through the Contact page and we will help.','all','draft',3),
 ('safety-and-reports','How do I report a listing or a safety concern?','Sign in and open the Safety centre. Choose a category and urgency, describe what happened and choose who may see it. Your report is encrypted and only assigned safety staff can read it.','all','published',1),
 ('safety-and-reports','What happens after I submit a report?','A safety team member is assigned and updates its status. You can follow progress on the My reports page. [CONFIRM] response times and what is shared with the landlord.','all','draft',2),
 ('safety-and-reports','Where do I find emergency contacts?','If you are in danger, call Police (SAPS) on 10111, ambulance and fire on 10177, or 112 from any mobile phone. [CONFIRM] campus security numbers.','all','draft',3),
 ('about-res360','Is Res360 the same as Residence24?','Yes. Residence24 is the earlier name of the same service. Existing accounts and listings carried over to Res360.','all','published',1),
 ('about-res360','Is my personal information safe (POPIA)?','We collect only what the service needs and explain how in our Privacy page. Safety reports are encrypted. [CONFIRM] information officer details and retention periods.','all','draft',2),
 ('about-res360','How does Res360 make money?','[CONFIRM] See the Pricing page for current plans.','all','draft',3),
 ('about-res360','How do I contact support?','Use the Contact page. For urgent safety concerns, use the Safety centre.','all','published',4)
) v(cat, q, a, aud, st, s)
join public.help_categories c on c.slug = v.cat
on conflict (question) do nothing;
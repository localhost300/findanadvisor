create table public.advisor_verification_reports (
  id uuid primary key default gen_random_uuid(),
  advisor_reference text not null check (char_length(advisor_reference) between 2 and 300),
  issue_type text not null check (
    issue_type in ('inaccurate', 'outdated', 'registration', 'conduct', 'other')
  ),
  details text not null check (char_length(details) between 10 and 3000),
  reporter_email text,
  created_at timestamptz not null default now()
);

create index advisor_verification_reports_created_at_idx
  on public.advisor_verification_reports (created_at desc);

alter table public.advisor_verification_reports enable row level security;

create policy "public submit advisor verification reports"
  on public.advisor_verification_reports
  for insert to anon, authenticated
  with check (true);

create policy "admins read advisor verification reports"
  on public.advisor_verification_reports
  for select
  using (public.is_admin());

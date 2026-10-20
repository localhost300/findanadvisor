delete from public.advisors where is_demo = true;

create table public.brokercheck_correction_reports (
  id uuid primary key default gen_random_uuid(),
  crd_number text not null check (crd_number ~ '^[0-9]{1,10}$'),
  message text not null check (char_length(message) between 10 and 2000),
  reporter_email text,
  created_at timestamptz not null default now()
);

create index brokercheck_correction_reports_created_at_idx
  on public.brokercheck_correction_reports (created_at desc);

alter table public.brokercheck_correction_reports enable row level security;

create policy "public submit BrokerCheck correction reports"
  on public.brokercheck_correction_reports
  for insert to anon, authenticated
  with check (true);

create policy "admins read BrokerCheck correction reports"
  on public.brokercheck_correction_reports
  for select
  using (public.is_admin());

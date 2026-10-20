# Findanadvisor

Findanadvisor is a Next.js App Router and TypeScript site for browsing public
financial-professional records, with Supabase integration for application
features and Resend email delivery for broker contact forms.

The public `/advisors` directory and `/brokers/[crd]` profiles use the sourced
records in `lib/brokercheck-data.ts`. The advisor match questionnaire filters
those records by available registration, location, and experience information.
It does not infer planning specialties, fees, or other details not present in
the source summaries.

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project for database-backed features
- A Resend account and verified sender domain to enable broker contact forms

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the environment variables you intend to use; see below.
4. Run `npm run dev` and open `http://localhost:3000`.

`.env.local` is ignored by Git. Never commit API keys, database passwords, or
other secrets.

## Supabase setup

Create a Supabase project, then run the migrations in order from the Supabase
SQL Editor:

1. `supabase/migrations/202610040001_initial_schema.sql`
2. `supabase/migrations/202610200001_brokercheck_records_and_reports.sql`
3. `supabase/migrations/202610200002_advisor_verification_reports.sql`

The initial migration creates the application schema, views, storage buckets,
and row-level security policies. The BrokerCheck migration removes rows marked
`is_demo = true` and creates the table used for directory correction reports.
Review migration effects and back up important data before applying them to an
existing project.

Add the project URL and public anonymous key to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` is only for trusted server-side maintenance if
needed. Never expose it with a `NEXT_PUBLIC_` prefix or use it in client code.

`supabase/seed.sql` adds shared reference values; it does not create advisor
profiles. The public BrokerCheck list is maintained in
`lib/brokercheck-data.ts`.

## Broker contact email

The broker contact form is disabled until a broker has a unique recipient
address and Resend is configured. In Resend, verify a dedicated sending
subdomain such as `send.findanadvisor.icu`, then add the DNS records Resend
provides without replacing LyteHosting's existing root-domain email records.
Create an API key with email-sending permission and set the sender to an
address on the verified subdomain. The example recipient mapping routes Tina
Renee Graves (CRD 5889228) to `info@findanadvisor.icu`. Set:

```env
RESEND_API_KEY=YOUR_RESEND_API_KEY
RESEND_FROM_EMAIL="Findanadvisor <contact@send.findanadvisor.icu>"
BROKERCHECK_CONTACT_EMAILS={"5889228":"info@findanadvisor.icu"}
```

`BROKERCHECK_CONTACT_EMAILS` maps CRD numbers to recipient addresses. Every
address must be valid, every CRD must exist in the directory, and no email
address may be assigned to more than one broker. Messages are sent only to the
address mapped to the submitted broker's CRD. Keep these values private and
configure them in the deployment provider's environment settings as well as
locally. Never commit or share the Resend API key. Resend must verify the
sender domain before it accepts messages from that sender.

## Admin setup

1. Configure Supabase Email/Password authentication.
2. Create a user in Supabase Authentication.
3. Promote the account to administrator in the SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

Admin authorization is checked server-side in `app/admin/layout.tsx`; row-level
security independently protects database operations.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy

Import the repository into your hosting provider and configure the required
environment variables there. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS
origin. Add the production origin and authentication callbacks to the Supabase
redirect allowlist. Configure the Resend environment variables in the hosting
provider and redeploy before enabling broker contact forms.

## Data and source notes

The public directory is a noncommercial investor-protection resource. Records
are reformatted from FINRA BrokerCheck; verify current details with the official
record linked from each profile. The retrieval date and source-use notice are
shown in the directory. Keep the source links, correction-report mechanism,
and retrieval date current.

## Project layout

- `app/`: Next.js routes, API handlers, and pages
- `components/`: Shared UI and advisor-directory components
- `lib/`: Data, Supabase clients, utilities, and BrokerCheck records
- `supabase/migrations/`: Ordered database migrations
- `supabase/seed.sql`: Shared development reference data
- `public/`: Static assets, including the favicon

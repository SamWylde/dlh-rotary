# dlh-rotary

Rotary Club of Downtown Lock Haven website built with Payload CMS 3, Next.js 15, Neon Postgres, and Vercel Blob.

## Stack

- Next.js 15 (App Router)
- Payload CMS 3
- Postgres adapter (`@payloadcms/db-postgres`) for Neon
- Vercel Blob storage adapter (`@payloadcms/storage-vercel-blob`)
- Resend email adapter (`@payloadcms/email-resend`)

## Local setup

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Copy env file and fill values:

```bash
cp .env.example .env
```

3. Generate payload artifacts (already generated in repo, safe to rerun):

```bash
npm run generate:importmap
npm run generate:types
```

4. Start dev server:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Seed

Seed route:

- `POST /next/seed`
- Header: `x-seed-secret: <SEED_SECRET>` if `SEED_SECRET` is set
- Optional query: `?force=true`

Or enable on init:

- `RUN_SEED_ON_INIT=true`
- Optional `SEED_FORCE=true`

Seed behavior:

- idempotent upserts for users/pages/projects/events/announcements
- requires `SEED_DEFAULT_PASSWORD`
- run-once guard via `site-settings.seedCompletedAt`

## Quality checks

```bash
npx tsc --noEmit
npm run build
```

`npm run build` requires a syntactically valid Vercel Blob token format in env, e.g.:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_<store_id>_<secret>
```

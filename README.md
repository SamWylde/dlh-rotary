# Rotary Club of Downtown Lock Haven

Official website for the Rotary Club of Downtown Lock Haven, serving Clinton County, Pennsylvania for over 22 years.

**Live site:** [dlh-rotary.vercel.app](https://dlh-rotary.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| **CMS** | [Payload CMS 3.x](https://payloadcms.com/) — headless CMS with built-in admin panel |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, server components) |
| **Database** | PostgreSQL via [Neon](https://neon.tech/) (`@payloadcms/db-postgres`) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) (CSS-first config) + [shadcn/ui](https://ui.shadcn.com/) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **File Storage** | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (`@payloadcms/storage-vercel-blob`) |
| **Email** | [Resend](https://resend.com/) (`@payloadcms/email-resend`) |
| **Fonts** | Google Fonts — Libre Baskerville (headings), DM Sans (body) |

## Features

- CMS-managed pages, events, announcements, projects, and documents
- Server-side theming system driven by Payload CMS globals (multiple themes)
- RSVP system for events
- Contact and interest forms
- SEO with auto-generated sitemaps and metadata
- Role-based access control (admin, editor, member)

## Local Setup

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

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `PAYLOAD_SECRET` | Secret key for Payload CMS (required in production) |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the site |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |
| `RESEND_API_KEY` | Resend email API key |
| `SEED_SECRET` | Secret for the seed API endpoint |
| `SEED_DEFAULT_PASSWORD` | Default password used during seeding |

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

## Project Structure

```
src/
├── app/(frontend)/     # Next.js frontend pages and layout
├── app/(payload)/      # Payload admin routes
├── collections/        # Payload CMS collection configs
├── components/         # React components (layout, forms, home, etc.)
├── lib/                # Utilities (auth, content queries, metadata)
└── payload.config.ts   # Payload CMS configuration
public/
└── themes/             # CSS theme files loaded by ThemeLoader
```

## Quality Checks

```bash
npx tsc --noEmit
npm run build
```

`npm run build` requires a syntactically valid Vercel Blob token format in env, e.g.:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_<store_id>_<secret>
```

## License

All rights reserved. Maintained for the Rotary Club of Downtown Lock Haven.

# Rotary Club of Downtown Lock Haven — Implementation Status

## Original Spec: V2.1 (February 2026) | Status Updated: February 25, 2026

---

## IMPLEMENTATION STATUS LEGEND

- [x] = Fully implemented
- [~] = Partially implemented / stub
- [ ] = Not yet implemented

---

## CORE INFRASTRUCTURE

- [x] Next.js 15 (App Router)
- [x] Payload CMS 3.x (installed in /app)
- [x] Neon Postgres (free tier) via `@payloadcms/db-postgres`
- [x] Vercel Blob via `@payloadcms/storage-vercel-blob`
- [x] Tailwind CSS 4 (CSS-first config in globals.css)
- [x] Resend email adapter configured
- [x] Form Builder plugin configured
- [x] SEO plugin configured
- [x] Payload admin panel at /admin
- [x] Admin custom.scss with scoped Tailwind (no admin breakage)
- [x] Vercel deployment at dlh-rotary.vercel.app
- [x] Postgres schema push enabled (`push: true`)
- [x] `drizzle.config.ts` + `src/payload-generated-schema.ts` committed — use `npx dotenv-cli -e .env -- npx drizzle-kit push` locally when `push: true` fails to create new tables on Neon serverless

---

## PAYLOAD COLLECTIONS (8/8 created)

- [x] **Users** — Auth, roles (admin/officer/member), privacy fields, afterRead hook strips email/phone per showEmail/showPhone
- [x] **Pages** — Title, slug, membersOnly, content (richText), layout (blocks), featuredImage, versions/drafts
- [x] **Events** — All fields: date, endDate, eventType, location, description, speaker fields, RSVP config, ticket fields, recurring
- [x] **RSVPs** — event, user, eventUserKey (unique composite), status, guests, note, duplicate prevention hooks
- [x] **Announcements** — title, slug, content, publishedDate, author, priority, membersOnly, pinned, versions/drafts
- [x] **Projects** — All fields: category, status, gallery array, impactStats group, partners array, volunteerSignupEnabled
- [x] **Documents** — title, category, file, description, meetingDate (conditional), membersOnly
- [x] **Media** — alt, caption, isPublic, mime types, image sizes (thumbnail/card/hero)

### Pages layout blocks (7/7):

- [x] `heroBlock` — Eyebrow, heading, body, image, primary + secondary links
- [x] `contentBlock` — Heading + richText
- [x] `imageGalleryBlock` — Heading + image array with captions
- [x] `ctaBlock` — Heading, body, primary + secondary links
- [x] `officerGridBlock` — Officer directory embed with heading, limit, showEmail/showPhone toggles
- [x] `statsBlock` — Stats array (label, value, description)
- [x] `contactFormBlock` — Heading, intro richText, Form Builder form relationship

---

## PAYLOAD GLOBALS (3/3 created)

- [x] **SiteSettings** — All fields: clubName, tagline, logo, email, phone, address, presidentContact, meetingInfo, rotaryInfo, socialMedia (facebook + instagram + myRotaryLink), externalListings, donationLinks, forms (joinForm + contactForm), seedCompletedAt
- [x] **Theme** — activeTheme select (4 presets), customAccentColor override
- [x] **Navigation** — mainNav + footerNav arrays with linkField (internal/external + newTab)

---

## ACCESS CONTROL (6/6 functions)

- [x] isAdmin
- [x] isAdminOrOfficer
- [x] isAuthenticated
- [x] isAdminOrSelf
- [x] isAdminOrOfficerOrSelf
- [x] isAdminFieldAccess

---

## HOOKS (3/3)

- [x] **formatSlug** — beforeChange hook, auto-generates slug from title, respects manual slugs
- [x] **revalidateAfterChange / revalidateAfterDelete** — ISR revalidation for collections
- [x] **revalidatePageAfterChange / revalidatePageAfterDelete** — ISR revalidation for Pages

---

## SHARED FIELDS

- [x] **linkField** — Internal (page reference) + external URL, newTab checkbox

---

## SEED SCRIPT

- [x] Idempotent (checks seedCompletedAt at start, skips if already run unless force=true)
- [x] `seedCompletedAt` set at the **end** of script (after all content created), not mid-way
- [x] Uses SEED_DEFAULT_PASSWORD env var (no hardcoded passwords)
- [x] Seeds admin user: Thomas Darby (inducted Dec 9, 2025; sponsor: Cathy Ballat)
- [x] Seeds 7 officers with real names, titles, bios: Lisa Schropp, Janine Bruno, Wendy Stiver, Heather Lively, Carmen Banfill, Diahann Claghorn, Marianne Lotfi
- [x] Seeds 8 members with real names and bios: Cathy Ballat, Bonnie Hannis, Jeanne Baker, Emma Persun, Nate Akeley, Sue Packer, Haley Jolin, Trey Reeder
- [x] Seeds SiteSettings global with real club data (address, president contact, meeting info, Facebook + Instagram)
- [x] Seeds Theme and Navigation globals
- [x] Seeds 7 pages with **real content** (not placeholders): About (Four-Way Test, meeting format, Happy Dollars, press), Officers (2025-26 + 2026-27 slates), Scholarships (Roberta Way + Four-Way Test contest), Join Us, Contact (all real info), Support Us (flag sponsorship, Bingo, corporate), Documents
- [x] Seeds 8 projects with real descriptions: Flags of Honor (ceremony details, deadlines, musicians), Angel Lights, Bingo Fundraiser (KBR, Sep 27, basket donors), Valentine's Day Goody Trays (2026 deliveries, The Express coverage), Holiday Gift Bags for Veterans (30 bags, $418, locations), Roberta Way Scholarship, Four-Way Test Speech Contest, old Scholarships stub
- [x] Seeds 8 events: Weekly Club Meeting (recurring) + 6 Flags of Honor work sessions/ceremony/removal + Bingo Fundraiser (Sep 27, 2026)
- [x] Seeds 4 announcements: Welcome, Flags of Honor 2026 (America's 250th), DLH Rotary on The Express front page, Bingo rescheduled
- [x] Rich text fields use proper Lexical paragraph/heading format (h2, h3 helpers)
- [x] Triggered via onInit (RUN_SEED_ON_INIT=true) or POST /next/seed (requires SEED_SECRET header)
- [x] Seed route has error handling (returns JSON error on failure, not raw 500) and `maxDuration = 60`

---

## FRONTEND PAGES (17/19 pages exist)

- [x] `/` — Home page: hero section, upcoming events (5), recent announcements (3), CTA buttons
- [x] `/about` — Renders from Pages collection via getPageBySlug
- [x] `/officers` — Lists users with role=officer, shows name/title/email/phone
- [x] `/projects` — Grid of all published projects
- [x] `/projects/[slug]` — Project detail with impactStats, generateMetadata
- [x] `/events` — Upcoming events list with link to calendar
- [x] `/events/[slug]` — Event detail with RSVPControls, generateMetadata
- [x] `/announcements` — All announcements, pinned first
- [x] `/announcements/[slug]` — Announcement detail, generateMetadata
- [x] `/documents` — Members-only, download links via /api/documents/[id] proxy
- [x] `/scholarships` — Renders from Pages collection
- [x] `/members` — Members-only directory, respects showInDirectory/showEmail/showPhone
- [x] `/account` — Members-only, shows profile, links to /admin for editing
- [x] `/login` — LoginForm component with full auth flow
- [x] `/donate` — Donation links from SiteSettings.donationLinks
- [x] `/[slug]` — Catch-all for dynamic Pages, excludes reserved slugs, generateMetadata
- [x] `/events/calendar` — DayPilot Lite read-only month calendar with click-through to event detail pages
- [x] `/join` — Renders configured Payload Form Builder form from SiteSettings with validation
- [x] `/contact` — Contact info from SiteSettings + configured Form Builder form

---

## FRONTEND COMPONENTS

### Implemented:

- [x] `layout/SiteHeader` — Desktop nav, login/logout, branding
- [x] `layout/SiteFooter` — Contact email, footer nav links
- [x] `layout/MobileNav` — Hamburger menu, closes on navigation
- [x] `layout/ThemeLoader` — Loads theme CSS, applies customAccentColor (with XSS validation)
- [x] `layout/LogoutButton` — Client component, POST /api/users/logout
- [x] `events/RSVPControls` — Client component, yes/no/maybe toggle, calls /api/rsvp
- [x] `events/EventCard` — Extracted, used by /events and home Upcoming Events
- [x] `events/UpcomingEvents` — Extracted, used on homepage
- [x] `events/EventCalendar` — DayPilot Lite monthly calendar component
- [x] `announcements/AnnouncementCard` — Extracted, used by /announcements
- [x] `announcements/LatestAnnouncements` — Extracted, used on homepage
- [x] `members/LoginForm` — Email/password form, auth flow
- [x] `pages/blocks/HeroBlock` — Hero block renderer for dynamic page layouts
- [x] `pages/blocks/ContentBlock` — Content block renderer
- [x] `pages/blocks/OfficerGridBlock` — Officer grid embed renderer
- [x] `pages/blocks/StatsBarBlock` — Stats display renderer
- [x] `pages/blocks/CTASectionBlock` — CTA section renderer

### Not yet extracted (logic inlined in page files):

- [x] `projects/ProjectCard` - Extracted and used by `/projects`
- [x] `projects/ProjectGallery` - Extracted lightbox gallery component used by `/projects/[slug]`
- [x] `projects/ImpactStats` - Extracted and used by `/projects/[slug]`
- [x] `members/MemberCard` - Extracted and used by member directory
- [x] `members/MemberDirectory` - Extracted with URL-driven SSR filters (`q`, `role`)
- [x] `documents/DocumentList` - Extracted with URL-driven SSR filters (`category`, `q`)
- [x] `documents/DocumentCard` - Extracted and used by document list

### Not yet implemented:

- [x] `forms/ContactForm` - Shared Form Builder wrapper used by `/contact`
- [x] `forms/InterestForm` - Shared Form Builder wrapper used by `/join`
- [x] `forms/VolunteerSignup` - Per-project volunteer form renderer (uses `projects.volunteerForm`)
- [x] `payload/Logo` - Custom admin panel logo
- [x] `payload/Icon` - Custom admin panel sidebar icon

### shadcn/ui Components:

- [x] Installed in `src/components/ui`: button, card, badge, dialog, input, select, calendar, dropdown-menu, navigation-menu, avatar, sheet, tabs, separator, plus `sonner` (toast replacement) and `ui/toast` compatibility export.

**NOTE:** Many "missing" components have their logic inlined directly in page files. The site is fully functional — these are refactoring/UX improvements, not blockers.

---

## THEME CSS FILES

- [x] `/themes/rotary-classic.css` — Rotary Blue #17458F + Gold #F7A81B (default)
- [x] `/themes/modern-light.css` — Clean white/gray with blue accents
- [x] `/themes/modern-dark.css` — Dark mode with gold accents
- [x] `/themes/community-warm.css` — Warm earth tones

**NOTE:** Theme files exist in `public/themes/` and are loaded by ThemeLoader.

---

## API ROUTES

- [x] `POST /api/rsvp` — Create/update RSVP, auth required, NaN validation, duplicate prevention
- [x] `GET /api/documents/[id]` — Authenticated download proxy, filename sanitization, proper headers
- [x] `POST /next/seed` — Seed endpoint, requires SEED_SECRET header, returns JSON error on failure, maxDuration=60

---

## SECURITY HARDENING (Post-review fixes applied)

- [x] ThemeLoader XSS fix — validates hex color before CSS injection
- [x] Logout converted from `<Link>` to POST fetch (LogoutButton client component)
- [x] PAYLOAD_SECRET throws in production if unset
- [x] SEED_SECRET required on seed endpoint (403 if unconfigured)
- [x] Host-header trust removed from url.ts — uses env var or localhost only
- [x] Media read access restricted — members see only public media (not all)
- [x] RSVP event ID validated for NaN after numeric coercion
- [x] `rel="noopener noreferrer"` on all `target="_blank"` nav links
- [x] Em dash replaced with ASCII dash in generateMetadata titles
- [x] Filename sanitization in document download proxy
- [x] docker-compose.yml fixed (MongoDB -> PostgreSQL 16)
- [x] Error boundary (error.tsx) added
- [x] Loading spinner (loading.tsx) added
- [x] generateMetadata added to all dynamic route pages
- [x] Layout try-catch for graceful degradation on DB unavailability

---

## REMAINING WORK (prioritized)

### P1 — Should do before sharing with club:

1. **Upload Rotary logo** — Upload club logo to Media in /admin, set in SiteSettings.logo and SiteSettings.logoSimplified.
2. **Update placeholder emails** — Replace `@dlhrotary.org` and `@placeholder.com` emails with real addresses for officers and members (do this in /admin, not the seed).
3. **Configure join/contact forms** — Create Form Builder forms in /admin and link them in SiteSettings.forms.joinForm and SiteSettings.forms.contactForm.
4. **Scholarships page dollar amounts** — Update Scholarships page in /admin with actual dollar amounts and eligibility criteria when available.

### P2 — Polish / nice-to-have:

5. **Install shadcn/ui** - Completed on February 25, 2026 with the planned component set (`toast` delivered via sonner replacement).
6. **Extract standalone components** - Completed on February 25, 2026 for projects, members, and documents.
7. **Admin panel branding** - Completed on February 25, 2026 with custom Logo and Icon components in /admin.
8. **Notification system** - Completed on February 25, 2026. Announcement email notifications now send on first publish transition only.

### Deferred (post-launch):

9. **Custom domain** — Register dlhrotary.org, add to Vercel, update NEXT_PUBLIC_SERVER_URL.
10. **Resend email** — Add RESEND_API_KEY, verify domain for branded sending.
11. **Vercel Blob token** — Confirm BLOB_READ_WRITE_TOKEN is set before first media upload.

---

## ENVIRONMENT VARIABLES (Vercel)

| Variable | Status | Notes |
|---|---|---|
| DATABASE_URL | Set | Auto-created by Vercel Neon integration |
| PAYLOAD_SECRET | Set | Random 32-char string |
| NEXT_PUBLIC_SERVER_URL | Set | https://dlh-rotary.vercel.app |
| BLOB_READ_WRITE_TOKEN | Set | For Vercel Blob media storage |
| RESEND_API_KEY | Not set | Needed for email (password resets, form submissions) |
| SEED_SECRET | Set | Used to authenticate POST /next/seed |
| SEED_DEFAULT_PASSWORD | Set | Temporary password for all seeded users |
| RUN_SEED_ON_INIT | Set (true) | Can be removed or set to false now that seed has run |

---

## DATABASE NOTES

- Schema auto-pushed via `push: true` in postgres adapter on Payload startup
- When `push: true` fails to create new tables (common with Neon serverless + new block tables), run locally:
  ```
  npx payload generate:db-schema   # updates src/payload-generated-schema.ts
  npx dotenv-cli -e .env -- npx drizzle-kit push
  ```
- After schema changes, re-run seed if needed: `curl -X POST "https://dlh-rotary.vercel.app/next/seed?force=true" -H "x-seed-secret: <SEED_SECRET>"`
- The `forms_join_form_id` and `forms_contact_form_id` columns on `site_settings` were added manually after `push: true` missed them on initial deploy

---

*Original specification V2 by Thomas Darby — February 2026*
*Implementation by AI agent, reviewed and hardened February 25, 2026*
*Content populated with real club data February 25, 2026*

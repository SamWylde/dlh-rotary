# Rotary Club of Downtown Lock Haven â€” Implementation Status

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

---

## PAYLOAD COLLECTIONS (8/8 created)

- [x] **Users** â€” Auth, roles (admin/officer/member), privacy fields, afterRead hook strips email/phone per showEmail/showPhone
- [x] **Pages** â€” Title, slug, membersOnly, content, featuredImage, versions/drafts
- [x] **Events** â€” All fields: date, endDate, eventType, location, description, speaker fields, RSVP config, ticket fields, recurring
- [x] **RSVPs** â€” event, user, eventUserKey (unique composite), status, guests, note, duplicate prevention hooks
- [x] **Announcements** â€” title, slug, content, publishedDate, author, priority, membersOnly, pinned, versions/drafts
- [x] **Projects** â€” All fields: category, status, gallery array, impactStats group, partners array, volunteerSignupEnabled
- [x] **Documents** â€” title, category, file, description, meetingDate (conditional), membersOnly
- [x] **Media** â€” alt, caption, isPublic, mime types, image sizes (thumbnail/card/hero)

### NOT YET IMPLEMENTED in Collections:

- [ ] **Pages `layout` blocks field** â€” Plan specifies heroBlock, contentBlock, imageGalleryBlock, ctaBlock, officerGridBlock, statsBlock, contactFormBlock. Not implemented â€” Pages only have richText content field.

---

## PAYLOAD GLOBALS (3/3 created)

- [x] **SiteSettings** â€” All fields: clubName, tagline, logo, email, phone, address, presidentContact, meetingInfo, rotaryInfo, socialMedia, externalListings, donationLinks, seedCompletedAt
- [x] **Theme** â€” activeTheme select (4 presets), customAccentColor override
- [x] **Navigation** â€” mainNav + footerNav arrays with linkField (internal/external + newTab)

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

- [x] **formatSlug** â€” beforeChange hook, auto-generates slug from title
- [x] **revalidateAfterChange / revalidateAfterDelete** â€” ISR revalidation for collections
- [x] **revalidatePageAfterChange / revalidatePageAfterDelete** â€” ISR revalidation for Pages

---

## SHARED FIELDS

- [x] **linkField** â€” Internal (page reference) + external URL, newTab checkbox

---

## SEED SCRIPT

- [x] Idempotent (checks seedCompletedAt, skips if already run unless force=true)
- [x] Uses SEED_DEFAULT_PASSWORD env var (no hardcoded passwords)
- [x] Seeds admin user (Thomas Darby)
- [x] Seeds 6 officers with titles
- [x] Seeds 9 known members
- [x] Seeds SiteSettings, Theme, Navigation globals
- [x] Seeds 10 real projects with descriptions
- [x] Seeds 7 pages (about, officers, scholarships, join, contact, donate, documents)
- [x] Seeds sample event (weekly meeting) and announcement (welcome)
- [x] Rich text fields use proper Lexical paragraph format
- [x] Triggered via onInit (RUN_SEED_ON_INIT=true) or POST /next/seed (requires SEED_SECRET)

---

## FRONTEND PAGES (17/19 pages exist)

- [x] `/` â€” Home page: hero section, upcoming events (5), recent announcements (3), CTA buttons
- [x] `/about` â€” Renders from Pages collection via getPageBySlug
- [x] `/officers` â€” Lists users with role=officer, shows name/title/email/phone
- [x] `/projects` â€” Grid of all published projects
- [x] `/projects/[slug]` â€” Project detail with impactStats, generateMetadata
- [x] `/events` â€” Upcoming events list with link to calendar
- [x] `/events/[slug]` â€” Event detail with RSVPControls, generateMetadata
- [x] `/announcements` â€” All announcements, pinned first
- [x] `/announcements/[slug]` â€” Announcement detail, generateMetadata
- [x] `/documents` â€” Members-only, download links via /api/documents/[id] proxy
- [x] `/scholarships` â€” Three named scholarships with dollar amounts
- [x] `/members` â€” Members-only directory, respects showInDirectory/showEmail/showPhone
- [x] `/account` â€” Members-only, shows profile, links to /admin for editing
- [x] `/login` â€” LoginForm component with full auth flow
- [x] `/donate` â€” Donation links from SiteSettings.donationLinks
- [x] `/[slug]` â€” Catch-all for dynamic Pages, excludes reserved slugs, generateMetadata

### Formerly partial stub pages (now implemented):

- [x] `/events/calendar` — Replaced list-only fallback with read-only DayPilot month calendar, month navigation, and click-through to event detail pages.
- [x] `/join` — Frontend now renders configured Payload Form Builder form from SiteSettings with validation and form-submission handling.
- [x] `/contact` — Contact info remains from SiteSettings and now renders configured Payload Form Builder form on the page.

---

## FRONTEND COMPONENTS

### Implemented:

- [x] `layout/SiteHeader` â€” Desktop nav, login/logout, branding
- [x] `layout/SiteFooter` â€” Contact email, footer nav links
- [x] `layout/MobileNav` â€” Hamburger menu, closes on navigation
- [x] `layout/ThemeLoader` â€” Loads theme CSS, applies customAccentColor (with XSS validation)
- [x] `layout/LogoutButton` â€” Client component, POST /api/users/logout
- [x] `events/RSVPControls` â€” Client component, yes/no/maybe toggle, calls /api/rsvp
- [x] `members/LoginForm` â€” Email/password form, auth flow

### NOT YET IMPLEMENTED (plan specified these as standalone components):

- [ ] `events/EventCard` â€” Card component for events list (logic is inlined in page)
- [x] `events/EventCalendar` — DayPilot Lite monthly calendar component
- [ ] `events/UpcomingEvents` â€” Homepage widget (logic is inlined in home page)
- [ ] `announcements/AnnouncementCard` â€” Card with priority styling (inlined)
- [ ] `announcements/LatestAnnouncements` â€” Homepage widget (inlined)
- [ ] `projects/ProjectCard` â€” Card with image/stats/badge (inlined)
- [ ] `projects/ProjectGallery` â€” Lightbox gallery for project photos
- [ ] `projects/ImpactStats` â€” Stats display component
- [ ] `members/MemberCard` â€” Directory card (inlined)
- [ ] `members/MemberDirectory` â€” Searchable/filterable grid (inlined)
- [ ] `documents/DocumentList` â€” Filterable by category (inlined)
- [ ] `documents/DocumentCard` â€” File icon + title + download (inlined)
- [ ] `pages/Hero` â€” Hero section with image/text overlay
- [ ] `pages/ContentBlock` â€” Rich text content section
- [ ] `pages/OfficerGrid` â€” Grid of officers with photos (inlined in officers page)
- [ ] `pages/StatsBar` â€” Impact numbers display
- [ ] `pages/CTASection` â€” Call-to-action section
- [ ] `forms/ContactForm` â€” Renders Form Builder forms
- [ ] `forms/InterestForm` â€” "I want to join" form
- [ ] `forms/VolunteerSignup` â€” Project volunteer sign-up
- [ ] `payload/Logo` â€” Custom admin panel logo
- [ ] `payload/Icon` â€” Custom admin panel sidebar icon

### shadcn/ui Components:

- [ ] Not installed. Plan called for: button, card, badge, dialog, input, select, calendar, dropdown-menu, navigation-menu, avatar, sheet, toast, tabs, separator

**NOTE:** Many "missing" components have their logic inlined directly in page files. The site is functional â€” these are refactoring/UX improvements, not blockers.

---

## THEME CSS FILES

- [ ] `/themes/rotary-classic.css` â€” Rotary Blue #17458F + Gold #F7A81B (default)
- [ ] `/themes/modern-light.css` â€” Clean white/gray with blue accents
- [ ] `/themes/modern-dark.css` â€” Dark mode with gold accents
- [ ] `/themes/community-warm.css` â€” Warm earth tones

**NOTE:** ThemeLoader references these files but they don't exist. Fallback CSS variables in globals.css and inline defaults on components (e.g., `bg-[var(--color-header-bg,#17458F)]`) make the site functional without them. Theme switching will not work until these are created.

---

## API ROUTES

- [x] `POST /api/rsvp` â€” Create/update RSVP, auth required, NaN validation, duplicate prevention
- [x] `GET /api/documents/[id]` â€” Authenticated download proxy, filename sanitization, proper headers
- [x] `POST /next/seed` â€” Seed endpoint, requires SEED_SECRET env var

---

## SECURITY HARDENING (Post-review fixes applied)

- [x] ThemeLoader XSS fix â€” validates hex color before CSS injection
- [x] Logout converted from `<Link>` to POST fetch (LogoutButton client component)
- [x] PAYLOAD_SECRET throws in production if unset
- [x] SEED_SECRET required on seed endpoint (403 if unconfigured)
- [x] Host-header trust removed from url.ts â€” uses env var or localhost only
- [x] Media read access restricted â€” members see only public media (not all)
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

### P0 â€” Needed for site to function properly:

1. **Database tables** â€” Verify Vercel deploy with `push: true` creates schema. Visit /admin to trigger.
2. **Create first admin user** â€” Visit /admin after tables exist, create admin account.
3. **Run seed** â€” Set RUN_SEED_ON_INIT=true + SEED_DEFAULT_PASSWORD in Vercel env vars, or POST to /next/seed with SEED_SECRET header.

### P1 â€” Should do before sharing with club:

4. **Theme CSS files** â€” Create the 4 theme files so theme switching works.
5. **Form Builder frontend rendering** - Completed on February 25, 2026. /join and /contact now render configured Form Builder forms.
6. **DayPilot calendar** - Completed on February 25, 2026. /events/calendar now uses an interactive read-only month view.
7. **Upload Rotary logo** â€” Upload to Media, set in SiteSettings.
8. **Add rich text content to pages** â€” About, Scholarships, etc. via admin panel.
9. **Update placeholder officer emails** â€” Replace @dlhrotary.org placeholders with real emails.

### P2 â€” Polish / nice-to-have:

10. **Extract standalone components** â€” EventCard, ProjectCard, MemberCard, etc. from inline page code.
11. **Install shadcn/ui** â€” Generate button, card, badge, etc. for better UI.
12. **Pages layout blocks** â€” Add heroBlock, contentBlock, etc. for flexible page layouts.
13. **Admin panel branding** â€” Custom Logo and Icon components.
14. **Notification system** â€” Email on new announcements via Payload hooks + Resend.
15. **Navigation dropdown children** â€” mainNav supports children array but frontend doesn't render submenus.
16. **Pagination** â€” List pages currently load up to 200 items with no pagination.
17. **Import generated Payload types** â€” Replace manual `as` casts with proper types from payload-types.ts.

### Deferred (post-launch):

18. **Custom domain** â€” Register dlhrotary.org, add to Vercel, update NEXT_PUBLIC_SERVER_URL.
19. **Resend email** â€” Add RESEND_API_KEY, verify domain for branded sending.
20. **Vercel Blob token** â€” Ensure BLOB_READ_WRITE_TOKEN is set for media uploads.

---

## ENVIRONMENT VARIABLES (Vercel)

| Variable | Status | Notes |
|---|---|---|
| DATABASE_URL | Set | Auto-created by Vercel Neon integration |
| PAYLOAD_SECRET | Set | Random 32-char string |
| NEXT_PUBLIC_SERVER_URL | Set | https://dlh-rotary.vercel.app |
| BLOB_READ_WRITE_TOKEN | Set | For Vercel Blob media storage |
| RESEND_API_KEY | Not set | Needed for email (password resets, form submissions) |
| SEED_SECRET | Not set | Needed to use POST /next/seed endpoint |
| SEED_DEFAULT_PASSWORD | Not set | Needed for seed script user creation |
| RUN_SEED_ON_INIT | Not set | Set to "true" to auto-seed on first deploy |

---

*Original specification V2 by Thomas Darby â€” February 2026*
*Implementation by AI agent, reviewed and hardened February 25, 2026*
*Status tracking added February 25, 2026*



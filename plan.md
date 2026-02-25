# Rotary Club of Downtown Lock Haven — Website Technical Specification (V2)

## For AI Agent Execution (Claude Code / Copilot / Cline)

**V2 Changelog:** Fixed access control functions, payload config wiring, Tailwind/Payload CSS separation, slug + revalidation hooks, and seed skeleton updates.



### V2.1 Hardening Addendum (Implemented February 25, 2026)

- Access contract split: public officer visibility vs authenticated member directory access
- Privacy enforcement moved into API behavior (not just frontend display)
- Members-only documents now use authenticated download proxy flow (/api/documents/[id])
- RSVP uniqueness enforced at database level via unique eventUserKey (event:user composite key)
- Hooks aligned and corrected to collection-level typings/imports
- Seed flow made idempotent and env-driven (SEED_DEFAULT_PASSWORD, seedCompletedAt guard)
- Cost/dependency language clarified: Vercel Blob + Resend are external services in addition to Neon


---

## PROJECT OVERVIEW

Build a complete club website for the Rotary Club of Downtown Lock Haven using **Payload CMS 3.x + Next.js 15 + Tailwind CSS + shadcn/ui**, deployed to **Vercel** with **Neon Postgres** (free tier) and **Vercel Blob** for media storage.

### Key Principles

- Code-first, fully in the repo � with managed services for Neon Postgres, Vercel Blob, and Resend email
- Payload CMS admin panel serves as the editing interface for club officers
- Role-based access: Admin (webmaster), Officer (president/secretary), Member (logged-in Rotarians), Public (anyone)
- Theming system using CSS custom properties so the club can preview and choose design options
- Mobile-first responsive design
- All content editable from the Payload admin panel — zero code changes needed for content updates

### Deployment

- **Vercel** — use free Vercel-assigned domain initially (e.g., dlh-rotary.vercel.app)
- Custom domain `dlhrotary.org` mapped later via Vercel dashboard (Domains > Add Domain)
- **Neon Postgres** — free tier (0.5 GB storage per project, 100 compute-hours/month, scale-to-zero)
- **Vercel Blob** — media/file uploads (included with Vercel Pro)
- One-click deploy via Payload's Vercel template, then customize from there

### ⚠️ Neon Free Tier Notes

- **Cold starts:** Neon scales to zero after 5 minutes of inactivity. The first request after idle will take 500ms–2 seconds to wake the database. For a low-traffic club site, this means the first visitor after a quiet period sees a brief delay. This is cosmetic, not a bug.
- **Storage:** 0.5 GB covers text data (pages, events, members, announcements) easily. Media files (photos, PDFs) go to Vercel Blob, NOT the database. Monitor Neon storage via their dashboard — if it approaches 0.5 GB, clean up old data or consider Neon Launch ($19/month for 10 GB).

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.x (installed in /app) |
| Database | Neon Postgres (free tier) via `@payloadcms/db-postgres` |
| Media Storage | Vercel Blob via `@payloadcms/storage-vercel-blob` |
| Styling | Tailwind CSS 4 + shadcn/ui components |
| Rich Text | Payload Lexical editor (built-in) |
| Forms | `@payloadcms/plugin-form-builder` |
| SEO | `@payloadcms/plugin-seo` |
| Auth | Payload built-in authentication |
| Email | Resend (free tier: 3,000 emails/month, 100/day cap) via `@payloadcms/email-resend` |
| Package Manager | pnpm |

---

## ⚠️ CRITICAL: TAILWIND CSS 4 + PAYLOAD SETUP

Tailwind v4 uses CSS-first configuration (no `tailwind.config.ts`). However, Payload's admin panel has its own internal CSS system. Tailwind's preflight/base styles **will break the admin panel** if imported globally.

### Required: Split CSS Files

**Frontend CSS** (`/app/(frontend)/globals.css`):
```css
@import "tailwindcss";
```
This is the standard Tailwind v4 import — works normally for the public-facing site.

**Admin Panel CSS** (`/app/(payload)/custom.scss`):
```scss
/* DO NOT use @import "tailwindcss" here — it will break Payload's admin styles */
/* Instead, scope Tailwind carefully: */
@layer theme {
  @import 'tailwindcss/theme.css';
}
@layer base {
  .twp {
    @import 'tailwindcss/preflight.css';
  }
  .twp .no-twp {
    *, ::after, ::before, ::backdrop, ::file-selector-button {
      all: revert-layer;
    }
  }
}
@layer components;
@layer utilities {
  @import 'tailwindcss/utilities.css';
}
```

**Dark mode selector:** Payload uses `data-theme="dark"` not the `class` strategy. Configure accordingly in any Tailwind dark mode usage.

### Theme Variables (Tailwind v4 CSS-first approach)

Instead of `tailwind.config.ts`, define theme extensions in CSS:

```css
/* /app/(frontend)/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-accent: var(--color-accent);
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-card: var(--color-card);
  --color-card-foreground: var(--color-card-foreground);
  --color-border: var(--color-border);
  --radius: var(--radius);
}
```

---

## THEMING SYSTEM

### Approach: CSS Custom Properties + Tailwind + Theme Presets

Create a theming system that allows non-developers to switch between preset themes from the Payload admin panel.

### Implementation

1. **Create a `Theme` Global in Payload** (see Globals section below) where an admin selects from preset themes
2. **Define theme presets** as CSS variable sets in `/app/(frontend)/themes/`:

```
/themes/
  rotary-classic.css    /* Rotary Royal Blue #17458F + Gold #F7A81B — the default */
  modern-light.css      /* Clean white/gray with blue accents */
  modern-dark.css       /* Dark mode with gold accents */
  community-warm.css    /* Warm earth tones — browns, greens */
```

3. **Each theme file** defines CSS custom properties:

```css
/* rotary-classic.css */
:root {
  --color-primary: #17458F;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #F7A81B;
  --color-secondary-foreground: #1A1A1A;
  --color-background: #FFFFFF;
  --color-foreground: #1A1A1A;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --color-card: #FFFFFF;
  --color-card-foreground: #1A1A1A;
  --color-accent: #F7A81B;
  --color-border: #E2E8F0;
  --color-header-bg: #17458F;
  --color-header-text: #FFFFFF;
  --color-footer-bg: #0F2D5E;
  --color-footer-text: #CBD5E1;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius: 0.5rem;
}
```

4. **Theme loader component** reads the selected theme from Payload Global and applies the correct CSS file via dynamic `<link>` tag or import

5. **Theme preview** — in the admin panel, the Theme Global shows a live preview thumbnail of each option before saving

### Rotary Branding Rules (enforce in all themes)

- The Rotary Masterbrand Signature (wheel + wordmark + club name) must appear as provided — never recolored or altered
- The logo should be uploaded as an image asset, not generated via CSS
- Club name text in the logo follows Rotary's template (Open Sans Light font)
- Themes can style the rest of the site freely but must not alter the official logo

---

## PAYLOAD COLLECTIONS

### 1. Users (Auth-Enabled)

**Purpose:** Authentication, member directory, role-based access

```typescript
// collections/Users.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer, isAdminOrSelf, isAuthenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'role'],
  },
  access: {
    read: isAuthenticated,
    create: isAdminOrOfficer,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Officer', value: 'officer' },
        { label: 'Member', value: 'member' },
      ],
      defaultValue: 'member',
      access: { update: isAdmin },
    },
    { name: 'title', type: 'text' },  // e.g., "President", "Secretary"
    { name: 'phone', type: 'text' },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'sponsor', type: 'text' },
    { name: 'memberSince', type: 'date' },
    { name: 'showInDirectory', type: 'checkbox', defaultValue: true },
    { name: 'showPhone', type: 'checkbox', defaultValue: false },
    { name: 'showEmail', type: 'checkbox', defaultValue: true },
  ],
}
```

**Frontend pages:**
- `/members` — Member directory (login required). Grid/list of members with photo, name, title. Respects `showInDirectory`, `showPhone`, `showEmail` privacy settings.
- `/account` — Edit own profile, change password
- `/login` — Login form
- `/join` — Public interest form (uses Form Builder plugin, emails membership chair)

---

### 2. Pages

**Purpose:** Static content pages (About, History, Mission, How to Join, etc.)

```typescript
// collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { revalidatePageAfterChange, revalidatePageAfterDelete } from '../hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      // Published, non-members-only pages: public access
      if (!req.user) {
        return {
          and: [
            { _status: { equals: 'published' } },
            { membersOnly: { equals: false } },
          ],
        }
      }
      // Officers/admins: see everything (including drafts)
      if (['admin', 'officer'].includes(req.user.role)) {
        return true
      }
      // Members: see all published pages (including members-only)
      return { _status: { equals: 'published' } }
    },
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title. Edit only if needed.',
      },
    },
    { name: 'membersOnly', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        // Reusable layout blocks — define each as a separate block config:
        // heroBlock, contentBlock, imageGalleryBlock, ctaBlock,
        // officerGridBlock, statsBlock, contactFormBlock
        // See LAYOUT BLOCKS section below
      ],
    },
  ],
  versions: { drafts: true },
}
```

**Pre-seeded pages (create on first deploy):**
- `/` — Home (hero, upcoming events, recent announcements, quick links)
- `/about` — Club history, mission, Four-Way Test
- `/officers` — Current officers with photos and titles
- `/projects` — Overview of all projects
- `/join` — How to join + interest form
- `/contact` — Contact info + form
- `/members` — Member directory (members only)
- `/documents` — Bylaws, minutes, etc. (members only)

---

### 3. Events

**Purpose:** Club events, meetings, guest speakers, fundraisers, community service

```typescript
// collections/Events.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { revalidateAfterChange } from '../hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'eventType', '_status'],
  },
  access: {
    read: () => true,
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidateAfterChange],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Auto-generated from title.' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Regular Meeting', value: 'meeting' },
        { label: 'Guest Speaker', value: 'speaker' },
        { label: 'Community Service', value: 'service' },
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Social', value: 'social' },
        { label: 'Board Meeting', value: 'board' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Poorman Gallery, 352 E. Water St., Lock Haven',
    },
    { name: 'description', type: 'richText' },
    {
      name: 'speakerName',
      type: 'text',
      admin: { condition: (data) => data.eventType === 'speaker' },
    },
    {
      name: 'speakerTopic',
      type: 'text',
      admin: { condition: (data) => data.eventType === 'speaker' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'enableRSVP', type: 'checkbox', defaultValue: false },
    {
      name: 'rsvpDeadline',
      type: 'date',
      admin: { condition: (data) => data.enableRSVP },
    },
    {
      name: 'maxAttendees',
      type: 'number',
      admin: { condition: (data) => data.enableRSVP },
    },
    {
      name: 'ticketPrice',
      type: 'number',
      admin: { description: 'Leave blank or 0 for free events' },
    },
    {
      name: 'ticketLink',
      type: 'text',
      admin: { description: 'External link (PayPal, Venmo, etc.) for ticket purchases' },
    },
    { name: 'isRecurring', type: 'checkbox', defaultValue: false },
    {
      name: 'recurringNote',
      type: 'text',
      admin: {
        condition: (data) => data.isRecurring,
        description: 'e.g., "Every Tuesday at 5:30 PM"',
      },
    },
  ],
  versions: { drafts: true },
}
```

**Frontend pages:**
- `/events` — Upcoming events list + monthly calendar view (use DayPilot Lite for React, free & open source)
- `/events/[slug]` — Individual event page with details, RSVP button, map
- `/events/calendar` — Full calendar view (month/week toggle)

---

### 4. RSVPs

**Purpose:** Track member RSVPs for events

```typescript
// collections/RSVPs.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficerOrSelf, isAuthenticated } from '../access'

export const RSVPs: CollectionConfig = {
  slug: 'rsvps',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['event', 'user', 'status', 'createdAt'],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAdminOrOfficerOrSelf,
    delete: isAdmin,
  },
  hooks: {
    // Prevent duplicate RSVPs: one per user per event
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data?.event && data?.user) {
          const existing = await req.payload.find({
            collection: 'rsvps',
            where: {
              and: [
                { event: { equals: data.event } },
                { user: { equals: data.user } },
              ],
            },
            limit: 1,
          })
          if (existing.docs.length > 0) {
            throw new Error('You have already RSVPed to this event. Update your existing RSVP instead.')
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Attending', value: 'yes' },
        { label: 'Not Attending', value: 'no' },
        { label: 'Maybe', value: 'maybe' },
      ],
    },
    {
      name: 'guests',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Additional guests' },
    },
    { name: 'note', type: 'text' },
  ],
}
```

**Frontend:** RSVP button on event pages (for logged-in members). Shows attendee count. Officers can view full RSVP list from admin panel or a `/events/[slug]/rsvps` page.

---

### 5. Announcements

**Purpose:** Club news and announcements (replaces group text chaos)

```typescript
// collections/Announcements.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { revalidateAfterChange } from '../hooks/revalidate'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'author', 'publishedDate'],
  },
  access: {
    read: ({ req }) => {
      // Unauthenticated users: only non-members-only announcements
      if (!req.user) {
        return { membersOnly: { equals: false } }
      }
      // All authenticated users: see everything
      return true
    },
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidateAfterChange],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Auto-generated from title.' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Important', value: 'important' },
        { label: 'Urgent', value: 'urgent' },
      ],
    },
    { name: 'membersOnly', type: 'checkbox', defaultValue: false },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Pin to top of announcements list' },
    },
  ],
  versions: { drafts: true },
}
```

**Frontend pages:**
- `/announcements` — All announcements, newest first, pinned at top. Urgent items styled differently.
- `/announcements/[slug]` — Individual announcement
- Home page shows 3 most recent announcements

---

### 6. Projects

**Purpose:** Ongoing club projects and community service initiatives

```typescript
// collections/Projects.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { revalidateAfterChange } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category'],
  },
  access: {
    read: () => true,
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidateAfterChange],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Auto-generated from title.' },
    },
    { name: 'description', type: 'richText' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Community Service', value: 'community-service' },
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Youth', value: 'youth' },
        { label: 'International', value: 'international' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Upcoming', value: 'upcoming' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'impactStats',
      type: 'group',
      fields: [
        { name: 'dollarsRaised', type: 'number' },
        { name: 'peopleServed', type: 'number' },
        { name: 'volunteersInvolved', type: 'number' },
        { name: 'customStat', type: 'text' },
        { name: 'customStatValue', type: 'text' },
      ],
    },
    {
      name: 'partners',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'volunteerSignupEnabled', type: 'checkbox', defaultValue: false },
  ],
  versions: { drafts: true },
}
```

**Pre-seeded projects:**
- Flags of Honor (Memorial Day, downtown Lock Haven — also a fundraiser)
- Angel Lights (9/11 luminaires along the Susquehanna River)
- Little Red Schoolhouse Libraries (free library boxes)
- Veteran Gift Bags
- Valentine's Day First Responder Deliveries
- Scholarship Bingo Fundraiser (new in 2026, KBR Bingo Hall)
- Scholarships (three named awards totaling $5,500/year to CMHS seniors)
- People of Action Open House (annual community outreach + nonprofit donations)
- Merit House Support (men's shelter collections)
- Downtowner of the Year Award (annual recognition)

**Frontend pages:**
- `/projects` — Grid of all projects with images, stats, status badges
- `/projects/[slug]` — Full project page with gallery, stats, volunteer sign-up

---

### 7. Documents

**Purpose:** Club documents repository (bylaws, minutes, budgets, RI resources)

```typescript
// collections/Documents.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer } from '../access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'membersOnly', 'updatedAt'],
  },
  access: {
    // NOTE: Collection-level read access does NOT receive `doc`.
    // Use a where query constraint for unauthenticated users.
    read: ({ req }) => {
      if (!req.user) {
        // Public users can only see non-members-only documents
        return { membersOnly: { equals: false } }
      }
      // Authenticated users see all documents
      return true
    },
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Meeting Minutes', value: 'minutes' },
        { label: 'Bylaws & Governance', value: 'bylaws' },
        { label: 'Financial Reports', value: 'financial' },
        { label: 'Rotary International Resources', value: 'ri-resources' },
        { label: 'Forms & Templates', value: 'forms' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'meetingDate',
      type: 'date',
      admin: {
        condition: (data) => data.category === 'minutes',
        description: 'Date of the meeting these minutes are from',
      },
    },
    { name: 'membersOnly', type: 'checkbox', defaultValue: true },
  ],
}
```

**Frontend pages:**
- `/documents` — Filterable/searchable document list grouped by category. Members-only docs require login.

---

### 8. Media

**Purpose:** All uploaded images, PDFs, files

⚠️ **CRITICAL:** On Vercel serverless, there is NO persistent filesystem. Do NOT use `staticDir`. All uploads MUST go through the Vercel Blob storage adapter configured in `payload.config.ts`.

```typescript
// collections/Media.ts
import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrOfficer, isAuthenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // NO staticDir — Vercel Blob adapter handles storage (configured in payload.config.ts)
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1200, height: 600, position: 'centre' },
    ],
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
```

---

## PAYLOAD GLOBALS

Globals are singleton documents (one instance, edited in admin panel).

### 1. SiteSettings

```typescript
// globals/SiteSettings.ts
import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    { name: 'clubName', type: 'text', defaultValue: 'Rotary Club of Downtown Lock Haven' },
    { name: 'tagline', type: 'text', defaultValue: 'Service Above Self' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'logoSimplified',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Simplified logo for small displays (favicon, mobile header)' },
    },
    { name: 'email', type: 'email', defaultValue: 'dlhrotary@gmail.com' },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Club contact phone number' },
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'PO Box 634\nLock Haven, PA 17745',
    },
    {
      name: 'presidentContact',
      type: 'group',
      admin: { description: 'Current club president contact info (displayed on Contact page)' },
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Lisa Schropp' },
        { name: 'phone', type: 'text', defaultValue: '814-244-2929' },
        { name: 'email', type: 'email', defaultValue: 'lschropp3@icloud.com' },
      ],
    },
    {
      name: 'meetingInfo',
      type: 'group',
      fields: [
        { name: 'day', type: 'text', defaultValue: 'Tuesdays' },
        { name: 'time', type: 'text', defaultValue: '5:30 PM (social at 5:15)' },
        { name: 'location', type: 'text', defaultValue: 'Poorman Gallery, 352 E. Water St.' },
        { name: 'city', type: 'text', defaultValue: 'Lock Haven, PA 17745' },
      ],
    },
    {
      name: 'rotaryInfo',
      type: 'group',
      admin: { description: 'Rotary International affiliations' },
      fields: [
        { name: 'district', type: 'text', defaultValue: 'District 7360' },
        { name: 'clubId', type: 'text', admin: { description: 'RI Club ID number (find on My Rotary)' } },
        { name: 'foundedYear', type: 'number', defaultValue: 2003 },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/profile.php?id=100064347773545' },
        { name: 'instagram', type: 'text' },
        { name: 'myRotaryLink', type: 'text', defaultValue: 'https://my.rotary.org' },
      ],
    },
    {
      name: 'externalListings',
      type: 'group',
      admin: { description: 'Links to existing directory listings (for SEO and cross-linking)' },
      fields: [
        { name: 'ccepListing', type: 'text', defaultValue: 'https://www.clintoncountyinfo.com/rotary-club-of-downtown-lock-haven' },
        { name: 'downtownLHListing', type: 'text', defaultValue: 'https://lockhaven.org/listing/rotary-club-of-downtown-lock-haven/' },
        { name: 'oldClubSite', type: 'text', defaultValue: 'http://www.rotaryclintoncountypa.org/' },
      ],
    },
    {
      name: 'donationLinks',
      type: 'group',
      fields: [
        { name: 'paypal', type: 'text' },
        { name: 'venmo', type: 'text' },
        { name: 'zelle', type: 'text' },
      ],
    },
  ],
}
```

### 2. Theme

```typescript
// globals/Theme.ts
import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const Theme: GlobalConfig = {
  slug: 'theme',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'activeTheme',
      type: 'select',
      required: true,
      defaultValue: 'rotary-classic',
      options: [
        { label: 'Rotary Classic (Blue & Gold)', value: 'rotary-classic' },
        { label: 'Modern Light', value: 'modern-light' },
        { label: 'Modern Dark', value: 'modern-dark' },
        { label: 'Community Warm', value: 'community-warm' },
      ],
    },
    {
      name: 'customAccentColor',
      type: 'text',
      admin: { description: 'Optional: Override the accent color (hex, e.g., #F7A81B)' },
    },
  ],
}
```

### 3. Navigation

```typescript
// globals/Navigation.ts
import type { GlobalConfig } from 'payload'
import { isAdminOrOfficer } from '../access'
import { linkField } from '../fields/linkField'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: isAdminOrOfficer,
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField(),  // See SHARED FIELDS section — handles internal page refs + external URLs
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            linkField(),
            { name: 'membersOnly', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'footerNav',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField(),
      ],
    },
  ],
}
```

---

## SHARED FIELDS

### Link Field

Reusable field supporting both internal page references and external URLs:

```typescript
// fields/linkField.ts
import type { Field } from 'payload'

export const linkField = (): Field => ({
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
      defaultValue: 'internal',
      admin: { layout: 'horizontal' },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: 'pages',
      admin: { condition: (_, siblingData) => siblingData?.type === 'internal' },
    },
    {
      name: 'url',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Open in new tab' },
    },
  ],
})
```

---

## HOOKS

### Slug Auto-Generation

```typescript
// hooks/formatSlug.ts
import type { FieldHook } from 'payload'

export const formatSlug: FieldHook = ({ data, operation, originalDoc }) => {
  // Only auto-generate on create, or if title changed and slug wasn't manually edited
  if (operation === 'create' || (data?.title && !data?.slug)) {
    if (data?.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }
  }
  return data
}
```

**NOTE FOR AGENT:** This hook should be attached at the collection level in the `hooks.beforeChange` array (as shown in the collection configs above), NOT as a field-level hook. It modifies the `data` object to set the slug from the title.

### On-Demand Revalidation (ISR)

When content changes in the admin panel, the cached frontend pages should update immediately:

```typescript
// hooks/revalidate.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  collection,
  req,
}) => {
  const slug = doc?.slug
  const collectionSlug = collection.slug

  // Revalidate the specific page
  if (slug) {
    revalidatePath(`/${collectionSlug}/${slug}`)
  }
  // Revalidate the listing page
  revalidatePath(`/${collectionSlug}`)
  // Revalidate homepage (it shows latest events/announcements)
  revalidatePath('/')

  return doc
}

export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  if (doc?.slug) {
    // Pages use root-level paths: /about, /contact, etc.
    revalidatePath(`/${doc.slug}`)
  }
  revalidatePath('/')
  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  if (doc?.slug) {
    revalidatePath(`/${doc.slug}`)
  }
  revalidatePath('/')
  return doc
}
```

---

## ACCESS CONTROL HELPER FUNCTIONS

```typescript
// access/index.ts
import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}

export const isAdminOrOfficer: Access = ({ req }) => {
  return ['admin', 'officer'].includes(req.user?.role)
}

export const isAuthenticated: Access = ({ req }) => {
  return Boolean(req.user)
}

export const isAdminOrSelf: Access = ({ req }) => {
  if (req.user?.role === 'admin') return true
  // Return a where constraint: user can only access their own document
  return { id: { equals: req.user?.id } }
}

export const isAdminOrOfficerOrSelf: Access = ({ req }) => {
  if (['admin', 'officer'].includes(req.user?.role)) return true
  return { user: { equals: req.user?.id } }
}

// Field-level access (e.g., only admin can edit the role field)
export const isAdminFieldAccess: FieldAccess = ({ req }) => {
  return req.user?.role === 'admin'
}
```

---

## PAYLOAD.CONFIG.TS — MAIN CONFIGURATION FILE

⚠️ This is the most critical file. It wires everything together.

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Events } from './collections/Events'
import { RSVPs } from './collections/RSVPs'
import { Announcements } from './collections/Announcements'
import { Projects } from './collections/Projects'
import { Documents } from './collections/Documents'
import { Media } from './collections/Media'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Theme } from './globals/Theme'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel config
  admin: {
    user: Users.slug,
    // Optional: Custom logo/icon components for admin panel branding
    // components: {
    //   graphics: {
    //     Logo: '/components/payload/Logo',
    //     Icon: '/components/payload/Icon',
    //   },
    // },
  },

  // Collections
  collections: [
    Users,
    Pages,
    Events,
    RSVPs,
    Announcements,
    Projects,
    Documents,
    Media,
  ],

  // Globals
  globals: [
    SiteSettings,
    Theme,
    Navigation,
  ],

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  // Rich text editor
  editor: lexicalEditor(),

  // Email
  email: resendAdapter({
    defaultFromAddress: 'noreply@dlhrotary.org',
    defaultFromName: 'Rotary Club of Downtown Lock Haven',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  // Plugins
  plugins: [
    // Vercel Blob storage for all uploads
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,  // Apply to the 'media' collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),

    // Form Builder — creates "forms" and "form-submissions" collections
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      // Redirect form submissions to email
      formOverrides: {
        access: {
          read: () => true,  // Forms are public (contact form, join form)
          create: ({ req }) => ['admin', 'officer'].includes(req.user?.role),
          update: ({ req }) => ['admin', 'officer'].includes(req.user?.role),
        },
      },
      formSubmissionOverrides: {
        access: {
          read: ({ req }) => ['admin', 'officer'].includes(req.user?.role),
          create: () => true,  // Anyone can submit a form
        },
      },
    }),

    // SEO — adds meta title, description, and image to specified collections
    seoPlugin({
      collections: ['pages', 'events', 'projects', 'announcements'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} — Rotary Club of Downtown Lock Haven`,
      generateDescription: ({ doc }) => doc?.meta?.description || '',
      generateURL: ({ doc, collectionSlug }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dlh-rotary.vercel.app'
        if (collectionSlug === 'pages') return `${base}/${doc?.slug || ''}`
        return `${base}/${collectionSlug}/${doc?.slug || ''}`
      },
    }),
  ],

  // Secret for JWT tokens
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',

  // TypeScript output
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
```

---

## NPM DEPENDENCIES

### Full Install Command

```bash
# Create project from Payload website template
pnpx create-payload-app@latest -t website

# Core Payload packages (most come with the template, verify these are present)
pnpm add @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-vercel-blob

# Plugins
pnpm add @payloadcms/plugin-form-builder @payloadcms/plugin-seo

# Email adapter
pnpm add @payloadcms/email-resend

# Frontend: shadcn/ui (install via CLI)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge dialog input select calendar dropdown-menu navigation-menu avatar sheet toast tabs separator

# Calendar component (Apache License 2.0 — free for commercial use)
pnpm add @daypilot/daypilot-lite-react

# Icons
pnpm add lucide-react

# Date utilities
pnpm add date-fns

# Tailwind CSS 4 (should come with template, verify)
pnpm add tailwindcss @tailwindcss/postcss postcss
```

---

## ENVIRONMENT VARIABLES (Vercel)

```bash
# Database (get from Neon dashboard after creating project)
DATABASE_URI=postgresql://...@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Vercel Blob (auto-populated if using Vercel's one-click deploy)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxx

# Payload
PAYLOAD_SECRET=generate-a-random-32-char-string-here
NEXT_PUBLIC_SERVER_URL=https://dlh-rotary.vercel.app

# Email (sign up at resend.com, verify domain later)
RESEND_API_KEY=re_xxxx
```

---

## FRONTEND PAGES & COMPONENTS

### Page Structure (App Router)

```
/app
├── (frontend)/                    # Public-facing site
│   ├── layout.tsx                 # Main layout: header, nav, footer, theme loader
│   ├── globals.css                # Tailwind v4 import + theme variable bindings
│   ├── page.tsx                   # Home page
│   ├── about/page.tsx
│   ├── officers/page.tsx
│   ├── projects/
│   │   ├── page.tsx               # All projects grid
│   │   └── [slug]/page.tsx        # Individual project
│   ├── events/
│   │   ├── page.tsx               # Upcoming events + calendar view toggle
│   │   ├── calendar/page.tsx      # Full calendar view
│   │   └── [slug]/page.tsx        # Individual event + RSVP
│   ├── announcements/
│   │   ├── page.tsx               # All announcements
│   │   └── [slug]/page.tsx        # Individual announcement
│   ├── documents/page.tsx         # Document repository (filtered by auth)
│   ├── scholarships/page.tsx      # Named scholarships, how to donate
│   ├── members/page.tsx           # Member directory (auth required)
│   ├── account/page.tsx           # Edit own profile (auth required)
│   ├── join/page.tsx              # Public interest form
│   ├── contact/page.tsx           # Contact info + form
│   ├── login/page.tsx             # Login form
│   ├── donate/page.tsx            # Donation links/buttons
│   └── themes/                    # CSS theme files
│       ├── rotary-classic.css
│       ├── modern-light.css
│       ├── modern-dark.css
│       └── community-warm.css
├── (payload)/                     # Payload admin panel (auto-configured)
│   ├── admin/
│   │   └── [[...segments]]/page.tsx
│   └── custom.scss                # Scoped Tailwind for admin panel (see setup section)
```

### Shared Components

```
/components/
├── layout/
│   ├── Header.tsx                 # Logo, nav, login/logout button
│   ├── Footer.tsx                 # Contact info, quick links, social, meeting info
│   ├── MobileNav.tsx              # Hamburger menu for mobile
│   └── ThemeLoader.tsx            # Loads active theme CSS from Theme global
├── events/
│   ├── EventCard.tsx              # Card for events list
│   ├── EventCalendar.tsx          # DayPilot Lite monthly calendar component
│   ├── RSVPButton.tsx             # RSVP toggle (attending/not/maybe)
│   └── UpcomingEvents.tsx         # Widget for homepage (next 3-5 events)
├── announcements/
│   ├── AnnouncementCard.tsx       # Card with priority styling
│   └── LatestAnnouncements.tsx    # Widget for homepage
├── projects/
│   ├── ProjectCard.tsx            # Card with image, stats, status badge
│   ├── ProjectGallery.tsx         # Lightbox gallery for project photos
│   └── ImpactStats.tsx            # Display stats (dollars raised, people served)
├── members/
│   ├── MemberCard.tsx             # Directory card with photo, name, title
│   ├── MemberDirectory.tsx        # Searchable/filterable grid
│   └── LoginForm.tsx              # Auth form
├── documents/
│   ├── DocumentList.tsx           # Filterable document list by category
│   └── DocumentCard.tsx           # File icon + title + download link
├── pages/
│   ├── Hero.tsx                   # Hero section with image/text overlay
│   ├── ContentBlock.tsx           # Rich text content section
│   ├── OfficerGrid.tsx            # Grid of current officers with photos
│   ├── StatsBar.tsx               # Impact numbers in a bar
│   └── CTASection.tsx             # Call-to-action section (Join Us, Donate, etc.)
├── forms/
│   ├── ContactForm.tsx            # Renders Payload Form Builder forms
│   ├── InterestForm.tsx           # "I want to join" form
│   └── VolunteerSignup.tsx        # Sign up for a project
├── payload/                       # Custom admin panel branding
│   ├── Logo.tsx                   # Rotary logo in admin panel
│   └── Icon.tsx                   # Simplified icon for admin sidebar
└── ui/                            # shadcn/ui components (auto-generated)
    ├── button.tsx
    ├── card.tsx
    ├── badge.tsx
    ├── dialog.tsx
    ├── input.tsx
    ├── select.tsx
    ├── calendar.tsx
    ├── dropdown-menu.tsx
    ├── navigation-menu.tsx
    ├── avatar.tsx
    ├── sheet.tsx
    └── toast.tsx
```

---

## EMAIL CONFIGURATION

Resend free tier: **3,000 emails/month**, capped at **100/day**. More than sufficient for a Rotary club (password resets, form submissions, RSVP confirmations).

The `@payloadcms/email-resend` adapter is configured in `payload.config.ts` (see above). To set up:

1. Sign up at [resend.com](https://resend.com) (free)
2. Get API key from dashboard
3. Add `RESEND_API_KEY` to Vercel environment variables
4. **Domain verification:** Until you register `dlhrotary.org`, Resend will send from their shared domain. After domain purchase, add DNS records to verify `dlhrotary.org` for branded sending.

**Alternative: Zoho SMTP** (if club chooses Zoho Mail for email hosting):
```bash
pnpm add @payloadcms/email-nodemailer
```
Then replace `resendAdapter` with `nodemailerAdapter` in config (see Payload docs for Nodemailer setup).

---

## SEED SCRIPT

```typescript
// seed/index.ts
import type { Payload } from 'payload'

export const seed = async (payload: Payload) => {

  // =========================================================================
  // 1. USERS — Real officers and members (2025-26 Rotary year)
  // =========================================================================

  // Admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'tdarbylhu@gmail.com',
      password: 'CHANGE-ME-ON-FIRST-LOGIN',
      fullName: 'Thomas Darby',
      role: 'admin',
      title: 'Webmaster',
      sponsor: 'Cathy Ballat',
      memberSince: '2025-12-01',
      bio: 'Newest member of the club. Graduate of Leadership Clinton County Class of 2026. Self-employed translator and data operations specialist.',
      showInDirectory: true,
      showEmail: true,
    },
  })

  // Officers (2025-26, installed July 15, 2025)
  const officers = [
    {
      email: 'lschropp3@icloud.com',
      fullName: 'Lisa Schropp',
      title: 'President',
      phone: '814-244-2929',
    },
    {
      email: 'vp@dlhrotary.org',       // placeholder — update with real email
      fullName: 'Janine Bruno',
      title: 'Vice President',
    },
    {
      email: 'secretary@dlhrotary.org', // placeholder — update with real email
      fullName: 'Wendy Doherty',
      title: 'Secretary',
      bio: '2024-25 Rotarian of the Year.',
    },
    {
      email: 'treasurer@dlhrotary.org', // placeholder — update with real email
      fullName: 'Heather Lively',
      title: 'Treasurer',
    },
    {
      email: 'asstsecretary@dlhrotary.org', // placeholder
      fullName: 'Carmen Banfill',
      title: 'Assistant Secretary-Treasurer',
    },
    {
      email: 'pastpresident@dlhrotary.org', // placeholder
      fullName: 'Diahann Claghorn',
      title: 'Past President / Rotary Area Governor',
      bio: 'Rotary Area Governor for District 7360. Led the officer installation ceremony in July 2025.',
    },
  ]
  for (const officer of officers) {
    await payload.create({
      collection: 'users',
      data: {
        ...officer,
        password: 'CHANGE-ME-ON-FIRST-LOGIN',
        role: 'officer',
        showInDirectory: true,
        showEmail: true,
      },
    })
  }

  // Known members (from news articles — add more as needed)
  const members = [
    { fullName: 'Cathy Ballat', bio: "Thomas Darby's sponsor." },
    { fullName: 'Bonnie Hannis' },
    { fullName: 'Jeane Baker' },
    { fullName: 'Melissa Dally', bio: '2024-25 Downtowner of the Year. Former Downtown Lock Haven Manager, now Tourism Director at Clinton County Economic Partnership. Inducted June 2025.' },
    { fullName: 'Emma Persun', bio: 'Works for Renewal by Andersen. Former Central Mountain Interact member. Inducted June 2025.' },
    { fullName: 'Nate Akeley' },
    { fullName: 'Olyvea Welch' },
    { fullName: 'Heather Corbin' },
    { fullName: 'Marianne Lotfi', bio: 'Past President (served 3 years). 2021-22 Rotarian of the Year.' },
  ]
  for (const member of members) {
    await payload.create({
      collection: 'users',
      data: {
        ...member,
        email: `${member.fullName.toLowerCase().replace(/\s+/g, '.')}@placeholder.com`, // placeholder emails
        password: 'CHANGE-ME-ON-FIRST-LOGIN',
        role: 'member',
        showInDirectory: true,
        showEmail: false, // default to private until member opts in
      },
    })
  }

  // =========================================================================
  // 2. SITE SETTINGS
  // =========================================================================

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clubName: 'Rotary Club of Downtown Lock Haven',
      tagline: 'Service Above Self',
      email: 'dlhrotary@gmail.com',
      address: 'PO Box 634\nLock Haven, PA 17745',
      presidentContact: {
        name: 'Lisa Schropp',
        phone: '814-244-2929',
        email: 'lschropp3@icloud.com',
      },
      meetingInfo: {
        day: 'Tuesdays',
        time: '5:30 PM (social at 5:15)',
        location: 'Poorman Gallery, 352 E. Water St.',
        city: 'Lock Haven, PA 17745',
      },
      rotaryInfo: {
        district: 'District 7360',
        foundedYear: 2003,
      },
      socialMedia: {
        facebook: 'https://www.facebook.com/profile.php?id=100064347773545',
        myRotaryLink: 'https://my.rotary.org',
      },
      externalListings: {
        ccepListing: 'https://www.clintoncountyinfo.com/rotary-club-of-downtown-lock-haven',
        downtownLHListing: 'https://lockhaven.org/listing/rotary-club-of-downtown-lock-haven/',
        oldClubSite: 'http://www.rotaryclintoncountypa.org/',
      },
    },
  })

  // =========================================================================
  // 3. THEME & NAVIGATION
  // =========================================================================

  await payload.updateGlobal({
    slug: 'theme',
    data: { activeTheme: 'rotary-classic' },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainNav: [
        { label: 'About', link: { type: 'external', url: '/about' } },
        { label: 'Projects', link: { type: 'external', url: '/projects' } },
        { label: 'Events', link: { type: 'external', url: '/events' } },
        { label: 'Announcements', link: { type: 'external', url: '/announcements' } },
        { label: 'Scholarships', link: { type: 'external', url: '/scholarships' } },
        { label: 'Join Us', link: { type: 'external', url: '/join' } },
        { label: 'Contact', link: { type: 'external', url: '/contact' } },
      ],
      footerNav: [
        { label: 'About', link: { type: 'external', url: '/about' } },
        { label: 'Contact', link: { type: 'external', url: '/contact' } },
        { label: 'Documents', link: { type: 'external', url: '/documents' } },
        { label: 'Facebook', link: { type: 'external', url: 'https://www.facebook.com/profile.php?id=100064347773545', newTab: true } },
        { label: 'My Rotary', link: { type: 'external', url: 'https://my.rotary.org', newTab: true } },
        { label: 'District 7360', link: { type: 'external', url: 'https://rotarydistrict7360.org', newTab: true } },
      ],
    },
  })

  // =========================================================================
  // 4. PROJECTS — Real projects with actual descriptions and impact data
  // =========================================================================

  const projects = [
    {
      title: 'Flags of Honor',
      category: 'fundraiser' as const,
      status: 'active' as const,
      description: 'Each Memorial Day weekend, the club places American flags along the streets of downtown Lock Haven to honor veterans and active military. Community members sponsor flags in honor or memory of a loved one. The project raises funds that the club donates to local nonprofits throughout the year.',
    },
    {
      title: 'Angel Lights',
      category: 'community-service' as const,
      status: 'active' as const,
      description: 'On September 11 each year, the club places luminaires throughout Lock Haven to remember the victims of 9/11. The glowing tribute along the Susquehanna River has become a beloved community tradition. Like Flags of Honor, proceeds support the club\'s charitable giving.',
    },
    {
      title: 'Little Red Schoolhouse Libraries',
      category: 'community-service' as const,
      status: 'active' as const,
      description: 'The club builds and maintains small free library boxes throughout the Lock Haven area, stocked with books for children and adults. Modeled after the Little Free Library concept, these red schoolhouse-shaped boxes promote literacy and community sharing.',
    },
    {
      title: 'Veteran Gift Bags',
      category: 'community-service' as const,
      status: 'active' as const,
      description: 'Each year, the club assembles and delivers gift bags to local veterans, showing appreciation for their service. Bags contain personal care items, snacks, and notes of thanks from community members.',
    },
    {
      title: "Valentine's Day First Responder Deliveries",
      category: 'community-service' as const,
      status: 'active' as const,
      description: "Around Valentine's Day, club members deliver treats and appreciation gifts to local first responders — police, fire, and EMS — thanking them for their service to the community.",
    },
    {
      title: 'Scholarship Bingo Fundraiser',
      category: 'fundraiser' as const,
      status: 'active' as const,
      description: 'New in 2026! The club hosts a bingo event at KBR Bingo Hall to raise funds for scholarships awarded to Central Mountain High School graduating seniors. Tickets are $20 and available from any Downtown Rotarian or at local businesses.',
    },
    {
      title: 'Scholarships',
      category: 'youth' as const,
      status: 'active' as const,
      description: 'The club awards three named scholarships annually to Central Mountain High School graduating seniors:\n\n• Eleanor E. J. Kodish Memorial Scholarship ($2,000) — For a student pursuing a career in education at Commonwealth University-Mansfield. Named for a beloved club member and former Avis Elementary principal who received the Service Above Self Award.\n\n• Dr. Betty Baird Schantz Memorial Scholarship ($2,000) — For an active member of Interact (the Rotary organization for high school students). Named for a Temple University professor, LHU associate dean, and Friend of the Ross Library.\n\n• Roberta M. Way Memorial Scholarship ($1,500) — For a college-bound senior demonstrating academics, commitment, community service, and pursuing education. Named for a member of the former Rotary Club of Mill Hall Sunrise. Funded by the Way family and former club.\n\nThe public is encouraged to donate to honor the legacies of these remarkable women.',
      impactStats: {
        dollarsRaised: 5500,
        customStat: 'Scholarships Awarded Annually',
        customStatValue: '3',
      },
    },
    {
      title: 'People of Action Open House',
      category: 'community-service' as const,
      status: 'active' as const,
      description: 'The club hosts an annual open house inviting the public to learn about Rotary and meet local nonprofit organizations. During the event, the club presents donations to selected nonprofits. Past recipients include Boxes of Hope, Lock Haven Area Shoe Bank, and Haven Cupboard.',
    },
    {
      title: 'Merit House Support',
      category: 'community-service' as const,
      status: 'active' as const,
      description: "Merit House is Lock Haven's overnight men's shelter. The club has named it a favorite charity and regularly collects food, personal care products, and cash donations for the shelter.",
    },
    {
      title: 'Downtowner of the Year Award',
      category: 'community-service' as const,
      status: 'active' as const,
      description: 'Each year, the club honors the person who best demonstrates the spirit of Rotary while working to benefit the downtown shopping district or the entire city. Past recipients include Downtown Manager Melissa Dally (2024-25) and Kira Rosamilia (2021-22).',
    },
  ]

  for (const project of projects) {
    const { description, impactStats, ...rest } = project
    await payload.create({
      collection: 'projects',
      data: {
        ...rest,
        slug: rest.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        // NOTE: Rich text fields need Lexical format — for seed, leave description
        // as a simple content block or populate via admin panel after deploy.
        // The agent should create a simple Lexical paragraph node from the text.
        impactStats: impactStats || undefined,
        _status: 'published',
      },
    })
  }

  // =========================================================================
  // 5. PAGES
  // =========================================================================

  const pages = [
    {
      title: 'About',
      slug: 'about',
      membersOnly: false,
      // Content to populate via admin panel:
      // - Club history (founded ~2003, 22+ years old)
      // - Rotary's Four-Way Test
      // - "Service Above Self" motto
      // - Part of Rotary District 7360
      // - Relationship to Rotary Club of Lock Haven (meets Tuesdays at noon, Great Island Presbyterian)
      // - In 2021-22: 1,023 volunteer hours
      // - In 2023-24: $5,500 in scholarships + ~$5,000 to other causes
    },
    {
      title: 'Officers',
      slug: 'officers',
      membersOnly: false,
      // Uses OfficerGrid component pulling from Users collection where role=officer
    },
    {
      title: 'Scholarships',
      slug: 'scholarships',
      membersOnly: false,
      // Details on three named scholarships, how to donate
    },
    {
      title: 'Join Us',
      slug: 'join',
      membersOnly: false,
      // Interest form via Form Builder plugin
      // "All are welcome to join us for fun, fellowship and an informational presentation from our guest speakers."
    },
    {
      title: 'Contact',
      slug: 'contact',
      membersOnly: false,
      // Contact form, meeting info, president contact, Facebook link
    },
    {
      title: 'Donate',
      slug: 'donate',
      membersOnly: false,
      // Donation links, scholarship fund info
    },
    {
      title: 'Member Documents',
      slug: 'documents',
      membersOnly: true,
    },
  ]

  for (const page of pages) {
    await payload.create({
      collection: 'pages',
      data: { ...page, _status: 'published' },
    })
  }

  // =========================================================================
  // 6. SAMPLE EVENTS
  // =========================================================================

  const nextTuesday = getNextTuesday()

  await payload.create({
    collection: 'events',
    data: {
      title: 'Weekly Club Meeting',
      slug: `meeting-${nextTuesday.toISOString().split('T')[0]}`,
      date: nextTuesday.toISOString(),
      eventType: 'meeting',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      isRecurring: true,
      recurringNote: 'Every Tuesday at 5:30 PM. Social time begins at 5:15 PM.',
      _status: 'published',
    },
  })

  // =========================================================================
  // 7. SAMPLE ANNOUNCEMENT
  // =========================================================================

  await payload.create({
    collection: 'announcements',
    data: {
      title: 'Welcome to Our New Website!',
      slug: 'welcome-new-website',
      publishedDate: new Date().toISOString(),
      priority: 'important',
      pinned: true,
      membersOnly: false,
      _status: 'published',
      // Content: "The Rotary Club of Downtown Lock Haven is proud to launch our
      // new website! Here you'll find information about our projects, upcoming
      // events, and how to get involved. Members can log in to access the member
      // directory, documents, and RSVP for events. Follow us on Facebook and
      // email dlhrotary@gmail.com with any questions."
    },
  })

  console.log('✅ Seed complete!')
  console.log('📋 Next steps:')
  console.log('   1. Log in at /admin with tdarbylhu@gmail.com')
  console.log('   2. Change all passwords immediately')
  console.log('   3. Upload the official Rotary logo (create at brandcenter.rotary.org)')
  console.log('   4. Add rich text content to pages via the admin panel')
  console.log('   5. Update placeholder officer emails with real addresses')
  console.log('   6. Upload photos for officers and projects')
}

function getNextTuesday(): Date {
  const now = new Date()
  const day = now.getDay()
  const daysUntilTuesday = (2 - day + 7) % 7 || 7
  const next = new Date(now)
  next.setDate(now.getDate() + daysUntilTuesday)
  next.setHours(17, 30, 0, 0) // 5:30 PM
  return next
}
```

**Run the seed:** Call `seed(payload)` from a custom endpoint, a script, or add it to `onInit` in `payload.config.ts` (with a guard to only run once).

---

## DEPLOYMENT STEPS

1. `pnpx create-payload-app@latest -t website` (starts with Payload's production-ready website template)
2. Set up Neon Postgres free tier at [neon.tech](https://neon.tech), copy connection string
3. Add all collections, globals, access control, hooks, and components as specified
4. Push to GitHub repo
5. Connect repo to Vercel (Import Project)
6. Add environment variables in Vercel dashboard (`DATABASE_URI`, `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `RESEND_API_KEY`)
7. Deploy — Vercel assigns a free `*.vercel.app` domain
8. Visit `your-app.vercel.app/admin` to create first admin user and run seed
9. Test everything on the free domain
10. When ready: register `dlhrotary.org`, add as custom domain in Vercel dashboard (Domains > Add Domain)
11. Update `NEXT_PUBLIC_SERVER_URL` env var to `https://dlhrotary.org`
12. Configure DNS at domain registrar to point to Vercel (they provide the records)
13. Verify domain in Resend for branded email sending

---

## ESTIMATED COST

| Item | Annual Cost |
|---|---|
| Domain (dlhrotary.org) — when ready | $12–15 |
| Vercel Pro (already have) | $0 |
| Payload CMS (MIT licensed, open source) | $0 |
| Neon Postgres free tier | $0 |
| Vercel Blob storage (included with Pro) | $0 |
| Resend email (3,000/month free) | $0 |
| DayPilot Lite (Apache License 2.0) | $0 |
| shadcn/ui (MIT license) | $0 |
| **TOTAL** | **$0 until domain purchase, then $12–15/year** |

---

## FEATURE MAPPING SUMMARY

| Proposal Feature | Payload Solution | Custom Code Needed? |
|---|---|---|
| Meeting details | SiteSettings global | No — edit in admin |
| Contact info + form | SiteSettings global + Form Builder plugin | Minimal |
| Current officers | Users collection (filter by role=officer) | Component only |
| Club history / mission | Pages collection | No |
| How to join | Form Builder plugin | Minimal |
| Project pages | Projects collection | Component only |
| Impact statistics | Projects.impactStats group | Component only |
| Photo gallery | Projects.gallery array + Media collection | Component only |
| Press / news links | Announcements collection (or links in content) | No |
| Shared calendar | Events collection + DayPilot Lite | Component |
| Guest speaker schedule | Events collection (eventType=speaker) | Filter only |
| Event RSVP | RSVPs collection + RSVPButton component | Component |
| Online ticket links | Events.ticketLink field | No |
| Announcement board | Announcements collection | Component only |
| Meeting minutes | Documents collection (category=minutes) | Component only |
| Committee pages | Pages collection | No |
| Volunteer sign-ups | Form Builder plugin or Projects.volunteerSignupEnabled | Minimal |
| Notification system | Payload hooks + Resend email on new announcements | Hook + template |
| Document repository | Documents collection | Component only |
| Members-only login | Payload built-in auth | Minimal |
| Member directory | Users collection + MemberDirectory component | Component |
| Financial reports | Documents collection (category=financial, membersOnly=true) | No |
| New member onboarding | Pages collection (membersOnly=true) | No |
| Donation buttons | SiteSettings.donationLinks + Donate page | Component only |
| Dues payment | Link to external payment (PayPal/Venmo) | No |
| Sponsor recognition | Projects.partners array or dedicated Page | No |
| Mobile-friendly | Tailwind responsive classes | Built-in |
| Social media links | SiteSettings.socialMedia | No |
| SEO | @payloadcms/plugin-seo (configured in payload.config.ts) | Plugin config |
| Theme selection | Theme global + CSS custom properties | System setup |
| Content caching | On-demand ISR via revalidation hooks | Hooks (provided) |

---

*Specification V2 prepared by Thomas Darby — February 2026*
*For the Rotary Club of Downtown Lock Haven*
*Ready for AI agent execution*


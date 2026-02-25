import type { Payload } from 'payload'

import { lexical, lexicalParagraph, p } from '@/seed/core/richText'
import { upsertByField } from '@/seed/core/upsert'

export const seedAnnouncements = async (payload: Payload): Promise<void> => {
  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'welcome-new-website',
    data: {
      title: 'Welcome to Our New Website!',
      slug: 'welcome-new-website',
      publishedDate: '2026-02-25T00:00:00.000Z',
      priority: 'important',
      pinned: true,
      membersOnly: false,
      _status: 'published',
      content: lexicalParagraph(
        "The Rotary Club of Downtown Lock Haven is proud to launch our new website. Here you'll find information about our projects, upcoming events, member resources, and ways to get involved in our community. Check back often for updates!",
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'express-valentines-2026',
    data: {
      title: 'DLH Rotary Featured on Front Page of The Express',
      slug: 'express-valentines-2026',
      publishedDate: '2026-02-14T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexicalParagraph(
        "Our Valentine's Day goody tray deliveries to local first responders were featured on the front page of The Express on February 14, 2026. The club assembled 13 trays plus a special basket for Clark, the county courts' service dog, and delivered them to fire departments, city police, the sheriff's department, and both probation offices. Thank you to all members who helped!",
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'flags-of-honor-2026',
    data: {
      title: "Flags of Honor 2026 - Celebrating America's 250th!",
      slug: 'flags-of-honor-2026',
      publishedDate: '2026-02-24T00:00:00.000Z',
      priority: 'important',
      pinned: true,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          "This year's Flags of Honor is extra special as we celebrate America's 250th birthday. The City of Lock Haven has approved keeping flags in Triangle Park from May 22 through June 16.",
        ),
        p(
          'The ceremony is Sunday, May 24 at 11 AM at Triangle Park. Mayor Joel Long will speak, and we will have live music including Taps played by an Army master sergeant.',
        ),
        p(
          'Sponsor a flag to honor or remember someone special. Deadline for flag orders: May 11. Corporate sponsorship deadline: May 8. Email dlhrotary@gmail.com to order.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'bingo-rescheduled-2026',
    data: {
      title: 'Bingo Fundraiser Rescheduled to September 27',
      slug: 'bingo-rescheduled-2026',
      publishedDate: '2026-01-15T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexicalParagraph(
        'Our annual Bingo Fundraiser has been rescheduled from March 1 to Sunday, September 20, 2026 at KBR Bingo Hall. The change was made to avoid a conflict with an event from the Keystone Central Foundation. We look forward to seeing you there for baskets, 50-50, door prizes, and great fun!',
      ),
    },
  })
}


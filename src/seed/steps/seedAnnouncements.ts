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
          'The ceremony is Sunday, May 24 at 11 AM at Triangle Park. Mayor Joel Long will speak, and we will have live music including Taps played by an Army master sergeant. Kim Vance will sing "God Bless America" at the ceremony.',
        ),
        p(
          'District Governor Dawn Linn is confirmed to participate in the ceremony.',
        ),
        p(
          'Sponsor a flag to honor or remember someone special. Deadline for flag orders: May 11. Corporate sponsorship deadline: May 8. Email dlhrotary@gmail.com to order.',
        ),
        p(
          'Flags of Honor promotional posters are being distributed by Wendy Stiver. Contact the club if you\'d like one to display.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'speech-contest-2026',
    data: {
      title: 'Four-Way Test Speech Contest Update',
      slug: 'speech-contest-2026',
      publishedDate: '2026-03-14T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          "The Four-Way Test Speech Contest took place at Central Mountain High School, and we're proud to share the results.",
        ),
        p(
          "Our club's winner was Christiana Gladden, with Diana Yaroshchuk as our runner-up. The Lock Haven Rotary Club's winner was Sarah Lavallee. Each club awarded a $100 first-place prize and a $50 runner-up prize.",
        ),
        p(
          'All three students presented their speeches at our March 10 club meeting, giving members a chance to hear them before the regional competition. The regional contest was held Saturday, March 14, at the Rotary Youth Summit in Bellefonte. Both local winners delivered strong performances but did not advance.',
        ),
        p(
          'Congratulations to Christiana, Diana, and Sarah for their hard work and impressive speeches. The club also covered the $5 registration fee for any CMHS student attending the Youth Summit.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'upcoming-speakers-2026',
    data: {
      title: 'Upcoming Guest Speakers',
      slug: 'upcoming-speakers-2026',
      publishedDate: '2026-03-23T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p('We have several guest visits coming up at our Tuesday meetings:'),
        p('Rick Schulze, Lock Haven\'s new Downtown Manager, has been invited to speak to the club.'),
        p('Ed Hosler and Clark, the Clinton County Courthouse therapy dog, will be visiting.'),
        p(
          'We also hope to host a presentation on ShelterBox, the global disaster relief organization our club is supporting through the tri-district fundraising challenge.',
        ),
        p('Stay tuned for specific dates!'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'welcome-haley-jolin',
    data: {
      title: 'Welcome to Our Newest Member, Haley Jolin!',
      slug: 'welcome-haley-jolin',
      publishedDate: '2026-03-24T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          "The Rotary Club of Downtown Lock Haven is thrilled to officially welcome Haley Jolin as our newest member! Haley was inducted at the club's annual charter anniversary dinner on March 24 at Fox's Pizza Den.",
        ),
        p(
          'Haley has already been making an impact, joining our Corporate Sponsorship Banner Task Group for Flags of Honor. We\'re excited to have her energy and ideas as part of our team.',
        ),
        p('Welcome to the club, Haley!'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'wine-wilds-shelterbox-2026',
    data: {
      title: 'Wine in the Wilds & ShelterBox Challenge — April 25',
      slug: 'wine-wilds-shelterbox-2026',
      publishedDate: '2026-03-26T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'Mark your calendars for Saturday, April 25! The club will be selling soft pretzels at Wine in the Wilds, a Clinton County Historical Society fundraiser at the Clinton County Fairgrounds from 2 to 6 PM. Admission is $40.',
        ),
        p(
          "We're also proud to be part of a tri-district challenge to raise money for ShelterBox by May 1. ShelterBox provides emergency shelter and essential supplies to families displaced by disaster and conflict around the world. Our club has committed $100 and will add all pretzel sale profits to our donation. A ShelterBox will be on display at the event so you can see exactly what your support provides.",
        ),
        p('Come out, enjoy local wine, and help us make a difference locally and globally.'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'bingo-rescheduled-2026',
    data: {
      title: 'Bingo Fundraiser Rescheduled to September 20',
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


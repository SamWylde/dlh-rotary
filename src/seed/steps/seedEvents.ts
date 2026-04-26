import type { Payload } from 'payload'

import { getNextTuesday } from '@/seed/core/date'
import { lexical, lexicalParagraph, p } from '@/seed/core/richText'
import { upsertByField } from '@/seed/core/upsert'

export const seedEvents = async (payload: Payload): Promise<void> => {
  const nextTuesday = getNextTuesday()

  await upsertByField(payload, {
    collection: 'events',
    uniqueField: 'slug',
    uniqueValue: `meeting-${nextTuesday.toISOString().split('T')[0]}`,
    data: {
      title: 'Weekly Club Meeting',
      slug: `meeting-${nextTuesday.toISOString().split('T')[0]}`,
      date: nextTuesday.toISOString(),
      eventType: 'meeting',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      isRecurring: true,
      recurringNote: 'Every Tuesday at 5:30 PM. Social time begins at 5:15 PM.',
      description: lexicalParagraph(
        'Weekly gathering for fellowship, updates, and guest programming. In severe weather, Zoom participation is available.',
      ),
      _status: 'published',
    },
  })

  const upcomingEvents = [
    {
      slug: 'meeting-2026-04-28',
      title: 'Board Meeting / Club Meeting',
      date: '2026-04-28T17:30:00.000Z',
      eventType: 'board',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description: 'Board meeting and regular club meeting at the regular Tuesday meeting time.',
    },
    {
      slug: 'meeting-2026-05-05',
      title: 'Club Meeting',
      date: '2026-05-05T17:30:00.000Z',
      eventType: 'meeting',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description: 'Regular Tuesday club meeting.',
    },
    {
      slug: 'tri-district-pels-2026',
      title: 'Tri-District PELS',
      date: '2026-03-07T09:00:00.000Z',
      eventType: 'meeting',
      location: 'TBD',
      description:
        'Tri-District Presidents-Elect Leadership Seminar. Lisa and Diahann will be attending.',
    },
    {
      slug: 'charter-date-2026',
      title: 'Club Charter Anniversary Dinner',
      date: '2026-03-24T17:30:00.000Z',
      eventType: 'social',
      location: "Fox's Pizza Den, Lock Haven",
      description:
        "The club celebrated our charter date anniversary with a dinner at Fox's Pizza Den on March 24. Haley Jolin was inducted as our newest member at the event.",
    },
    {
      slug: 'no-meeting-2026-03-31',
      title: 'No Meeting — March 31',
      date: '2026-03-31T17:30:00.000Z',
      eventType: 'meeting',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description:
        'There will be no club meeting on March 31. Regular meetings resume the following Tuesday.',
    },
    {
      slug: 'best-of-clinton-county-2026',
      title: 'Best of Clinton County Day',
      date: '2026-06-13T09:00:00.000Z',
      eventType: 'social',
      location: 'TBD',
      description:
        'The club will participate in Best of Clinton County Day. More details to come as the event approaches.',
    },
    {
      slug: 'district-governor-visit-2026',
      title: 'District Governor Visit — Sean Murtagh',
      date: '2026-07-28T17:30:00.000Z',
      eventType: 'meeting',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description:
        'The club will host our new Rotary District 7360 Governor, Sean Murtagh, at our regular Tuesday meeting. All members and prospective members are welcome to attend.',
    },
  ]

  for (const event of upcomingEvents) {
    await upsertByField(payload, {
      collection: 'events',
      uniqueField: 'slug',
      uniqueValue: event.slug,
      data: {
        title: event.title,
        slug: event.slug,
        date: event.date,
        eventType: event.eventType,
        location: event.location,
        description: lexicalParagraph(event.description),
        _status: 'published',
      },
    })
  }

  await upsertByField(payload, {
    collection: 'events',
    uniqueField: 'slug',
    uniqueValue: 'wine-in-the-wilds-2026',
    data: {
      title: 'Wine in the Wilds',
      slug: 'wine-in-the-wilds-2026',
      date: '2026-04-25T14:00:00.000Z',
      endDate: '2026-04-25T18:00:00.000Z',
      eventType: 'fundraiser',
      location: 'Clinton County Fairgrounds',
      ticketPrice: 40,
      description: lexical(
        p(
          'The Rotary Club of Downtown Lock Haven sold out of soft pretzels at Wine in the Wilds, a fundraiser hosted by the Clinton County Historical Society.',
        ),
        p(
          'Thanks to Lisa and Tom for selling pretzels, and especially to Diahann for picking up the pretzels and staying to sell them.',
        ),
        p(
          'The club had discussed setting up a ShelterBox at the event, but did not have enough Rotarians available to do it.',
        ),
      ),
      _status: 'published',
    },
  })

  const flagsEvents = [
    {
      slug: 'club-leadership-learning-seminar-2026',
      title: 'Club Leadership Learning Seminar',
      date: '2026-05-12T09:00:00.000Z',
      endDate: '2026-05-14T17:00:00.000Z',
      eventType: 'meeting',
      location: 'TBD',
      description:
        'Club Leadership Learning Seminar running May 12 through May 14. Additional details will be shared with participating members.',
    },
    {
      slug: 'foh-label-plaques-2026',
      title: 'Flags of Honor - Make Flag Plaques',
      date: '2026-05-12T17:30:00.000Z',
      eventType: 'service',
      location: 'Covenant United Methodist Church, 44 W. Main St., Lock Haven',
      description:
        'Full club work session to make the first batch of flag plaques for Flags of Honor. 5:30 PM at Covenant Church.',
    },
    {
      slug: 'foh-find-holes-2026',
      title: 'Flags of Honor - Find Flagpole Holes',
      date: '2026-05-20T17:30:00.000Z',
      eventType: 'service',
      location: 'Triangle Park, Lock Haven',
      description:
        'Full club work session in the park to find the flagpole holes. 5:30 PM. Bring gardening gloves, a trowel, tape measure, screwdriver, and a kneeling pad if you have one.',
    },
    {
      slug: 'foh-banner-plaques-2026',
      title: 'Flags of Honor - Make Banner & Sort Plaques',
      date: '2026-05-19T17:30:00.000Z',
      eventType: 'service',
      location: 'Covenant United Methodist Church, 44 W. Main St., Lock Haven',
      description:
        'Full club work session to make the banner, and to make and sort plaques. 5:30 PM at Covenant Church.',
    },
    {
      slug: 'foh-corporate-deadline-2026',
      title: 'Flags of Honor — Corporate Sponsorship Deadline',
      date: '2026-05-08T17:00:00.000Z',
      eventType: 'service',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description:
        'Deadline for corporate sponsorships for Flags of Honor 2026. Email dlhrotary@gmail.com to sponsor.',
    },
    {
      slug: 'foh-flag-deadline-2026',
      title: 'Flags of Honor — Flag Sponsorship Deadline',
      date: '2026-05-11T17:00:00.000Z',
      eventType: 'service',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description:
        'Deadline for individual flag sponsorships for Flags of Honor 2026. $35 per flag. Email dlhrotary@gmail.com to order.',
    },
    {
      slug: 'foh-install-2026',
      title: 'Flags of Honor - Flag Installation',
      date: '2026-05-22T09:00:00.000Z',
      eventType: 'service',
      location: 'Triangle Park, Lock Haven',
      description: 'Full club work session in the park to install the Flags of Honor display.',
    },
    {
      slug: 'foh-ceremony-2026',
      title: 'Flags of Honor Ceremony',
      date: '2026-05-24T11:00:00.000Z',
      eventType: 'social',
      location: 'Triangle Park, Lock Haven',
      description:
        'Annual Flags of Honor ceremony celebrating America\'s 250th birthday. Please arrive at 11 AM. Amy Kowatch will sing the national anthem, and Kim Vance will sing "America the Beautiful"; Janine is inviting the Central Mountain Middle School Choir to sing. The club is inviting 15 or 16 honored guests to sit under the tent and be introduced. Club lunch will follow the ceremony.',
    },
    {
      slug: 'foh-removal-2026',
      title: 'Flags of Honor - Flag Removal',
      date: '2026-06-16T09:00:00.000Z',
      eventType: 'service',
      location: 'Triangle Park, Lock Haven',
      description: 'Remove flags from Triangle Park after the extended display through Flag Day.',
    },
    {
      slug: 'bingo-fundraiser-2026',
      title: 'Bingo Fundraiser',
      date: '2026-09-20T13:00:00.000Z',
      eventType: 'fundraiser',
      location: 'KBR Bingo Hall, Lock Haven',
      description:
        'Annual bingo fundraiser with basket raffle (50+ baskets), 50-50 drawing, door prizes, rip tickets, and special games. All are welcome!',
    },
  ]

  for (const event of flagsEvents) {
    await upsertByField(payload, {
      collection: 'events',
      uniqueField: 'slug',
      uniqueValue: event.slug,
      data: {
        title: event.title,
        slug: event.slug,
        date: event.date,
        endDate: 'endDate' in event ? event.endDate : undefined,
        eventType: event.eventType,
        location: event.location,
        description: lexicalParagraph(event.description),
        _status: 'published',
      },
    })
  }

  const annualEvents = [
    {
      slug: 'angel-lights-2026',
      title: 'Angel Lights',
      date: '2026-09-11T19:00:00.000Z',
      eventType: 'social',
      location: 'Triangle Park, Lock Haven',
      description:
        'Annual luminary display in Triangle Park honoring first responders, veterans, teachers, and loved ones on the anniversary of September 11. Luminaries are $5 each and available at The Bus Stops Here (25 E. Main St.).',
    },
    {
      slug: 'people-of-action-open-house-2026',
      title: 'People of Action Open House',
      date: '2026-10-06T17:00:00.000Z',
      eventType: 'social',
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description:
        'Annual open house featuring local nonprofits, wine, and refreshments. The club donates $500 to each featured organization. Free and open to the public. A great way to learn about service opportunities in Clinton County.',
    },
    {
      slug: 'veterans-gift-bags-2026',
      title: 'Holiday Gift Bags for Veterans',
      date: '2026-12-17T13:00:00.000Z',
      eventType: 'service',
      location: 'Covenant United Methodist Church, 44 W. Main St., Lock Haven',
      description:
        "Annual delivery of gift bags to local veterans in care facilities. Meeting point at Covenant UMC. Bags are assembled and delivered to Fulmer's Personal Care Home, the VFW, Haven Place, and Lock Haven Rehabilitation.",
    },
  ]

  for (const event of annualEvents) {
    await upsertByField(payload, {
      collection: 'events',
      uniqueField: 'slug',
      uniqueValue: event.slug,
      data: {
        title: event.title,
        slug: event.slug,
        date: event.date,
        eventType: event.eventType,
        location: event.location,
        description: lexicalParagraph(event.description),
        _status: 'published',
      },
    })
  }
}

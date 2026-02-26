import type { Payload } from 'payload'

import { getNextTuesday } from '@/seed/core/date'
import { lexicalParagraph } from '@/seed/core/richText'
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

  const flagsEvents = [
    {
      slug: 'foh-label-plaques-2026',
      title: 'Flags of Honor - Label Plaques',
      date: '2026-05-05T17:30:00.000Z',
      eventType: 'service',
      location: 'Covenant United Methodist Church, 44 W. Main St., Lock Haven',
      description: 'Work session to put labels on plaques for Flags of Honor.',
    },
    {
      slug: 'foh-find-holes-2026',
      title: 'Flags of Honor - Find Flagpole Holes',
      date: '2026-05-12T17:30:00.000Z',
      eventType: 'service',
      location: 'Triangle Park, Lock Haven',
      description: 'Work session in the park to locate and mark flagpole holes before installation day.',
    },
    {
      slug: 'foh-banner-plaques-2026',
      title: 'Flags of Honor - Make Banner & Sort Plaques',
      date: '2026-05-19T17:30:00.000Z',
      eventType: 'service',
      location: 'Covenant United Methodist Church, 44 W. Main St., Lock Haven',
      description: 'Work session to make the corporate sponsorship banner and sort plaques for installation.',
    },
    {
      slug: 'foh-install-2026',
      title: 'Flags of Honor - Flag Installation',
      date: '2026-05-22T09:00:00.000Z',
      eventType: 'service',
      location: 'Triangle Park, Lock Haven',
      description:
        'Install flags in Triangle Park. Bring gardening gloves, trowel, tape measure, screwdriver, and a kneeling pad.',
    },
    {
      slug: 'foh-ceremony-2026',
      title: 'Flags of Honor Ceremony',
      date: '2026-05-24T11:00:00.000Z',
      eventType: 'social',
      location: 'Triangle Park, Lock Haven',
      description:
        "Annual Flags of Honor ceremony - this year celebrating America's 250th birthday. Mayor Joel Long will speak. Live music including Taps played by an Army master sergeant. Arrive at 11 AM. Club lunch to follow.",
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
        'Annual open house featuring local nonprofits, wine, and refreshments. The club donates $500 to each featured organization. Free and open to the public — a great way to learn about service opportunities in Clinton County.',
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


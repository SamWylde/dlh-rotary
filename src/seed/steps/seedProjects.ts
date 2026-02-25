import type { Payload } from 'payload'

import { h3, lexical, p } from '@/seed/core/richText'
import { upsertByField } from '@/seed/core/upsert'

export const seedProjects = async (payload: Payload): Promise<void> => {
  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'flags-of-honor',
    data: {
      title: 'Flags of Honor',
      slug: 'flags-of-honor',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'Each Memorial Day, DLH Rotary transforms Triangle Park into a patriotic display by placing American flags sponsored by community members in honor or memory of their loved ones.',
        ),
        p(
          "2026 is extra special: America's 250th celebration year. The City of Lock Haven has approved keeping the flags in the park from May 22 through Flag Day, June 16 - over three weeks of display.",
        ),
        h3('The Ceremony'),
        p(
          'The annual ceremony takes place at Triangle Park on May 24 at 11 AM. Lock Haven Mayor Joel Long will speak. Performers include vocalist Sheila Carroll, Kim Vance, and an Army master sergeant who will play Taps. Each musician receives a complimentary flag sponsorship.',
        ),
        h3('How to Participate'),
        p(
          'Sponsor a flag to honor or remember someone special in your life. Corporate sponsorships are also available. Contact the club at dlhrotary@gmail.com or reach out to any member. Deadline for flag sponsorships: May 11, 2026. Deadline for corporate sponsorships: May 8, 2026.',
        ),
        h3('Supported By'),
        p(
          'Local businesses supporting Flags of Honor include SWC Realty and many downtown Lock Haven businesses. Contact Diahann Claghorn for corporate sponsorship opportunities.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'angel-lights',
    data: {
      title: 'Angel Lights',
      slug: 'angel-lights',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'On September 11 each year, the club places luminaires throughout Lock Haven to remember the victims of 9/11 and honor local first responders.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'bingo-fundraiser',
    data: {
      title: 'Bingo Fundraiser',
      slug: 'bingo-fundraiser',
      category: 'fundraiser',
      projectStatus: 'upcoming',
      _status: 'published',
      description: lexical(
        p(
          'Our annual bingo fundraiser features basket raffles (goal: 50+ baskets), a 50-50 drawing, door prizes, rip tickets, and special bingo games.',
        ),
        p(
          'The 2026 Bingo is scheduled for Sunday, September 20 at KBR Bingo Hall. It was rescheduled from March 1 to avoid a conflict with a Keystone Central Foundation event.',
        ),
        p(
          "Donations of gift cards or basket items from local businesses are welcome. Past supporters include SWC Realty, First Quality, Truck-Lite, West Pharmaceutical, Just Born (Peeps), Fox's Restaurant, Weis Market, Dunkin' Donuts, Pearl's Cafe, and many more.",
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'valentines-goody-trays',
    data: {
      title: "Valentine's Day Goody Trays",
      slug: 'valentines-goody-trays',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          "Each February, club members assemble goody trays filled with cookies and candy and deliver them to local first responders, fire departments, police, the sheriff's department, and probation offices.",
        ),
        p(
          "In 2026, the club made 13 trays and a special basket for Clark, the county courts' service dog. The deliveries were featured on the front page of The Express on February 14, 2026.",
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'veterans-gift-bags',
    data: {
      title: 'Holiday Gift Bags for Veterans',
      slug: 'veterans-gift-bags',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'Each holiday season, the club assembles and delivers gift bags to local veterans at care facilities and service organizations.',
        ),
        p(
          "In December 2025, the club spent $418 and delivered 30 gift bags to Fulmer's Personal Care Home, the VFW Veterans Benefits office, Haven Place, and Lock Haven Rehabilitation and Senior Living.",
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'roberta-way-scholarship',
    data: {
      title: 'Roberta Way Scholarship',
      slug: 'roberta-way-scholarship',
      category: 'youth',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'The club awards the Roberta Way Scholarship annually to a deserving local student. Scholarship funds are held in a dedicated account separate from general club operations.',
        ),
        p(
          'Applications are announced through Central Mountain High School each spring. Contact dlhrotary@gmail.com for information.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'four-way-test-speech-contest',
    data: {
      title: 'Four-Way Test Speech Contest',
      slug: 'four-way-test-speech-contest',
      category: 'youth',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          "The club sponsors students from Central Mountain High School to compete in Rotary's Four-Way Test speech contest at regional and district levels.",
        ),
        p(
          'This initiative is conducted in partnership with the Lock Haven Rotary Club. The club voted to sponsor a winner to advance to regional and district competition.',
        ),
      ),
    },
  })
}


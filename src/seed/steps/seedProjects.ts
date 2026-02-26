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
          'Flags of Honor is the club\'s signature project and largest annual fundraiser. Since approximately 2014, the club has transformed Triangle Park in downtown Lock Haven into a patriotic display of full-sized American flags sponsored by community members in honor or memory of their loved ones. In 2024, 168 flags flew in the park; in 2025, more than 150.',
        ),
        h3('2026 — America\'s 250th'),
        p(
          'This year marks the 12th annual Flags of Honor and coincides with America\'s 250th birthday celebration. The City of Lock Haven approved an extended display from May 22 through Flag Day, June 16 — over three weeks. The ceremony is Sunday, May 24 at 11 AM at Triangle Park, featuring Posting of Colors, the National Anthem, Folding of the Flag, and Taps played by an Army master sergeant. Vocalists Sheila Carroll and Kim Vance will perform.',
        ),
        h3('How to Participate'),
        p(
          'Sponsor a flag for $35 to honor or remember someone special. Corporate sponsorships are also available. Flag sponsorship deadline: May 11, 2026. Corporate sponsorship deadline: May 8, 2026. Contact dlhrotary@gmail.com or Wendy Stiver at 570-295-3443.',
        ),
        h3('Angel Partners'),
        p(
          'Flags of Honor is supported by Angel Partners including Bear Country Radio, The Express, Nestlerode Contracting, and Schlesinger Communications, along with many corporate and individual sponsors from the Lock Haven community.',
        ),
        p(
          'All proceeds fund scholarships for Central Mountain High School seniors and donations to local nonprofits.',
        ),
        h3('COVID Adaptation'),
        p(
          'In 2020, the club adapted the project to a newspaper ad format with $20 sponsorships, keeping the tradition alive during the pandemic.',
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
          'Each September 11, the club places luminaries in Triangle Park to remember the victims of 9/11 and honor local first responders, veterans, teachers, friends, and loved ones.',
        ),
        p(
          'Luminaries are $5 each. Sponsors can personalize and decorate the bags. They are available for purchase at The Bus Stops Here (25 E. Main St., Lock Haven) and during the Labor Day Regatta weekend.',
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
          'The club\'s bingo fundraiser features basket raffles (goal: 50+ baskets), a 50-50 drawing, door prizes, rip tickets, and special bingo games. Food is provided by Citizens Hose Fire Co.',
        ),
        h3('2026 Details'),
        p(
          'The 2026 Bingo is scheduled for September 2026 at KBR Bingo Hall, 1 Piper Way, Lock Haven. Doors open at 11:00 AM, games start at 1:00 PM. Tickets are $20 in advance.',
        ),
        h3('Where to Buy Tickets'),
        p(
          'Tickets are available at The Bus Stops Here (25 E. Main St.), The Express (9 E. Main St.), Puff Discount (328 Bellefonte Ave. and 103 Hogan Blvd.), and from any Downtown Rotarian.',
        ),
        p(
          'Donations of gift cards or basket items from local businesses are welcome. Past supporters include SWC Realty, First Quality, Truck-Lite, West Pharmaceutical, Just Born (Peeps), and many more. All proceeds support club scholarships and community projects.',
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
          'Each February, club members assemble cookie and candy trays at Covenant United Methodist Church and deliver them to local first responders and service organizations.',
        ),
        h3('2026 Deliveries'),
        p(
          'In 2026, the club expanded to 14 stops: Citizens Hose Co., Eastside Fire Co., Lock Haven Police, Lock Haven EMS, Goodwill Hose Co. (Flemington), Goodwill Ambulance, Dunnstown Fire, Castanea Fire, Mill Hall Fire, the Communications Center, the Sheriff\'s Office, Juvenile Probation, Adult Probation, and a special basket of low-calorie treats for Clark the service dog.',
        ),
        p(
          'The deliveries were featured on the front page of The Express on February 14, 2026.',
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
          'Each holiday season, the club assembles and delivers gift bags filled with puzzle books, toothpaste, and other useful items to local veterans in care facilities. The project was originally started in partnership with DAR, and the late Dr. Betty Schantz was its original chair. It is now co-chaired by Carmen Banfill and Diahann Claghorn.',
        ),
        h3('2025 Deliveries'),
        p(
          "In December 2025, the club delivered 30 gift bags to Fulmer's Personal Care Home, the VFW Veterans Benefits office, Haven Place, and Lock Haven Rehabilitation and Senior Living (formerly Susque-View).",
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'roberta-way-scholarship',
    data: {
      title: 'Scholarships',
      slug: 'roberta-way-scholarship',
      category: 'youth',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'The club awards three annual scholarships to graduating seniors at Central Mountain High School, totaling $5,500. Scholarship amounts have been increased significantly in recent years, funded by Flags of Honor proceeds and the Bingo fundraiser.',
        ),
        p(
          'The three named scholarships honor Eleanor E.J. Kodish ($2,000), Dr. Betty Baird Schantz ($2,000), and Roberta M. Way ($1,500) — dedicated club members who left a lasting impact on the community.',
        ),
        p(
          'Applications are announced through Central Mountain High School each spring. Visit our Scholarships page for full details and eligibility requirements.',
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
          "The club co-sponsors with the Lock Haven Rotary Club (the \"noon club\") a Four-Way Test speech contest at Central Mountain High School. Students deliver speeches based on Rotary's Four-Way Test ethical framework.",
        ),
        p(
          'The club voted unanimously to sponsor a winning student to compete at the regional contest and, if successful, advance to the district-wide competition in Rotary District 7360.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'little-red-schoolhouse-libraries',
    data: {
      title: 'Little Red Schoolhouse Libraries',
      slug: 'little-red-schoolhouse-libraries',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          "The Little Red Schoolhouse Libraries are the club's signature literacy project — free community book-sharing stations placed around Lock Haven. They are stocked exclusively with books and reading material for community members of all ages.",
        ),
        h3('Locations'),
        p(
          'Libraries are located at Triangle Park, Piper, Tiger Den, and Hanna Park. Diahann Claghorn is the primary person who fills and maintains them.',
        ),
        p(
          'Community members are welcome to take a book or leave a book. The libraries are intended exclusively for reading material.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'projects',
    uniqueField: 'slug',
    uniqueValue: 'people-of-action-open-house',
    data: {
      title: 'People of Action Open House',
      slug: 'people-of-action-open-house',
      category: 'community-service',
      projectStatus: 'active',
      _status: 'published',
      description: lexical(
        p(
          'Each October, the club hosts a People of Action Open House at the Poorman Gallery from 5:00 to 7:00 PM, with wine and refreshments. The event features 3-4 local nonprofit organizations, and the club donates $500 to each.',
        ),
        h3('Recent Featured Organizations'),
        p(
          '2025: Sleep in Heavenly Peace, Boxes of Hope, and The New Love Center. 2024: Boxes of Hope, Haven Cupboard, and the Lock Haven Area Shoe Bank.',
        ),
        p(
          'The Open House is free and open to the public. It is a great opportunity to learn about nonprofits serving Clinton County and to see how the Rotary Club of Downtown Lock Haven supports the community.',
        ),
      ),
    },
  })
}

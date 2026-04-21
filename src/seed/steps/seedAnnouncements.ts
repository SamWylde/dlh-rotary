import type { Payload } from 'payload'

import { h3, lexical, lexicalParagraph, p } from '@/seed/core/richText'
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
          'The ceremony is Sunday, May 24 at 11 AM at Triangle Park. Amy Kowatch will sing the national anthem, Scouts will present the colors, the National Guard will perform the ceremonial flag-folding, Carmen will read the meaning of each fold, and Master Sgt. Anderson will play Taps.',
        ),
        p(
          'The Pennsylvania governor has been invited, and Mayor Joel Long will receive a formal invitation to speak. Honored guests will include veteran officers, city council members, and county commissioners.',
        ),
        p(
          'Sponsor a flag to honor or remember someone special. Deadline for flag orders: May 11. Corporate sponsorship deadline: May 8. Email dlhrotary@gmail.com to order.',
        ),
        p(
          'Flags of Honor promotional posters are being distributed by Wendy Stiver. Kim Vance was invited to sing "God Bless America" but declined, and the club will recognize her past participation with a complimentary flag sponsorship.',
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
        p("Rick Schulze, Lock Haven's new Downtown Manager, has been invited to speak to the club."),
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
          "Haley has already been making an impact, joining our Corporate Sponsorship Banner Task Group for Flags of Honor. We're excited to have her energy and ideas as part of our team.",
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
      title: 'Wine in the Wilds - April 25',
      slug: 'wine-wilds-shelterbox-2026',
      publishedDate: '2026-03-26T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'Mark your calendars for Saturday, April 25. Wine in the Wilds runs from 2 to 6 PM at the Clinton County Fairgrounds, and the Rotary Club of Downtown Lock Haven will be selling soft pretzels again. As of the April 14 meeting, 19 wine and beer vendors, 16 other vendors, and 2 food trucks were signed up.',
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
    uniqueValue: 'club-update-april-7-2026',
    data: {
      title: 'Club Update - April 7 Meeting',
      slug: 'club-update-april-7-2026',
      publishedDate: '2026-04-13T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'Guest speaker Rick Schulze, manager of Downtown Lock Haven Inc., joined the club on April 7 and was introduced by Bonnie.',
        ),
        p(
          'Members shared memories of Lock Haven including Sidewalk Sales, downtown stores, and local festivals before Rick outlined his hopes for the city.',
        ),
        h3("Rick Schulze's Vision"),
        p(
          'Rick spoke about expanding the Eagle Project from six eagles to twelve, adding more public art, statues, and display boards, promoting downtown businesses around seasonal events, and bringing more activity to the levee and the Susquehanna River through ideas such as a national canoe race and possible paddle boats, kayaks, and sculling groups.',
        ),
        p(
          'He also talked about economic vitality, reopening the PA Wilds store, and upcoming items including Best of Clinton County Festival on June 13, the teen documentary "Find Yourself. Tell My Story" at The Roxy in May, and a Masonic Temple tour for a potential investor interested in creating small shops.',
        ),
        p(
          'Challenges discussed included reduced store revenue because of higher supply and gas prices, along with alleys in need of repair. Rick encouraged store owners to attend PA Small Business Day in Harrisburg on May 5 and mentioned an idea to promote teachers with apple coupons for downtown businesses.',
        ),
        p('Flags of Honor update: Janine and Heather discussed the Kim Vance question and left the decision with her.'),
        p('Attending April 7: Janine, Heather, Jeanne, Cathy, Carmen, Bonnie, Haley, and Emma.'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'club-minutes-april-14-2026',
    data: {
      title: 'Club Minutes - April 14 Meeting',
      slug: 'club-minutes-april-14-2026',
      publishedDate: '2026-04-20T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h3('Upcoming Dates'),
        p('Apr 21: Club meeting at the regular time and place.'),
        p('Apr 25: Wine in the Wilds, 2 to 6 PM at the Clinton County Fairgrounds. The club will be selling soft pretzels again.'),
        p('Apr 28: Tentative board meeting and the last regular club meeting for a while.'),
        p('May 5: Full club work session to label plaques, 5:30 PM at Covenant Church.'),
        p('May 8: Corporate sponsorship deadline for Flags of Honor.'),
        p('May 11: Flag sponsorship deadline for Flags of Honor.'),
        p('May 12: Full club work session in the park to locate flagpole holes, 5:30 PM.'),
        p('May 19: Full club work session to make the banner and sort plaques, 5:30 PM at Covenant Church.'),
        p(
          'May 22: Full club work session in the park to install flags. Bring gardening gloves, a trowel, tape measure, screwdriver, and kneeling pad if you have one.',
        ),
        p('May 24: Public ceremony in the park. Arrive at 11 AM. Lunch afterward at Restless Oaks Restaurant.'),
        h3('Meeting Notes'),
        p('Wine in the Wilds update: 19 wine and beer vendors, 16 other vendors, and 2 food trucks were signed up as of the meeting.'),
        p('Club picnic update: Janine is hosting on Tuesday, July 7, with Tuesday, July 14 as the alternate date.'),
        h3('Flags of Honor Updates'),
        p(
          'Members were asked to text Wendy after putting up all of their posters. A list of previous corporate sponsors who have not yet responded is coming, and all members are asked to help contact them.',
        ),
        p(
          'The Pennsylvania governor has been invited and a response is expected in about two weeks. If the governor is unavailable, Rick Vilello, DCED Deputy Secretary for Community Affairs, and the former Lock Haven mayor are backup options. Current Mayor Joel Long will receive a formal invitation to speak.',
        ),
        p('Honored guests who will attend but not speak include veteran officers, city council members, and county commissioners.'),
        p(
          'Amy Kowatch will sing the national anthem. Kim Vance declined the invitation to sing "God Bless America" and will receive a complimentary flag sponsorship in recognition of her past participation. Janine will reach out to the Central Mountain Middle School Choir director about participating.',
        ),
        p(
          'Scouts will present the colors, the National Guard will conduct the ceremonial flag-folding, Carmen will read the meaning of each fold, Master Sgt. Anderson will play Taps, and Brady Carnahan will take drone photos.',
        ),
        p(
          'Carmen reminded the city about mowing. The sound system and outlets will be tested in advance, and community service workers will help set up and take down the flags.',
        ),
        p('Attending April 14: Janine, Heather, Carmen, Marianne, Diahann, Jeanne, Bonnie, and Emma.'),
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

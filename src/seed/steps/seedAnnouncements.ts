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
          'The ceremony is Sunday, May 24 at 11 AM at Triangle Park. Amy Kowatch will sing the national anthem, Kim Vance will sing "America the Beautiful," and Janine is inviting the Central Mountain Middle School Choir to sing. Scouts will present the colors, the National Guard will perform the ceremonial flag-folding, Carmen will read the meaning of each fold, and Master Sgt. Anderson will play Taps.',
        ),
        p(
          'The Pennsylvania governor has been invited, and Mayor Joel Long will receive a formal invitation to speak. The club is inviting 15 or 16 honored guests who will sit under the tent, in comfortable chairs, and be introduced.',
        ),
        p(
          'Sponsor a flag to honor or remember someone special. Deadline for flag orders: May 11. Corporate sponsorship deadline: May 8. Email dlhrotary@gmail.com to order.',
        ),
        p(
          "Flags of Honor promotional posters are being distributed by Wendy Stiver. Contact the club if you'd like one to display.",
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
        p(
          "Rick Schulze, Lock Haven's new Downtown Manager, has been invited to speak to the club.",
        ),
        p('Ed Hosler and Clark, the Clinton County Courthouse therapy dog, will be visiting.'),
        p(
          "Brooklynn Bechdel, one of our scholarship recipients, is also on the club's upcoming speaker list.",
        ),
        p('We are also planning to host a representative from the dialysis center.'),
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
      title: 'Wine in the Wilds Recap - April 25',
      slug: 'wine-wilds-shelterbox-2026',
      publishedDate: '2026-03-26T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'The club sold out of soft pretzels Saturday, April 25 at Wine in the Wilds, sponsored by the Clinton County Historical Society.',
        ),
        p(
          'Thanks to Lisa and Tom for selling pretzels, and especially to Diahann for picking up the pretzels and staying to sell them.',
        ),
        p(
          'The club had discussed setting up a ShelterBox at the event, but did not have enough Rotarians available to do it.',
        ),
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
        p(
          'Flags of Honor update: Janine and Heather discussed the Kim Vance question and left the decision with her.',
        ),
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
        p(
          'Apr 25: Wine in the Wilds, 2 to 6 PM at the Clinton County Fairgrounds, with setup at 1 PM. The club will be selling soft pretzels again.',
        ),
        p('Apr 28: Tentative board meeting and the last regular club meeting for a while.'),
        p('May 5: Regular club meeting.'),
        p('May 8: Corporate sponsorship deadline for Flags of Honor.'),
        p('May 11: Flag sponsorship deadline for Flags of Honor.'),
        p('May 12-14: Club Leadership Learning Seminar.'),
        p(
          'May 12: Full club work session to make the first batch of flag plaques, 5:30 PM at Covenant Church.',
        ),
        p(
          'May 19: Full club work session to make the banner and make and sort plaques, 5:30 PM at Covenant Church.',
        ),
        p(
          'May 20: Full club work session in the park to find the flagpole holes, 5:30 PM. Bring gardening gloves, a trowel, tape measure, screwdriver, and a kneeling pad if you have one.',
        ),
        p('May 22: Full club work session in the park to install flags.'),
        p('May 24: Public ceremony in the park. Arrive at 11 AM. Club lunch follows.'),
        h3('Meeting Notes'),
        p(
          'Wine in the Wilds update: 19 wine and beer vendors, 16 other vendors, and 2 food trucks were signed up as of the meeting.',
        ),
        p(
          'Club picnic update: Janine is hosting at her house on Tuesday, July 7, with Tuesday, July 14 as the alternate date.',
        ),
        h3('Flags of Honor Updates'),
        p(
          'Members were asked to text Wendy after putting up all of their posters. A list of previous corporate sponsors who have not yet responded is coming, and all members are asked to help contact them.',
        ),
        p(
          'The Pennsylvania governor has been invited and a response is expected in about two weeks. If the governor is unavailable, Rick Vilello, DCED Deputy Secretary for Community Affairs, and the former Lock Haven mayor are backup options. Current Mayor Joel Long will receive a formal invitation to speak.',
        ),
        p(
          'Honored guests who will attend but not speak include veteran officers, city council members, and county commissioners.',
        ),
        p(
          'Amy Kowatch will sing the national anthem. Kim Vance has agreed to participate and will sing "America the Beautiful." Janine is also inviting the Central Mountain Middle School Choir to sing.',
        ),
        p(
          'Scouts will present the colors, the National Guard will conduct the ceremonial flag-folding, Carmen will read the meaning of each fold, Master Sgt. Anderson will play Taps, and Brady Carnahan will take drone photos.',
        ),
        p(
          'Carmen reminded the city about mowing. The sound system and outlets will be tested in advance, and community service workers will help set up and take down the flags.',
        ),
        p(
          'Attending April 14: Janine, Heather, Carmen, Marianne, Diahann, Jeanne, Bonnie, and Emma.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'club-minutes-april-21-2026',
    data: {
      title: 'Club Minutes - April 21 Meeting',
      slug: 'club-minutes-april-21-2026',
      publishedDate: '2026-04-26T00:00:00.000Z',
      priority: 'normal',
      pinned: false,
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h3('Coming Right Up'),
        p('Tuesday, April 28: Board meeting / club meeting.'),
        p('Tuesday, May 5: Club meeting.'),
        p(
          'Tuesday, May 12: Full club work session to make the first batch of flag plaques, 5:30 PM at Covenant Church.',
        ),
        p(
          'Tuesday, May 19: Full club work session to make the banner, and to make and sort plaques, 5:30 PM at Covenant Church.',
        ),
        p(
          'Wednesday, May 20: Full club work session in the park to find the flagpole holes, 5:30 PM. Bring gardening gloves, a trowel, tape measure, screwdriver, and a kneeling pad if you have one.',
        ),
        p('Friday, May 22: Full club work session in the park to install the flags.'),
        p('Sunday, May 24: Ceremony in the park. Arrive at 11 AM, followed by club lunch.'),
        h3("What We've Been Doing"),
        h3('Club Meeting on April 21'),
        p('The club met April 21 at Poorman Gallery.'),
        h3('Dates Changed'),
        p(
          'Tuesday, May 5 will be a regular club meeting. Flags of Honor work sessions will be held Tuesday, May 12 at Covenant Church at 5:30 PM; Tuesday, May 19 at Covenant Church at 5:30 PM; Wednesday, May 20 in the park at 5:30 PM; and Friday, May 22 in the park.',
        ),
        h3('Corporate Sponsors'),
        p(
          "Rotarians volunteered to contact businesses that were corporate sponsors in 2025 but haven't signed up for this year yet.",
        ),
        p("Heather: Domino's and Lucky Seven Travel Plaza."),
        p("Cathy: First Citizens Community Bank and Kliney's."),
        p('Tom: Terrapin & SWC.'),
        p(
          "Lisa: Creek Unique, Fleming Eatery, Beiter's, Triangle Park Building, and Hear the Birds (Bayliff's).",
        ),
        p(
          'Janine: Brigandi, Gleghorn and Haffley Insurance; Chatham Run Feed Mill; Davis Insurance; Raymond dentistry.',
        ),
        p("Carmen: Addie's and First National Bank."),
        p('Thank you to all who volunteered!'),
        h3('Flags Ceremony'),
        p(
          'Kim Vance has agreed to participate in the ceremony and will sing "America the Beautiful." Janine is also inviting the Central Mountain Middle School Choir to sing.',
        ),
        p(
          'The club is inviting 15 or 16 honored guests who will not participate in the program but will sit under the tent, in comfortable chairs, and be introduced.',
        ),
        h3('Wine in the Wilds'),
        p(
          'The club sold out of soft pretzels Saturday, April 25 at Wine in the Wilds, sponsored by the Clinton County Historical Society.',
        ),
        p(
          'Thanks to Lisa and Tom for selling pretzels, and especially to Diahann for picking up the pretzels and staying to sell them.',
        ),
        p(
          'The club had discussed setting up a ShelterBox at the event, but did not have enough Rotarians available to do it.',
        ),
        h3('Attending'),
        p('Lisa, Janine, Heather, Wendy, Carmen, Marianne, Jeanne, Cathy, Tom, Haley, and Emma.'),
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

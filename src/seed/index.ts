import type { Payload } from 'payload'

type UpsertArgs = {
  collection: Parameters<Payload['find']>[0]['collection']
  uniqueField: string
  uniqueValue: string
  data: Record<string, unknown>
}

const p = (text: string) => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

const h2 = (text: string) => ({
  type: 'heading',
  tag: 'h2',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

const h3 = (text: string) => ({
  type: 'heading',
  tag: 'h3',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

const lexical = (...nodes: object[]) => ({
  root: { type: 'root', version: 1, format: '', indent: 0, direction: null, children: nodes },
})

const lexicalParagraph = (text: string) => lexical(p(text))

const upsertByField = async (
  payload: Payload,
  args: UpsertArgs,
): Promise<string | number> => {
  const { collection, uniqueField, uniqueValue, data } = args

  const existing = await payload.find({
    collection,
    where: { [uniqueField]: { equals: uniqueValue } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0]?.id as string | number
    await payload.update({ collection, id, data, overrideAccess: true })
    return id
  }

  const created = await payload.create({ collection, data, overrideAccess: true })
  return created.id as string | number
}

const getNextTuesday = (): Date => {
  const now = new Date()
  const day = now.getDay()
  const daysUntilTuesday = (2 - day + 7) % 7 || 7
  const next = new Date(now)
  next.setDate(now.getDate() + daysUntilTuesday)
  next.setHours(17, 30, 0, 0)
  return next
}

export const seed = async (
  payload: Payload,
  options?: { force?: boolean },
): Promise<{ ran: boolean; message: string }> => {
  const force = Boolean(options?.force)

  const defaultPassword = process.env.SEED_DEFAULT_PASSWORD
  if (!defaultPassword) {
    throw new Error('SEED_DEFAULT_PASSWORD is required for seed execution.')
  }

  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })

  if (!force && siteSettings?.seedCompletedAt) {
    return { ran: false, message: 'Seed skipped because site-settings.seedCompletedAt is already set.' }
  }

  // ─── Admin ───────────────────────────────────────────────────────────────

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'tdarbylhu@gmail.com'
  const adminName = process.env.SEED_ADMIN_NAME || 'Thomas Darby'

  await upsertByField(payload, {
    collection: 'users',
    uniqueField: 'email',
    uniqueValue: adminEmail,
    data: {
      email: adminEmail,
      password: defaultPassword,
      fullName: adminName,
      role: 'admin',
      title: 'Webmaster',
      sponsor: 'Cathy Ballat',
      memberSince: '2025-12-09T00:00:00.000Z',
      bio: 'Inducted December 9, 2025. Manages the club website and digital presence.',
      showInDirectory: true,
      showEmail: true,
    },
  })

  // ─── Officers ─────────────────────────────────────────────────────────────

  const officers = [
    {
      email: 'lschropp3@icloud.com',
      fullName: 'Lisa Schropp',
      title: 'President',
      phone: '814-244-2929',
      bio: 'Club president. Works at The Express newspaper. Chairs publicity for Flags of Honor and co-leads the project overall.',
      showEmail: true,
    },
    {
      email: 'vp@dlhrotary.org',
      fullName: 'Janine Bruno',
      title: 'Vice President',
      bio: 'Vice president. Chairs the Park & Ceremony committee for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'secretary@dlhrotary.org',
      fullName: 'Wendy Stiver',
      title: 'Secretary',
      bio: 'Club secretary. Writes detailed meeting minutes and the club newsletter. Chairs the Booklet & Ad committee for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'treasurer@dlhrotary.org',
      fullName: 'Heather Lively',
      title: 'Treasurer',
      bio: 'Club treasurer. Works at Woodlands Bank. Co-chairs Orders & Money for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'assistant@dlhrotary.org',
      fullName: 'Carmen Banfill',
      title: 'Assistant Treasurer/Secretary',
      bio: 'Assists with treasury and secretary duties. Part of the Park & Ceremony committee for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'areagovernor@dlhrotary.org',
      fullName: 'Diahann Claghorn',
      title: 'Area Governor & Board Member',
      bio: 'Area Governor for Rotary District 7360 and board member. Chairs corporate sponsorships and co-leads Labels & Plaques for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'pastpresident@dlhrotary.org',
      fullName: 'Marianne Lotfi',
      title: 'Immediate Past President & Board Member',
      bio: 'Immediate past president and board member. Co-leads Flags of Honor overall and co-chairs Orders & Money.',
      showEmail: true,
    },
  ]

  for (const officer of officers) {
    await upsertByField(payload, {
      collection: 'users',
      uniqueField: 'email',
      uniqueValue: officer.email,
      data: { ...officer, password: defaultPassword, role: 'officer', showInDirectory: true, showPhone: false },
    })
  }

  // ─── Members ──────────────────────────────────────────────────────────────

  const members = [
    {
      fullName: 'Cathy Ballat',
      bio: "Works at Diakon/AmeriCorps Seniors. Tom Darby's membership sponsor. Part of the Park & Ceremony committee for Flags of Honor.",
    },
    {
      fullName: 'Bonnie Hannis',
      bio: 'Longtime member.',
    },
    {
      fullName: 'Jeanne Baker',
      bio: 'Member.',
    },
    {
      fullName: 'Emma Persun',
      bio: 'Manages the club Instagram account. Incoming club treasurer for the 2026-27 Rotary year. Part of the Publicity committee for Flags of Honor.',
    },
    {
      fullName: 'Nate Akeley',
      bio: 'Member. Penn State connection.',
    },
    {
      fullName: 'Sue Packer',
      bio: 'Member. Part of the Park & Ceremony committee for Flags of Honor.',
    },
    {
      fullName: 'Haley Jolin',
      bio: 'Welcomed February 17, 2026. Creates social media video content for the club. Part of the Corporate Sponsorship Banner team for Flags of Honor.',
    },
    {
      fullName: 'Trey Reeder',
      bio: 'Member.',
    },
  ]

  for (const member of members) {
    const email = `${member.fullName.toLowerCase().replace(/[\s']/g, '.').replace(/[^a-z.]/g, '')}@placeholder.com`
    await upsertByField(payload, {
      collection: 'users',
      uniqueField: 'email',
      uniqueValue: email,
      data: { ...member, email, password: defaultPassword, role: 'member', showInDirectory: true, showEmail: false, showPhone: false },
    })
  }

  // ─── Site Settings ────────────────────────────────────────────────────────

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clubName: 'Rotary Club of Downtown Lock Haven',
      tagline: 'Service Above Self',
      email: 'dlhrotary@gmail.com',
      phone: '(814) 571-5324',
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
        facebook: 'https://www.facebook.com/dlhrotaryclub',
        instagram: 'https://www.instagram.com/dlhrotaryclub',
        myRotaryLink: 'https://my.rotary.org',
      },
    },
    overrideAccess: true,
  })

  // ─── Theme ────────────────────────────────────────────────────────────────

  await payload.updateGlobal({
    slug: 'theme',
    data: { activeTheme: 'rotary-classic' },
    overrideAccess: true,
  })

  // ─── Navigation ───────────────────────────────────────────────────────────

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
        { label: 'Projects', link: { type: 'external', url: '/projects' } },
        { label: 'Contact', link: { type: 'external', url: '/contact' } },
        { label: 'Documents', link: { type: 'external', url: '/documents' } },
      ],
    },
    overrideAccess: true,
  })

  // ─── Pages ────────────────────────────────────────────────────────────────

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'about',
    data: {
      title: 'About Us',
      slug: 'about',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Who We Are'),
        p(
          'The Rotary Club of Downtown Lock Haven was chartered in 2003 and meets every Tuesday evening at 5:30 PM (social time begins at 5:15 PM) at the Poorman Gallery, 352 E. Water St., Lock Haven, PA. Work sessions are held at various locations including Covenant United Methodist Church and member homes.',
        ),
        p(
          'We are part of Rotary International District 7360 and are guided by Rotary\'s motto, "Service Above Self." Our members come from all walks of life and share a commitment to improving our community through hands-on service, fundraising, and fellowship.',
        ),
        h2('The Four-Way Test'),
        p(
          'Of the things we think, say, or do — Is it the TRUTH? Is it FAIR to all concerned? Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?',
        ),
        h2('Meetings'),
        p(
          'Meetings alternate between regular club meetings (guest speakers, program updates, fellowship) and work sessions for active projects. In severe weather, Zoom participation is available. A Pledge of Allegiance, the Four-Way Test, and an invocation are part of each meeting.',
        ),
        p(
          'Happy Dollars — voluntary contributions made at meetings — go to a rotating local charity. Current charity (January-June 2026): the Clinton County Shoe Bank.',
        ),
        h2('New Members'),
        p(
          'New members are inducted at a club dinner and receive their Rotary pin from their sponsor at a subsequent meeting. Each new member gives a short talk about themselves at a later meeting. We welcome prospective members — come to a meeting as our guest!',
        ),
        h2('Community Connections'),
        p(
          'We partner with the Lock Haven Rotary Club (the "noon club") on select initiatives, including the Four-Way Test Speech Contest at Central Mountain High School. Our members work at The Express newspaper, Woodlands Bank, Diakon/AmeriCorps Seniors, and throughout Clinton County\'s business and nonprofit community.',
        ),
        h2('Press Coverage'),
        p(
          'The Express (lockhaven.com) covers many of our activities. In February 2026, our Valentine\'s Day goody tray deliveries to first responders were featured on the front page.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'officers',
    data: {
      title: 'Officers',
      slug: 'officers',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'Meet the officers and board members leading the Rotary Club of Downtown Lock Haven. Officers serve a one-year term running July 1 through June 30.',
        ),
        h2('2025-26 Officers'),
        p('President: Lisa Schropp'),
        p('Vice President: Janine Bruno'),
        p('Secretary: Wendy Stiver'),
        p('Treasurer: Heather Lively'),
        p('Assistant Treasurer/Secretary: Carmen Banfill'),
        h2('Board Members'),
        p('Area Governor (District 7360): Diahann Claghorn'),
        p('Immediate Past President: Marianne Lotfi'),
        h2('2026-27 Elected Officers (effective July 1, 2026)'),
        p('President: Lisa Schropp'),
        p('Vice President: Janine Bruno'),
        p('Secretary: Wendy Stiver'),
        p('Treasurer: Emma Persun'),
        p('Assistant Treasurer/Secretary: Carmen Banfill'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'scholarships',
    data: {
      title: 'Scholarships',
      slug: 'scholarships',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Roberta Way Scholarship'),
        p(
          'The Rotary Club of Downtown Lock Haven awards the Roberta Way Scholarship annually to a deserving local student. Scholarship funds are held in a dedicated account separate from general club operations.',
        ),
        h2('Four-Way Test Speech Contest'),
        p(
          'The club also sponsors students from Central Mountain High School to compete in Rotary\'s Four-Way Test speech contest at regional and district levels, in partnership with the Lock Haven Rotary Club.',
        ),
        h2('How to Apply'),
        p(
          'Scholarship applications are announced through Central Mountain High School each spring. Contact the club at dlhrotary@gmail.com for more information.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'join',
    data: {
      title: 'Join Us',
      slug: 'join',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Become a Rotarian'),
        p(
          'Rotary membership is open to adults who share a commitment to service. We welcome members from all professions, backgrounds, and walks of life. There is no age requirement.',
        ),
        h2('What to Expect'),
        p(
          'Come to a meeting as our guest — no commitment required. We meet every Tuesday at 5:30 PM (social at 5:15) at the Poorman Gallery, 352 E. Water St., Lock Haven.',
        ),
        p(
          'New members are proposed by an existing member (your sponsor), approved by the board, and inducted at a club dinner. You\'ll receive your Rotary pin at a subsequent meeting and give a short "about me" talk at a later date.',
        ),
        h2('Dues & Commitment'),
        p(
          'Annual dues cover Rotary International and district assessments. Members are encouraged to attend meetings regularly and participate in service projects — but the most important thing is showing up and connecting with the community.',
        ),
        h2('Get in Touch'),
        p(
          'Interested? Email us at dlhrotary@gmail.com or reach out to any member. We\'d love to have you.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'contact',
    data: {
      title: 'Contact',
      slug: 'contact',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Get in Touch'),
        p('Email: dlhrotary@gmail.com'),
        p('Mailing Address: PO Box 634, Lock Haven, PA 17745'),
        h2('Club President'),
        p('Lisa Schropp'),
        p('Phone: 814-244-2929'),
        p('Email: lschropp3@icloud.com'),
        h2('Meeting Location'),
        p('Poorman Gallery, 352 E. Water St., Lock Haven, PA 17745'),
        p('Tuesdays at 5:30 PM (social time begins at 5:15 PM)'),
        h2('Social Media'),
        p('Facebook & Instagram: @dlhrotaryclub'),
        p('Press inquiries: contact Lisa Schropp at The Express — www.lockhaven.com'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'donate',
    data: {
      title: 'Support Us',
      slug: 'donate',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Sponsor a Flag'),
        p(
          'Support our Flags of Honor project by sponsoring an American flag to be displayed in Triangle Park during Memorial Day. Each flag is placed in honor or memory of someone special to you. Contact dlhrotary@gmail.com to order.',
        ),
        h2('Attend Bingo'),
        p(
          'Join us for our annual Bingo Fundraiser on September 20, 2026 at KBR Bingo Hall. Enjoy basket raffles, 50-50 drawings, door prizes, and special games. Proceeds support club projects and scholarships.',
        ),
        h2('Corporate Sponsorships'),
        p(
          'Local businesses can sponsor a flag banner in Flags of Honor or support other club initiatives. Contact Diahann Claghorn or email dlhrotary@gmail.com for corporate sponsorship information.',
        ),
        h2('General Donations'),
        p(
          'To make a general donation to the club or the Roberta Way Scholarship fund, contact us at dlhrotary@gmail.com.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'documents',
    data: {
      title: 'Member Documents',
      slug: 'documents',
      membersOnly: true,
      _status: 'published',
      content: lexical(
        p(
          'Meeting minutes, club bylaws, financial reports, and other member resources are available here. Log in to access.',
        ),
      ),
    },
  })

  // ─── Projects ─────────────────────────────────────────────────────────────

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
          '2026 is extra special: America\'s 250th celebration year. The City of Lock Haven has approved keeping the flags in the park from May 22 through Flag Day, June 16 — over three weeks of display.',
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
          'Donations of gift cards or basket items from local businesses are welcome. Past supporters include SWC Realty, First Quality, Truck-Lite, West Pharmaceutical, Just Born (Peeps), Fox\'s Restaurant, Weis Market, Dunkin\' Donuts, Pearl\'s Cafe, and many more.',
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
          'Each February, club members assemble goody trays filled with cookies and candy and deliver them to local first responders, fire departments, police, the sheriff\'s department, and probation offices.',
        ),
        p(
          'In 2026, the club made 13 trays and a special basket for Clark, the county courts\' service dog. The deliveries were featured on the front page of The Express on February 14, 2026.',
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
          'In December 2025, the club spent $418 and delivered 30 gift bags to Fulmer\'s Personal Care Home, the VFW Veterans Benefits office, Haven Place, and Lock Haven Rehabilitation and Senior Living.',
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
          'The club sponsors students from Central Mountain High School to compete in Rotary\'s Four-Way Test speech contest at regional and district levels.',
        ),
        p(
          'This initiative is conducted in partnership with the Lock Haven Rotary Club. The club voted to sponsor a winner to advance to regional and district competition.',
        ),
      ),
    },
  })

  // ─── Events ───────────────────────────────────────────────────────────────

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
        "Annual Flags of Honor ceremony — this year celebrating America's 250th birthday. Mayor Joel Long will speak. Live music including Taps played by an Army master sergeant. Arrive at 11 AM. Club lunch to follow.",
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

  // ─── Announcements ────────────────────────────────────────────────────────

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
      title: "DLH Rotary Featured on Front Page of The Express",
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

  // ─── Mark seed complete ───────────────────────────────────────────────────

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { seedCompletedAt: new Date().toISOString() },
    overrideAccess: true,
  })

  return { ran: true, message: 'Seed completed successfully.' }
}

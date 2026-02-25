import type { Payload } from 'payload'

type UpsertArgs = {
  collection: Parameters<Payload['find']>[0]['collection']
  uniqueField: string
  uniqueValue: string
  data: Record<string, unknown>
}

const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: null,
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: null,
        children: [
          {
            type: 'text',
            version: 1,
            text,
            format: 0,
            mode: 'normal',
            detail: 0,
            style: '',
          },
        ],
      },
    ],
  },
})

const upsertByField = async (
  payload: Payload,
  args: UpsertArgs,
): Promise<string | number> => {
  const { collection, uniqueField, uniqueValue, data } = args

  const existing = await payload.find({
    collection,
    where: {
      [uniqueField]: { equals: uniqueValue },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0]?.id as string | number

    await payload.update({
      collection,
      id,
      data,
      overrideAccess: true,
    })

    return id
  }

  const created = await payload.create({
    collection,
    data,
    overrideAccess: true,
  })

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
  options?: {
    force?: boolean
  },
): Promise<{ ran: boolean; message: string }> => {
  const force = Boolean(options?.force)

  const defaultPassword = process.env.SEED_DEFAULT_PASSWORD
  if (!defaultPassword) {
    throw new Error('SEED_DEFAULT_PASSWORD is required for seed execution.')
  }

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    overrideAccess: true,
  })

  if (!force && siteSettings?.seedCompletedAt) {
    return {
      ran: false,
      message: 'Seed skipped because site-settings.seedCompletedAt is already set.',
    }
  }

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
      memberSince: '2025-12-01',
      bio: 'Seeded administrator account.',
      showInDirectory: true,
      showEmail: true,
    },
  })

  const officers = [
    {
      email: 'lschropp3@icloud.com',
      fullName: 'Lisa Schropp',
      title: 'President',
      phone: '814-244-2929',
    },
    {
      email: 'vp@dlhrotary.org',
      fullName: 'Janine Bruno',
      title: 'Vice President',
    },
    {
      email: 'secretary@dlhrotary.org',
      fullName: 'Wendy Doherty',
      title: 'Secretary',
      bio: '2024-25 Rotarian of the Year.',
    },
    {
      email: 'treasurer@dlhrotary.org',
      fullName: 'Heather Lively',
      title: 'Treasurer',
    },
  ]

  for (const officer of officers) {
    await upsertByField(payload, {
      collection: 'users',
      uniqueField: 'email',
      uniqueValue: officer.email,
      data: {
        ...officer,
        password: defaultPassword,
        role: 'officer',
        showInDirectory: true,
        showEmail: true,
      },
    })
  }

  const members = ['Cathy Ballat', 'Bonnie Hannis', 'Jeane Baker', 'Melissa Dally', 'Emma Persun']

  for (const fullName of members) {
    const email = `${fullName.toLowerCase().replace(/\s+/g, '.')}@placeholder.com`
    await upsertByField(payload, {
      collection: 'users',
      uniqueField: 'email',
      uniqueValue: email,
      data: {
        fullName,
        email,
        password: defaultPassword,
        role: 'member',
        showInDirectory: true,
        showEmail: false,
      },
    })
  }

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
      seedCompletedAt: new Date().toISOString(),
    },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'theme',
    data: { activeTheme: 'rotary-classic' },
    overrideAccess: true,
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
      ],
    },
    overrideAccess: true,
  })

  const pages = [
    { title: 'About', slug: 'about', membersOnly: false },
    { title: 'Officers', slug: 'officers', membersOnly: false },
    { title: 'Scholarships', slug: 'scholarships', membersOnly: false },
    { title: 'Join Us', slug: 'join', membersOnly: false },
    { title: 'Contact', slug: 'contact', membersOnly: false },
    { title: 'Donate', slug: 'donate', membersOnly: false },
    { title: 'Member Documents', slug: 'documents', membersOnly: true },
  ]

  for (const page of pages) {
    await upsertByField(payload, {
      collection: 'pages',
      uniqueField: 'slug',
      uniqueValue: page.slug,
      data: {
        ...page,
        content: lexicalParagraph(`${page.title} page content placeholder.`),
        _status: 'published',
      },
    })
  }

  const projects = [
    {
      title: 'Flags of Honor',
      slug: 'flags-of-honor',
      category: 'fundraiser',
      status: 'active',
      description:
        'Each Memorial Day weekend, the club places American flags downtown to honor veterans and active military.',
    },
    {
      title: 'Angel Lights',
      slug: 'angel-lights',
      category: 'community-service',
      status: 'active',
      description:
        'On September 11 each year, the club places luminaires throughout Lock Haven to remember the victims of 9/11.',
    },
    {
      title: 'Scholarships',
      slug: 'scholarships-project',
      category: 'youth',
      status: 'active',
      description: 'The club awards three named scholarships annually to local graduating seniors.',
    },
  ]

  for (const project of projects) {
    await upsertByField(payload, {
      collection: 'projects',
      uniqueField: 'slug',
      uniqueValue: project.slug,
      data: {
        title: project.title,
        slug: project.slug,
        category: project.category,
        projectStatus: project.status,
        description: lexicalParagraph(project.description),
        _status: 'published',
      },
    })
  }

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
      description: lexicalParagraph('Weekly gathering for fellowship, updates, and guest programming.'),
      _status: 'published',
    },
  })

  await upsertByField(payload, {
    collection: 'announcements',
    uniqueField: 'slug',
    uniqueValue: 'welcome-new-website',
    data: {
      title: 'Welcome to Our New Website!',
      slug: 'welcome-new-website',
      publishedDate: new Date().toISOString(),
      priority: 'important',
      pinned: true,
      membersOnly: false,
      content: lexicalParagraph(
        "The Rotary Club of Downtown Lock Haven is proud to launch our new website with events, projects, and member resources.",
      ),
      _status: 'published',
    },
  })

  return {
    ran: true,
    message: 'Seed completed successfully.',
  }
}

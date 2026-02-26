import type { Payload } from 'payload'

import { upsertByField } from '@/seed/core/upsert'

export const seedUsers = async (payload: Payload, defaultPassword: string): Promise<void> => {
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

  const officers = [
    {
      email: 'lschropp3@icloud.com',
      fullName: 'Lisa Schropp',
      title: 'President',
      phone: '',
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
      bio: 'Sapphire-level Paul Harris Fellow. Area Governor for Rotary District 7360 and board member. Former teacher at Woodward Elementary. Primary maintainer of the Little Red Schoolhouse Libraries. Manages the Lock Haven Area Shoe Bank. Chairs corporate sponsorships and co-leads Labels & Plaques for Flags of Honor.',
      showEmail: true,
    },
    {
      email: 'pastpresident@dlhrotary.org',
      fullName: 'Marianne Lotfi',
      title: 'Immediate Past President & Board Member',
      bio: 'Immediate past president and board member. Manages Shoe Bank work sessions at Covenant UMC. Co-leads Flags of Honor overall and co-chairs Orders & Money.',
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

  const members = [
    {
      fullName: 'Cathy Ballat',
      bio: "Works at Diakon/AmeriCorps Seniors. Tom Darby's membership sponsor. Part of the Park & Ceremony committee for Flags of Honor.",
    },
    {
      fullName: 'Bonnie Hannis',
      bio: 'Paul Harris Fellow and longtime educator. One of the club\'s most dedicated members.',
    },
    {
      fullName: 'Jeanne Baker',
      bio: 'Member.',
    },
    {
      fullName: 'Emma Persun',
      bio: 'Works at Rachel K Creations. Former Interact Club alumna. Manages the club Instagram account. Incoming club treasurer for the 2026-27 Rotary year. Part of the Publicity committee for Flags of Honor.',
    },
    {
      fullName: 'Nate Akeley',
      bio: 'Former Central Mountain HS class president (3 years) and Interact member. Penn State electrical engineering student. Sponsored by aunt Wendy Stiver.',
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
}


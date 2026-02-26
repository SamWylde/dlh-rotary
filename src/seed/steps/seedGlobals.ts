import type { Payload } from 'payload'

export const seedGlobals = async (payload: Payload): Promise<void> => {
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
        phone: '',
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
        clubId: '61484',
        foundedYear: 2003,
      },
      socialMedia: {
        facebook: 'https://www.facebook.com/dlhrotaryclub',
        instagram: 'https://www.instagram.com/dlhrotaryclub',
        myRotaryLink: 'https://my.rotary.org',
      },
      externalListings: {
        ccepListing: 'https://www.clintoncountyinfo.com/rotary-club-of-downtown-lock-haven',
        downtownLHListing: 'https://lockhaven.org/listing/rotary-club-of-downtown-lock-haven/',
        oldClubSite: 'http://www.rotaryclintoncountypa.org/',
      },
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
}

export const markSeedCompleted = async (payload: Payload): Promise<void> => {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { seedCompletedAt: new Date().toISOString() },
    overrideAccess: true,
  })
}


import type { GlobalConfig } from 'payload'

import { isAdmin } from '@/access'
import { validateURL } from '@/utilities/validateURL'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    { name: 'clubName', type: 'text', defaultValue: 'Rotary Club of Downtown Lock Haven' },
    { name: 'tagline', type: 'text', defaultValue: 'Service Above Self' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'logoSimplified',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Simplified logo for small displays (favicon, mobile header)' },
    },
    { name: 'email', type: 'email', defaultValue: 'dlhrotary@gmail.com' },
    {
      name: 'phone',
      type: 'text',
      admin: { description: 'Club contact phone number' },
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'PO Box 634\nLock Haven, PA 17745',
    },
    {
      name: 'presidentContact',
      type: 'group',
      admin: { description: 'Current club president contact info (displayed on Contact page)' },
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Lisa Schropp' },
        { name: 'phone', type: 'text', defaultValue: '814-244-2929' },
        { name: 'email', type: 'email', defaultValue: 'lschropp3@icloud.com' },
      ],
    },
    {
      name: 'meetingInfo',
      type: 'group',
      fields: [
        { name: 'day', type: 'text', defaultValue: 'Tuesdays' },
        { name: 'time', type: 'text', defaultValue: '5:30 PM (social at 5:15)' },
        { name: 'location', type: 'text', defaultValue: 'Poorman Gallery, 352 E. Water St.' },
        { name: 'city', type: 'text', defaultValue: 'Lock Haven, PA 17745' },
      ],
    },
    {
      name: 'rotaryInfo',
      type: 'group',
      fields: [
        { name: 'district', type: 'text', defaultValue: 'District 7360' },
        { name: 'clubId', type: 'text' },
        { name: 'foundedYear', type: 'number', defaultValue: 2003 },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          validate: validateURL,
          defaultValue: 'https://www.facebook.com/profile.php?id=100064347773545',
        },
        { name: 'instagram', type: 'text', validate: validateURL },
        { name: 'myRotaryLink', type: 'text', validate: validateURL, defaultValue: 'https://my.rotary.org' },
      ],
    },
    {
      name: 'externalListings',
      type: 'group',
      fields: [
        {
          name: 'ccepListing',
          type: 'text',
          validate: validateURL,
          defaultValue: 'https://www.clintoncountyinfo.com/rotary-club-of-downtown-lock-haven',
        },
        {
          name: 'downtownLHListing',
          type: 'text',
          validate: validateURL,
          defaultValue: 'https://lockhaven.org/listing/rotary-club-of-downtown-lock-haven/',
        },
        { name: 'oldClubSite', type: 'text', validate: validateURL, defaultValue: 'http://www.rotaryclintoncountypa.org/' },
      ],
    },
    {
      name: 'donationLinks',
      type: 'group',
      fields: [
        { name: 'paypal', type: 'text', validate: validateURL },
        { name: 'venmo', type: 'text', validate: validateURL },
        { name: 'zelle', type: 'text', validate: validateURL },
      ],
    },
    {
      name: 'forms',
      type: 'group',
      fields: [
        {
          name: 'joinForm',
          type: 'relationship',
          relationTo: 'forms',
          admin: {
            description: 'Form displayed on the /join page.',
          },
        },
        {
          name: 'contactForm',
          type: 'relationship',
          relationTo: 'forms',
          admin: {
            description: 'Form displayed on the /contact page.',
          },
        },
      ],
    },
    {
      name: 'seedCompletedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Set automatically after successful seed.',
      },
    },
  ],
}

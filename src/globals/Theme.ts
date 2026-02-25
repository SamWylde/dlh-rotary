import type { GlobalConfig } from 'payload'

import { isAdmin } from '@/access'

export const Theme: GlobalConfig = {
  slug: 'theme',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'activeTheme',
      type: 'select',
      required: true,
      defaultValue: 'rotary-classic',
      options: [
        { label: 'Rotary Classic (Blue & Gold)', value: 'rotary-classic' },
        { label: 'Modern Light', value: 'modern-light' },
        { label: 'Modern Dark', value: 'modern-dark' },
        { label: 'Community Warm', value: 'community-warm' },
      ],
    },
    {
      name: 'customAccentColor',
      type: 'text',
      admin: { description: 'Optional: Override accent color (hex, e.g. #F7A81B)' },
    },
  ],
}
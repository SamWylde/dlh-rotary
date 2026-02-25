import type { Field } from 'payload'

import { validateURL } from '@/utilities/validateURL'

export const linkField = (): Field => ({
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
      defaultValue: 'internal',
      admin: { layout: 'horizontal' },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: 'pages',
      admin: { condition: (_, siblingData) => siblingData?.type === 'internal' },
    },
    {
      name: 'url',
      type: 'text',
      validate: validateURL,
      admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Open in new tab' },
    },
  ],
})
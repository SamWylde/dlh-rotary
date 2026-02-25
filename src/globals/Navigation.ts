import type { GlobalConfig } from 'payload'

import { isAdminOrOfficer } from '@/access'
import { linkField } from '@/fields/linkField'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: isAdminOrOfficer,
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField(),
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            linkField(),
            { name: 'membersOnly', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'footerNav',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }, linkField()],
    },
  ],
}
import type { CollectionConfig, Where } from 'payload'

import { isAdmin, isAdminOrOfficer } from '@/access'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidatePageAfterChange, revalidatePageAfterDelete } from '@/hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (!req.user) {
        return {
          and: [
            { _status: { equals: 'published' } },
            { membersOnly: { equals: false } },
          ],
        } as Where
      }

      if (['admin', 'officer'].includes((req.user as { role?: string }).role || '')) {
        return true
      }

      return { _status: { equals: 'published' } }
    },
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title. Edit only if needed.',
      },
    },
    {
      name: 'membersOnly',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  ],
  versions: {
    drafts: true,
  },
}

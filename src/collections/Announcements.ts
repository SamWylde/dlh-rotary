import type { CollectionConfig, Where } from 'payload'

import { isAdmin, isAdminOrOfficer } from '@/access'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'author', 'publishedDate'],
  },
  access: {
    read: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role

      if (!req.user) {
        return {
          and: [
            { _status: { equals: 'published' } },
            { membersOnly: { equals: false } },
          ],
        } as Where
      }

      if (role === 'admin' || role === 'officer') {
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
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Auto-generated from title.' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Important', value: 'important' },
        { label: 'Urgent', value: 'urgent' },
      ],
    },
    { name: 'membersOnly', type: 'checkbox', defaultValue: false },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Pin to top of announcements list' },
    },
  ],
  versions: {
    drafts: true,
  },
}

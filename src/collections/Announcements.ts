import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrOfficer, publishedAndPublicOrPrivileged } from '@/access'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { sendAnnouncementNotification } from '@/hooks/sendAnnouncementNotification'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'author', 'publishedDate'],
  },
  access: {
    read: publishedAndPublicOrPrivileged,
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [formatSlug],
    afterChange: [revalidateAfterChange, sendAnnouncementNotification],
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

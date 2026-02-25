import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrOfficer, isAuthenticated } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'center' },
      { name: 'card', width: 600, height: 400, position: 'center' },
      { name: 'hero', width: 1200, height: 600, position: 'center' },
    ],
  },
  access: {
    read: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role

      if (role === 'admin' || role === 'officer') return true
      if (req.user) return true

      return { isPublic: { equals: true } }
    },
    create: isAuthenticated,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Disable for members-only files that should not appear in public API responses.',
      },
    },
  ],
}
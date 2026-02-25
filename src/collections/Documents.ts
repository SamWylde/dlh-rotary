import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { isAdmin, isAdminOrOfficer } from '@/access'
import { getRelationshipID } from '@/utilities/getRelationshipID'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'membersOnly', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role

      if (!req.user) {
        return { membersOnly: { equals: false } }
      }

      if (role === 'admin' || role === 'officer') return true

      return true
    },
    create: isAdminOrOfficer,
    update: isAdminOrOfficer,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const fileID = getRelationshipID(doc?.file)

        if (fileID) {
          await req.payload.update({
            collection: 'media',
            id: fileID,
            data: { isPublic: !doc.membersOnly },
            overrideAccess: true,
            req,
          })
        }

        revalidatePath('/')
        revalidatePath('/documents')

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidatePath('/')
        revalidatePath('/documents')

        if (doc?.id) {
          revalidatePath(`/api/documents/${doc.id}`)
        }

        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Meeting Minutes', value: 'minutes' },
        { label: 'Bylaws & Governance', value: 'bylaws' },
        { label: 'Financial Reports', value: 'financial' },
        { label: 'Rotary International Resources', value: 'ri-resources' },
        { label: 'Forms & Templates', value: 'forms' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'meetingDate',
      type: 'date',
      admin: {
        condition: (data) => data.category === 'minutes',
        description: 'Date of the meeting these minutes are from',
      },
    },
    { name: 'membersOnly', type: 'checkbox', defaultValue: true },
  ],
}

import type { CollectionConfig, Where } from 'payload'

import { type AuthUser, isAdmin, isAdminFieldAccess, isAdminOrOfficer, isAdminOrSelf } from '@/access'
import { isPrivilegedRole } from '@/constants/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'role'],
  },
  access: {
    read: ({ req }) => {
      const user = req.user as unknown as AuthUser | undefined

      if (!user) {
        return {
          and: [
            { showInDirectory: { equals: true } },
            { role: { in: ['admin', 'officer'] } },
          ],
        } as Where
      }

      if (isPrivilegedRole(user.role)) {
        return true
      }

      return { showInDirectory: { equals: true } }
    },
    create: isAdminOrOfficer,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        if (!doc) return doc

        const viewer = req.user as unknown as AuthUser | undefined
        const privileged = isPrivilegedRole(viewer?.role) || viewer?.id === doc.id

        if (!privileged) {
          if (!doc.showEmail) {
            delete doc.email
          }

          if (!doc.showPhone) {
            delete doc.phone
          }
        }

        return doc
      },
    ],
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      saveToJWT: true,
      defaultValue: 'member',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Officer', value: 'officer' },
        { label: 'Member', value: 'member' },
      ],
      access: { create: isAdminFieldAccess, update: isAdminFieldAccess },
    },
    { name: 'title', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'sponsor', type: 'text' },
    { name: 'memberSince', type: 'date' },
    { name: 'showInDirectory', type: 'checkbox', defaultValue: true },
    { name: 'showPhone', type: 'checkbox', defaultValue: false },
    { name: 'showEmail', type: 'checkbox', defaultValue: true },
  ],
}

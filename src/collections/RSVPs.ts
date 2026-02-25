import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrOfficerOrSelf, isAuthenticated } from '@/access'
import { getRelationshipID } from '@/utilities/getRelationshipID'

export const RSVPs: CollectionConfig = {
  slug: 'rsvps',
  admin: {
    useAsTitle: 'eventUserKey',
    defaultColumns: ['event', 'user', 'status', 'createdAt'],
  },
  access: {
    read: isAdminOrOfficerOrSelf,
    create: isAuthenticated,
    update: isAdminOrOfficerOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (!data) return data

        const user = req.user as unknown as { id?: string | number; role?: string } | undefined

        if (user?.id && (!data.user || user.role === 'member')) {
          data.user = user.id
        }

        const eventID = getRelationshipID(data.event)
        const userID = getRelationshipID(data.user)

        if (eventID && userID) {
          data.eventUserKey = `${String(eventID)}:${String(userID)}`
        }

        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') return data

        const eventUserKey = typeof data?.eventUserKey === 'string' ? data.eventUserKey : null

        if (!eventUserKey) return data

        const existing = await req.payload.find({
          collection: 'rsvps',
          where: { eventUserKey: { equals: eventUserKey } },
          limit: 1,
          overrideAccess: true,
          req,
        })

        if (existing.docs.length > 0) {
          throw new Error('You have already RSVPed to this event. Update your existing RSVP instead.')
        }

        return data
      },
    ],
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'eventUserKey',
      type: 'text',
      unique: true,
      index: true,
      required: true,
      admin: { readOnly: true, hidden: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Attending', value: 'yes' },
        { label: 'Not Attending', value: 'no' },
        { label: 'Maybe', value: 'maybe' },
      ],
    },
    {
      name: 'guests',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Additional guests' },
    },
    { name: 'note', type: 'text' },
  ],
}

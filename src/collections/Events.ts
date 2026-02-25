import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrOfficer } from '@/access'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'eventType', '_status'],
  },
  access: {
    read: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role
      if (role === 'admin' || role === 'officer') return true
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
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Regular Meeting', value: 'meeting' },
        { label: 'Guest Speaker', value: 'speaker' },
        { label: 'Community Service', value: 'service' },
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Social', value: 'social' },
        { label: 'Board Meeting', value: 'board' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Poorman Gallery, 352 E. Water St., Lock Haven',
    },
    { name: 'description', type: 'richText' },
    {
      name: 'speakerName',
      type: 'text',
      admin: { condition: (data) => data.eventType === 'speaker' },
    },
    {
      name: 'speakerTopic',
      type: 'text',
      admin: { condition: (data) => data.eventType === 'speaker' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'enableRSVP', type: 'checkbox', defaultValue: false },
    {
      name: 'rsvpDeadline',
      type: 'date',
      admin: { condition: (data) => data.enableRSVP },
    },
    {
      name: 'maxAttendees',
      type: 'number',
      admin: { condition: (data) => data.enableRSVP },
    },
    {
      name: 'ticketPrice',
      type: 'number',
      admin: { description: 'Leave blank or 0 for free events' },
    },
    {
      name: 'ticketLink',
      type: 'text',
      admin: { description: 'External link (PayPal, Venmo, etc.) for ticket purchases' },
    },
    { name: 'isRecurring', type: 'checkbox', defaultValue: false },
    {
      name: 'recurringNote',
      type: 'text',
      admin: {
        condition: (data) => data.isRecurring,
        description: 'e.g., "Every Tuesday at 5:30 PM"',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}
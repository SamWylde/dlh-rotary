import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrOfficer, publishedOrPrivileged } from '@/access'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { validateURL } from '@/utilities/validateURL'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectStatus', 'category', '_status'],
  },
  access: {
    read: publishedOrPrivileged,
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
    { name: 'description', type: 'richText' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Community Service', value: 'community-service' },
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Youth', value: 'youth' },
        { label: 'International', value: 'international' },
      ],
    },
    {
      name: 'projectStatus',
      type: 'select',
      defaultValue: 'active',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Upcoming', value: 'upcoming' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'impactStats',
      type: 'group',
      fields: [
        { name: 'dollarsRaised', type: 'number' },
        { name: 'peopleServed', type: 'number' },
        { name: 'volunteersInvolved', type: 'number' },
        { name: 'customStat', type: 'text' },
        { name: 'customStatValue', type: 'text' },
      ],
    },
    {
      name: 'partners',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text', validate: validateURL },
      ],
    },
    { name: 'volunteerSignupEnabled', type: 'checkbox', defaultValue: false },
    {
      name: 'volunteerForm',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.volunteerSignupEnabled),
        description: 'Form shown on the project page when volunteer signup is enabled.',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

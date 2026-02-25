import type { Block, CollectionConfig, Field } from 'payload'

import { isAdmin, isAdminOrOfficer, publishedAndPublicOrPrivileged } from '@/access'
import { linkField } from '@/fields/linkField'
import { formatSlug } from '@/hooks/formatSlug'
import { revalidatePageAfterChange, revalidatePageAfterDelete } from '@/hooks/revalidatePage'

const pageLinkField = (name: string, label: string): Field =>
  ({ ...linkField(), name, label }) as Field

const pageLayoutBlocks: Block[] = [
  {
    slug: 'heroBlock',
    interfaceName: 'HeroBlock',
    labels: {
      singular: 'Hero Block',
      plural: 'Hero Blocks',
    },
    fields: [
      { name: 'eyebrow', type: 'text' },
      { name: 'heading', type: 'text', required: true },
      { name: 'body', type: 'richText' },
      { name: 'image', type: 'upload', relationTo: 'media' },
      pageLinkField('primaryLink', 'Primary Link'),
      pageLinkField('secondaryLink', 'Secondary Link'),
    ],
  },
  {
    slug: 'contentBlock',
    interfaceName: 'ContentBlock',
    labels: {
      singular: 'Content Block',
      plural: 'Content Blocks',
    },
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'content', type: 'richText', required: true },
    ],
  },
  {
    slug: 'imageGalleryBlock',
    interfaceName: 'ImageGalleryBlock',
    labels: {
      singular: 'Image Gallery Block',
      plural: 'Image Gallery Blocks',
    },
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'images',
        type: 'array',
        minRows: 1,
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          { name: 'caption', type: 'text' },
        ],
      },
    ],
  },
  {
    slug: 'ctaBlock',
    interfaceName: 'CTABlock',
    labels: {
      singular: 'CTA Block',
      plural: 'CTA Blocks',
    },
    fields: [
      { name: 'heading', type: 'text', required: true },
      { name: 'body', type: 'richText' },
      pageLinkField('primaryLink', 'Primary Link'),
      pageLinkField('secondaryLink', 'Secondary Link'),
    ],
  },
  {
    slug: 'officerGridBlock',
    interfaceName: 'OfficerGridBlock',
    labels: {
      singular: 'Officer Grid Block',
      plural: 'Officer Grid Blocks',
    },
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 30 },
      { name: 'showEmail', type: 'checkbox', defaultValue: true },
      { name: 'showPhone', type: 'checkbox', defaultValue: false },
    ],
  },
  {
    slug: 'statsBlock',
    interfaceName: 'StatsBlock',
    labels: {
      singular: 'Stats Block',
      plural: 'Stats Blocks',
    },
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'stats',
        type: 'array',
        minRows: 1,
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
          { name: 'description', type: 'text' },
        ],
      },
    ],
  },
  {
    slug: 'contactFormBlock',
    interfaceName: 'ContactFormBlock',
    labels: {
      singular: 'Contact Form Block',
      plural: 'Contact Form Blocks',
    },
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'intro', type: 'richText' },
      { name: 'form', type: 'relationship', relationTo: 'forms' },
    ],
  },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  access: {
    read: publishedAndPublicOrPrivileged,
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
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageLayoutBlocks,
      admin: {
        description: 'Compose custom page layouts with reusable content blocks.',
      },
    },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  ],
  versions: {
    drafts: true,
  },
}

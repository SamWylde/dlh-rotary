import type { CollectionSlug, Where } from 'payload'

export const MANAGE_RESOURCE_SLUGS = [
  'announcements',
  'events',
  'documents',
  'pages',
  'users',
  'media',
  'forms',
  'form-submissions',
] as const

export type ManageResourceSlug = (typeof MANAGE_RESOURCE_SLUGS)[number]

type ManageResourceConfig = {
  adminOnly?: boolean
  collection: CollectionSlug
  defaultSort: string
  draftable?: boolean
  label: string
  searchFields: string[]
}

export const MANAGE_RESOURCES: Record<ManageResourceSlug, ManageResourceConfig> = {
  announcements: {
    collection: 'announcements',
    defaultSort: '-publishedDate',
    draftable: true,
    label: 'Announcements',
    searchFields: ['title'],
  },
  events: {
    collection: 'events',
    defaultSort: 'date',
    draftable: true,
    label: 'Events',
    searchFields: ['title', 'location', 'speakerName'],
  },
  documents: {
    collection: 'documents',
    defaultSort: '-updatedAt',
    label: 'Documents',
    searchFields: ['title', 'description'],
  },
  pages: {
    collection: 'pages',
    defaultSort: '-updatedAt',
    draftable: true,
    label: 'Pages',
    searchFields: ['title', 'slug'],
  },
  users: {
    adminOnly: true,
    collection: 'users',
    defaultSort: 'fullName',
    label: 'Members',
    searchFields: ['fullName', 'email', 'title'],
  },
  media: {
    collection: 'media',
    defaultSort: '-updatedAt',
    label: 'Media',
    searchFields: ['alt', 'caption', 'filename'],
  },
  forms: {
    collection: 'forms',
    defaultSort: 'title',
    label: 'Forms',
    searchFields: ['title'],
  },
  'form-submissions': {
    collection: 'form-submissions',
    defaultSort: '-createdAt',
    label: 'Form Submissions',
    searchFields: [],
  },
}

export const isManageResourceSlug = (value: string): value is ManageResourceSlug =>
  MANAGE_RESOURCE_SLUGS.includes(value as ManageResourceSlug)

export const getManageResourceConfig = (resource: string): ManageResourceConfig | null =>
  isManageResourceSlug(resource) ? MANAGE_RESOURCES[resource] : null

export const buildManageWhere = (
  resource: ManageResourceSlug,
  searchParams: URLSearchParams,
): Where | undefined => {
  const config = MANAGE_RESOURCES[resource]
  const clauses: Where[] = []
  const search = searchParams.get('search')?.trim()
  const status = searchParams.get('status')?.trim()
  const category = searchParams.get('category')?.trim()
  const role = searchParams.get('role')?.trim()

  if (search && config.searchFields.length > 0) {
    clauses.push({
      or: config.searchFields.map((field) => ({
        [field]: { contains: search },
      })),
    } as Where)
  }

  if (status && status !== 'all' && config.draftable) {
    clauses.push({ _status: { equals: status } } as Where)
  }

  if (category && category !== 'all' && resource === 'documents') {
    clauses.push({ category: { equals: category } } as Where)
  }

  if (role && role !== 'all' && resource === 'users') {
    clauses.push({ role: { equals: role } } as Where)
  }

  if (clauses.length === 0) return undefined
  if (clauses.length === 1) return clauses[0]

  return { and: clauses } as Where
}

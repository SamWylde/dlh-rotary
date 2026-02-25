import type { Where } from 'payload'

import type { SessionUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'
import type { Document, Form, Project, SiteSetting, User } from '@/payload-types'
import { getNumericRelationshipID } from '@/utilities/getRelationshipID'

export type SiteSettingsFormKey = 'joinForm' | 'contactForm'
type PaginationArgs = {
  page: number
  limit: number
}
type MembersPageArgs = PaginationArgs & {
  q?: string
  role?: User['role']
}
type DocumentsPageArgs = PaginationArgs & {
  category?: Document['category']
  q?: string
}

/** Shared setup for content queries: get payload client + normalize optional user. */
const initQuery = async (user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  return { payload, user: user || undefined } as const
}

export const getSiteSettings = async (user?: SessionUser | null): Promise<SiteSetting> => {
  const q = await initQuery(user)

  return q.payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
    overrideAccess: false,
    user: q.user,
  })
}

export const getConfiguredForm = async (
  key: SiteSettingsFormKey,
  user?: SessionUser | null,
): Promise<Form | null> => {
  const siteSettings = await getSiteSettings(user)
  return getFormByID(siteSettings.forms?.[key], user)
}

export const getFormByID = async (formID: unknown, user?: SessionUser | null): Promise<Form | null> => {
  const q = await initQuery(user)
  const normalizedID = getNumericRelationshipID(formID)

  if (!normalizedID) {
    return null
  }

  try {
    return await q.payload.findByID({
      collection: 'forms',
      id: normalizedID,
      depth: 0,
      overrideAccess: false,
      user: q.user,
    })
  } catch {
    return null
  }
}

const normalizePagination = ({ page, limit }: PaginationArgs): PaginationArgs => {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 12

  return {
    page: safePage,
    limit: safeLimit,
  }
}

const normalizeQuery = (value: string | undefined): string | undefined => {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

export const getAnnouncementsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const q = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return q.payload.find({
    collection: 'announcements',
    sort: '-publishedDate',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getEventsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const q = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return q.payload.find({
    collection: 'events',
    sort: 'date',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getProjectsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const q = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return q.payload.find({
    collection: 'projects',
    sort: 'title',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getDocumentsPage = async (
  { page, limit, category, q }: DocumentsPageArgs,
  user?: SessionUser | null,
) => {
  const ctx = await initQuery(user)
  const args = normalizePagination({ page, limit })
  const query = normalizeQuery(q)
  const filters: Where[] = []

  if (category) {
    filters.push({
      category: {
        equals: category,
      },
    })
  }

  if (query) {
    filters.push({
      or: [
        {
          title: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
      ],
    } as Where)
  }

  const where = filters.length > 0 ? ({ and: filters } as Where) : undefined

  return ctx.payload.find({
    collection: 'documents',
    where,
    sort: '-updatedAt',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: ctx.user,
  })
}

export const getMembersPage = async ({ page, limit, q, role }: MembersPageArgs, user: SessionUser) => {
  const q2 = await initQuery(user)
  const args = normalizePagination({ page, limit })
  const query = normalizeQuery(q)
  const filters: Where[] = [
    {
      showInDirectory: {
        equals: true,
      },
    },
  ]

  if (role) {
    filters.push({
      role: {
        equals: role,
      },
    })
  }

  if (query) {
    filters.push({
      or: [
        {
          fullName: {
            contains: query,
          },
        },
        {
          title: {
            contains: query,
          },
        },
      ],
    } as Where)
  }

  return q2.payload.find({
    collection: 'users',
    where: { and: filters } as Where,
    sort: 'fullName',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: q2.user,
  })
}

export const getOfficersPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const q = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return q.payload.find({
    collection: 'users',
    where: {
      and: [
        { showInDirectory: { equals: true } },
        { role: { in: ['admin', 'officer'] } },
      ],
    } as Where,
    sort: 'fullName',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getUpcomingEvents = async (limit = 5, user?: SessionUser | null) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'events',
    where: {
      date: {
        greater_than_equal: new Date().toISOString(),
      },
    },
    sort: 'date',
    limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getRecentAnnouncements = async (limit = 5, user?: SessionUser | null) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'announcements',
    sort: '-publishedDate',
    limit,
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getOfficers = async (user?: SessionUser | null, limit = 100) => {
  const q = await initQuery(user)
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 100

  return q.payload.find({
    collection: 'users',
    where: {
      and: [
        { showInDirectory: { equals: true } },
        { role: { in: ['admin', 'officer'] } },
      ],
    } as Where,
    sort: 'fullName',
    depth: 1,
    limit: safeLimit,
    overrideAccess: false,
    user: q.user,
  })
}

export const getMemberDirectory = async (user: SessionUser) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'users',
    where: {
      showInDirectory: {
        equals: true,
      },
    },
    sort: 'fullName',
    depth: 1,
    limit: 300,
    overrideAccess: false,
    user: q.user,
  })
}

export const getPageBySlug = async (slug: string, user?: SessionUser | null) => {
  const q = await initQuery(user)

  const result = await q.payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: q.user,
  })

  return result.docs[0] || null
}

export const getProjects = async (user?: SessionUser | null) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'projects',
    limit: 200,
    sort: 'title',
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getProjectBySlug = async (slug: string, user?: SessionUser | null) => {
  const q = await initQuery(user)

  const result = await q.payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: q.user,
  })

  return result.docs[0] || null
}

export const getProjectVolunteerForm = async (
  project: Pick<Project, 'volunteerSignupEnabled' | 'volunteerForm'>,
  user?: SessionUser | null,
): Promise<Form | null> => {
  if (!project.volunteerSignupEnabled) {
    return null
  }

  return getFormByID(project.volunteerForm, user)
}

export const getEvents = async (user?: SessionUser | null) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'events',
    limit: 200,
    sort: 'date',
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

export const getEventBySlug = async (slug: string, user?: SessionUser | null) => {
  const q = await initQuery(user)

  const result = await q.payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: q.user,
  })

  return result.docs[0] || null
}

export const getAnnouncementBySlug = async (slug: string, user?: SessionUser | null) => {
  const q = await initQuery(user)

  const result = await q.payload.find({
    collection: 'announcements',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: q.user,
  })

  return result.docs[0] || null
}

export const getDocuments = async (user?: SessionUser | null) => {
  const q = await initQuery(user)

  return q.payload.find({
    collection: 'documents',
    limit: 200,
    sort: '-updatedAt',
    depth: 1,
    overrideAccess: false,
    user: q.user,
  })
}

import type { Where } from 'payload'

import type { SessionUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'
import type { Form, SiteSetting } from '@/payload-types'

export type SiteSettingsFormKey = 'joinForm' | 'contactForm'
type PaginationArgs = {
  page: number
  limit: number
}

const getRelationshipID = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id
    return getRelationshipID(id)
  }

  return null
}

export const getSiteSettings = async (user?: SessionUser | null): Promise<SiteSetting> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
    overrideAccess: false,
    user: user || undefined,
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
  const payload = await getPayloadClient()
  const normalizedID = getRelationshipID(formID)

  if (!normalizedID) {
    return null
  }

  try {
    return await payload.findByID({
      collection: 'forms',
      id: normalizedID,
      depth: 0,
      overrideAccess: false,
      user: user || undefined,
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

export const getAnnouncementsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
    collection: 'announcements',
    sort: '-publishedDate',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getEventsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
    collection: 'events',
    sort: 'date',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getProjectsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
    collection: 'projects',
    sort: 'title',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getDocumentsPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
    collection: 'documents',
    sort: '-updatedAt',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getMembersPage = async ({ page, limit }: PaginationArgs, user: SessionUser) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
    collection: 'users',
    where: {
      showInDirectory: {
        equals: true,
      },
    },
    sort: 'fullName',
    page: args.page,
    limit: args.limit,
    depth: 1,
    overrideAccess: false,
    user,
  })
}

export const getOfficersPage = async ({ page, limit }: PaginationArgs, user?: SessionUser | null) => {
  const payload = await getPayloadClient()
  const args = normalizePagination({ page, limit })

  return payload.find({
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
    user: user || undefined,
  })
}

export const getUpcomingEvents = async (limit = 5, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  return payload.find({
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
    user: user || undefined,
  })
}

export const getRecentAnnouncements = async (limit = 5, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'announcements',
    sort: '-publishedDate',
    limit,
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getOfficers = async (user?: SessionUser | null, limit = 100) => {
  const payload = await getPayloadClient()
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 100

  return payload.find({
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
    user: user || undefined,
  })
}

export const getMemberDirectory = async (user: SessionUser) => {
  const payload = await getPayloadClient()

  return payload.find({
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
    user,
  })
}

export const getPageBySlug = async (slug: string, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: user || undefined,
  })

  return result.docs[0] || null
}

export const getProjects = async (user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'projects',
    limit: 200,
    sort: 'title',
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getProjectBySlug = async (slug: string, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: user || undefined,
  })

  return result.docs[0] || null
}

export const getEvents = async (user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'events',
    limit: 200,
    sort: 'date',
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

export const getEventBySlug = async (slug: string, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: user || undefined,
  })

  return result.docs[0] || null
}

export const getAnnouncementBySlug = async (slug: string, user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'announcements',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
    user: user || undefined,
  })

  return result.docs[0] || null
}

export const getDocuments = async (user?: SessionUser | null) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'documents',
    limit: 200,
    sort: '-updatedAt',
    depth: 1,
    overrideAccess: false,
    user: user || undefined,
  })
}

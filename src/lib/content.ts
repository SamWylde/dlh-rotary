import type { Where } from 'payload'

import type { SessionUser } from '@/lib/auth'
import { PRIVILEGED_ROLES } from '@/constants/roles'
import { getPayloadClient } from '@/lib/payload'
import type { Announcement, Document, Event, Form, Page, Project, SiteSetting, User } from '@/payload-types'
import { getNumericRelationshipID } from '@/utilities/getRelationshipID'

export type SiteSettingsFormKey = 'joinForm' | 'contactForm'
export type RSVPStatus = 'yes' | 'no' | 'maybe'

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

type QueryUser = SessionUser | null | undefined
type QueryContext = {
  payload: Awaited<ReturnType<typeof getPayloadClient>>
  user?: SessionUser
}

/** Shared setup for content queries: get payload client + normalize optional user. */
const initQuery = async (user?: QueryUser): Promise<QueryContext> => {
  const payload = await getPayloadClient()
  return { payload, user: user || undefined } as const
}

const withUserAccess = <T extends object>(
  query: QueryContext,
  args: T,
): T & { overrideAccess: false; user?: SessionUser } => ({
  ...args,
  overrideAccess: false,
  user: query.user,
})

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

const getSlugWhere = (slug: string): Where => ({
  slug: {
    equals: slug,
  },
})

const getDirectoryOfficersWhere = (): Where => ({
  and: [
    { showInDirectory: { equals: true } },
    { role: { in: [...PRIVILEGED_ROLES] } },
  ],
})

const getDocumentsWhere = (
  category?: Document['category'],
  q?: string,
): Where | undefined => {
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
    })
  }

  return filters.length > 0 ? { and: filters } : undefined
}

const getMembersWhere = (role?: User['role'], q?: string): Where => {
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
    })
  }

  return { and: filters }
}

const getBySlug = async <TDoc extends object>(
  collection: 'pages' | 'projects' | 'events' | 'announcements',
  slug: string,
  user?: QueryUser,
): Promise<TDoc | null> => {
  const query = await initQuery(user)
  const result = await query.payload.find(
    withUserAccess(query, {
      collection,
      where: getSlugWhere(slug),
      limit: 1,
      depth: 2,
    }),
  )

  return (result.docs[0] as TDoc | undefined) || null
}

export const getSiteSettings = async (user?: QueryUser): Promise<SiteSetting> => {
  const query = await initQuery(user)

  return query.payload.findGlobal(
    withUserAccess(query, {
      slug: 'site-settings',
      depth: 0,
    }),
  )
}

export const getConfiguredForm = async (
  key: SiteSettingsFormKey,
  user?: QueryUser,
): Promise<Form | null> => {
  const siteSettings = await getSiteSettings(user)
  return getFormByID(siteSettings.forms?.[key], user)
}

export const getFormByID = async (formID: unknown, user?: QueryUser): Promise<Form | null> => {
  const query = await initQuery(user)
  const normalizedID = getNumericRelationshipID(formID)

  if (!normalizedID) {
    return null
  }

  try {
    return await query.payload.findByID(
      withUserAccess(query, {
        collection: 'forms',
        id: normalizedID,
        depth: 0,
      }),
    )
  } catch {
    return null
  }
}

export const getAnnouncementsPage = async ({ page, limit }: PaginationArgs, user?: QueryUser) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'announcements',
      sort: '-publishedDate',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getEventsPage = async ({ page, limit }: PaginationArgs, user?: QueryUser) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'events',
      sort: 'date',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getProjectsPage = async ({ page, limit }: PaginationArgs, user?: QueryUser) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'projects',
      sort: 'title',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getDocumentsPage = async (
  { page, limit, category, q }: DocumentsPageArgs,
  user?: QueryUser,
) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'documents',
      where: getDocumentsWhere(category, q),
      sort: '-updatedAt',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getMembersPage = async (
  { page, limit, q, role }: MembersPageArgs,
  user: SessionUser,
) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'users',
      where: getMembersWhere(role, q),
      sort: 'fullName',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getOfficersPage = async ({ page, limit }: PaginationArgs, user?: QueryUser) => {
  const query = await initQuery(user)
  const args = normalizePagination({ page, limit })

  return query.payload.find(
    withUserAccess(query, {
      collection: 'users',
      where: getDirectoryOfficersWhere(),
      sort: 'fullName',
      page: args.page,
      limit: args.limit,
      depth: 1,
    }),
  )
}

export const getUpcomingEvents = async (limit = 5, user?: QueryUser) => {
  const query = await initQuery(user)

  return query.payload.find(
    withUserAccess(query, {
      collection: 'events',
      where: {
        date: {
          greater_than_equal: new Date().toISOString(),
        },
      },
      sort: 'date',
      limit,
      depth: 1,
    }),
  )
}

export const getRecentAnnouncements = async (limit = 5, user?: QueryUser) => {
  const query = await initQuery(user)

  return query.payload.find(
    withUserAccess(query, {
      collection: 'announcements',
      sort: '-publishedDate',
      limit,
      depth: 1,
    }),
  )
}

export const getOfficers = async (user?: QueryUser, limit = 100) => {
  const query = await initQuery(user)
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 100

  return query.payload.find(
    withUserAccess(query, {
      collection: 'users',
      where: getDirectoryOfficersWhere(),
      sort: 'fullName',
      depth: 1,
      limit: safeLimit,
    }),
  )
}

export const getPageBySlug = (slug: string, user?: QueryUser) => getBySlug<Page>('pages', slug, user)

export const getProjects = async (user?: QueryUser) => {
  const query = await initQuery(user)

  return query.payload.find(
    withUserAccess(query, {
      collection: 'projects',
      limit: 200,
      sort: 'title',
      depth: 1,
    }),
  )
}

export const getProjectBySlug = (slug: string, user?: QueryUser) =>
  getBySlug<Project>('projects', slug, user)

export const getProjectVolunteerForm = async (
  project: Pick<Project, 'volunteerSignupEnabled' | 'volunteerForm'>,
  user?: QueryUser,
): Promise<Form | null> => {
  if (!project.volunteerSignupEnabled) {
    return null
  }

  return getFormByID(project.volunteerForm, user)
}

export const getEvents = async (user?: QueryUser) => {
  const query = await initQuery(user)

  return query.payload.find(
    withUserAccess(query, {
      collection: 'events',
      limit: 200,
      sort: 'date',
      depth: 1,
    }),
  )
}

export const getEventBySlug = (slug: string, user?: QueryUser) => getBySlug<Event>('events', slug, user)

export const getAnnouncementBySlug = (slug: string, user?: QueryUser) =>
  getBySlug<Announcement>('announcements', slug, user)

export const getEventRSVPStatus = async (
  eventID: string | number,
  user?: QueryUser,
): Promise<RSVPStatus | null> => {
  if (!user) {
    return null
  }

  const query = await initQuery(user)
  const where: Where = {
    and: [
      { event: { equals: eventID } },
      { user: { equals: user.id } },
    ],
  }

  const existing = await query.payload.find(
    withUserAccess(query, {
      collection: 'rsvps',
      where,
      limit: 1,
      depth: 0,
    }),
  )

  const status = existing.docs[0]?.status
  return status === 'yes' || status === 'no' || status === 'maybe' ? status : null
}

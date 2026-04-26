import { randomInt } from 'crypto'

import { NextResponse } from 'next/server'
import type { Payload } from 'payload'

import type { Role } from '@/constants/roles'
import type { SessionUser } from '@/lib/auth'
import { getCurrentUser } from '@/lib/auth'
import { SMTP_CONFIG_ERROR, SMTP_CONFIGURED } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'
import { getServerURL } from '@/lib/url'
import { plainTextToLexical } from '@/lib/manage/richText'
import type { User as PayloadUser } from '@/payload-types'
import {
  buildManageWhere,
  getManageResourceConfig,
  isManageResourceSlug,
  MANAGE_RESOURCES,
  type ManageResourceSlug,
} from '@/lib/manage/resources'

type ManageApiSession = {
  payload: Payload
  user: SessionUser
}

type RawData = Record<string, unknown>

const USER_ROLES: Role[] = ['admin', 'officer', 'member']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_LOWER = 'abcdefghijkmnopqrstuvwxyz'
const PASSWORD_UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
const PASSWORD_DIGITS = '23456789'
const PASSWORD_SYMBOLS = '!@#$%^&*'
const PASSWORD_ALL = `${PASSWORD_LOWER}${PASSWORD_UPPER}${PASSWORD_DIGITS}${PASSWORD_SYMBOLS}`

export const manageJsonError = (message: string, status: number): NextResponse =>
  NextResponse.json({ error: message }, { status })

export const requireManageApiSession = async (
  adminOnly = false,
): Promise<ManageApiSession | NextResponse> => {
  const { user } = await getCurrentUser()

  if (!user) {
    return manageJsonError('Unauthorized', 401)
  }

  if (user.role !== 'admin' && user.role !== 'officer') {
    return manageJsonError('Forbidden', 403)
  }

  if (adminOnly && user.role !== 'admin') {
    return manageJsonError('Forbidden', 403)
  }

  return {
    payload: await getPayloadClient(),
    user,
  }
}

export const isErrorResponse = (value: ManageApiSession | NextResponse): value is NextResponse =>
  value instanceof NextResponse

const toPayloadUser = (user: SessionUser): PayloadUser => ({
  id: Number(user.id),
  fullName: user.fullName || '',
  role: user.role || 'member',
  email: user.email || '',
  updatedAt: '',
  createdAt: '',
  collection: 'users',
})

const optionalString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const requiredString = (data: RawData, field: string, label: string): string | NextResponse => {
  const value = optionalString(data[field])
  return value || manageJsonError(`${label} is required.`, 400)
}

const hasOwn = (data: RawData, field: string): boolean =>
  Object.prototype.hasOwnProperty.call(data, field)

const optionalEmail = (value: unknown, label = 'Email'): string | NextResponse | undefined => {
  const email = optionalString(value)
  if (!email) return undefined
  return EMAIL_PATTERN.test(email)
    ? email
    : manageJsonError(`${label} must be a valid email address.`, 400)
}

const optionalNumber = (
  value: unknown,
  label: string,
  options: { integer?: boolean; min?: number } = {},
): NextResponse | number | undefined => {
  if (value === null || value === undefined || value === '') return undefined
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(number)) return manageJsonError(`${label} must be a valid number.`, 400)
  if (options.integer && !Number.isInteger(number))
    return manageJsonError(`${label} must be a whole number.`, 400)
  if (options.min !== undefined && number < options.min) {
    return manageJsonError(`${label} must be at least ${options.min}.`, 400)
  }
  return number
}

const optionalBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value === 'true' || value === 'on'
  return fallback
}

const optionalDate = (value: unknown, label: string): NextResponse | string | undefined => {
  const text = optionalString(value)
  if (!text) return undefined
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) return manageJsonError(`${label} must be a valid date.`, 400)
  return date.toISOString()
}

const requiredDate = (data: RawData, field: string, label: string): NextResponse | string => {
  const date = optionalDate(data[field], label)
  return date || manageJsonError(`${label} is required.`, 400)
}

const relationID = (value: unknown, label: string): NextResponse | number | undefined => {
  if (!value) return undefined

  if (typeof value === 'object' && 'id' in value) {
    return relationID((value as { id?: unknown }).id, label)
  }

  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return undefined
    if (!/^\d+$/.test(trimmed))
      return manageJsonError(`${label} must reference a valid upload.`, 400)
    return Number(trimmed)
  }

  return manageJsonError(`${label} must reference a valid upload.`, 400)
}

const draftStatus = (
  data: RawData,
  fallback: 'draft' | 'published' = 'draft',
): 'draft' | 'published' => (data._status === 'published' ? 'published' : fallback)

const randomChar = (chars: string): string => chars[randomInt(chars.length)]

const createPassword = (): string => {
  const chars = [
    randomChar(PASSWORD_LOWER),
    randomChar(PASSWORD_UPPER),
    randomChar(PASSWORD_DIGITS),
    randomChar(PASSWORD_SYMBOLS),
    ...Array.from({ length: 28 }, () => randomChar(PASSWORD_ALL)),
  ]

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1)
    ;[chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]]
  }

  return chars.join('')
}

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const omitUndefined = (data: RawData): RawData =>
  Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined))

const contentValue = (
  data: RawData,
  field: string,
  label: string,
  operation: 'create' | 'update',
  required = false,
): NextResponse | unknown | undefined => {
  if (operation === 'create' && required) {
    const text = requiredString(data, field, label)
    if (text instanceof NextResponse) return text
    return plainTextToLexical(text)
  }

  if (!hasOwn(data, field)) return undefined
  return plainTextToLexical(data[field])
}

const sanitizeContentResource = (
  resource: ManageResourceSlug,
  data: RawData,
  operation: 'create' | 'update',
): RawData | NextResponse => {
  const title = requiredString(data, 'title', 'Title')
  if (title instanceof NextResponse) return title

  if (resource === 'announcements') {
    const content = contentValue(data, 'contentText', 'Body', operation, true)
    if (content instanceof NextResponse) return content

    const publishedDate = optionalDate(data.publishedDate, 'Published date')
    if (publishedDate instanceof NextResponse) return publishedDate

    const featuredImage = relationID(data.featuredImage, 'Featured image')
    if (featuredImage instanceof NextResponse) return featuredImage

    return omitUndefined({
      title,
      slug: operation === 'create' ? toSlug(title) : undefined,
      content,
      publishedDate: publishedDate || new Date().toISOString(),
      priority: optionalString(data.priority) || 'normal',
      membersOnly: optionalBoolean(data.membersOnly),
      featuredImage,
      pinned: optionalBoolean(data.pinned),
      _status: draftStatus(data),
    })
  }

  if (resource === 'events') {
    const date = requiredDate(data, 'date', 'Start date')
    if (date instanceof NextResponse) return date

    const endDate = optionalDate(data.endDate, 'End date')
    if (endDate instanceof NextResponse) return endDate

    if (endDate && new Date(endDate).getTime() < new Date(date).getTime()) {
      return manageJsonError('End date must be after the start date.', 400)
    }

    const rsvpDeadline = optionalDate(data.rsvpDeadline, 'RSVP deadline')
    if (rsvpDeadline instanceof NextResponse) return rsvpDeadline

    if (rsvpDeadline && new Date(rsvpDeadline).getTime() > new Date(date).getTime()) {
      return manageJsonError('RSVP deadline must be on or before the start date.', 400)
    }

    const description = contentValue(data, 'descriptionText', 'Description', operation)
    if (description instanceof NextResponse) return description

    const featuredImage = relationID(data.featuredImage, 'Featured image')
    if (featuredImage instanceof NextResponse) return featuredImage

    const maxAttendees = optionalNumber(data.maxAttendees, 'Max attendees', {
      integer: true,
      min: 1,
    })
    if (maxAttendees instanceof NextResponse) return maxAttendees

    const ticketPrice = optionalNumber(data.ticketPrice, 'Ticket price', { min: 0 })
    if (ticketPrice instanceof NextResponse) return ticketPrice

    return omitUndefined({
      title,
      slug: operation === 'create' ? toSlug(title) : undefined,
      date,
      endDate,
      eventType: optionalString(data.eventType) || 'meeting',
      location: optionalString(data.location) || 'Poorman Gallery, 352 E. Water St., Lock Haven',
      description,
      speakerName: optionalString(data.speakerName),
      speakerTopic: optionalString(data.speakerTopic),
      featuredImage,
      enableRSVP: optionalBoolean(data.enableRSVP),
      rsvpDeadline,
      maxAttendees,
      ticketPrice,
      ticketLink: optionalString(data.ticketLink),
      isRecurring: optionalBoolean(data.isRecurring),
      recurringNote: optionalString(data.recurringNote),
      _status: draftStatus(data),
    })
  }

  if (resource === 'documents') {
    const file = relationID(data.file, 'File')
    if (!file) return manageJsonError('File is required.', 400)
    if (file instanceof NextResponse) return file

    const meetingDate = optionalDate(data.meetingDate, 'Meeting date')
    if (meetingDate instanceof NextResponse) return meetingDate

    return omitUndefined({
      title,
      category: optionalString(data.category) || 'other',
      file,
      description: optionalString(data.description),
      meetingDate,
      membersOnly: optionalBoolean(data.membersOnly, true),
    })
  }

  if (resource === 'pages') {
    const content = contentValue(data, 'contentText', 'Body', operation, true)
    if (content instanceof NextResponse) return content

    const featuredImage = relationID(data.featuredImage, 'Featured image')
    if (featuredImage instanceof NextResponse) return featuredImage

    return omitUndefined({
      title,
      slug: operation === 'create' ? toSlug(title) : undefined,
      content,
      featuredImage,
      membersOnly: optionalBoolean(data.membersOnly),
      layout: operation === 'create' ? [] : undefined,
      _status: draftStatus(data),
    })
  }

  return manageJsonError('Unsupported resource.', 404)
}

const sanitizeUserResource = (
  data: RawData,
  operation: 'create' | 'update',
): RawData | NextResponse => {
  const fullName = requiredString(data, 'fullName', 'Full name')
  if (fullName instanceof NextResponse) return fullName

  const email =
    operation === 'create' ? requiredString(data, 'email', 'Email') : optionalEmail(data.email)
  if (email instanceof NextResponse) return email

  const validatedEmail = operation === 'create' ? optionalEmail(email) : email
  if (validatedEmail instanceof NextResponse) return validatedEmail

  const requestedRole = optionalString(data.role) as Role | undefined
  if (requestedRole && !USER_ROLES.includes(requestedRole)) {
    return manageJsonError('Role is invalid.', 400)
  }

  const photo = relationID(data.photo, 'Photo')
  if (photo instanceof NextResponse) return photo

  const memberSince = optionalDate(data.memberSince, 'Member since')
  if (memberSince instanceof NextResponse) return memberSince

  return omitUndefined({
    fullName,
    email: validatedEmail,
    password: operation === 'create' ? createPassword() : undefined,
    role: requestedRole || (operation === 'create' ? 'member' : undefined),
    title: optionalString(data.title),
    phone: optionalString(data.phone),
    bio: optionalString(data.bio),
    photo,
    sponsor: optionalString(data.sponsor),
    memberSince,
    showInDirectory: optionalBoolean(data.showInDirectory, true),
    showPhone: optionalBoolean(data.showPhone),
    showEmail: optionalBoolean(data.showEmail, true),
  })
}

export const sanitizeManageData = (
  resource: ManageResourceSlug,
  data: RawData,
  operation: 'create' | 'update',
): RawData | NextResponse => {
  if (resource === 'users') return sanitizeUserResource(data, operation)
  if (resource === 'media') {
    return omitUndefined({
      alt: optionalString(data.alt),
      caption: optionalString(data.caption),
      isPublic: optionalBoolean(data.isPublic, true),
    })
  }

  return sanitizeContentResource(resource, data, operation)
}

const getDraftOption = (resource: ManageResourceSlug, data: RawData): boolean | undefined => {
  if (!MANAGE_RESOURCES[resource].draftable) return undefined
  return data._status !== 'published'
}

export const sendInviteEmail = async ({
  email,
  payload,
  user,
}: {
  email: string
  payload: Payload
  user: SessionUser
}): Promise<{ sent: boolean; warning?: string }> => {
  if (!SMTP_CONFIGURED) {
    return {
      sent: false,
      warning: `Member was saved, but no invite email was sent because SMTP is not configured (${SMTP_CONFIG_ERROR}).`,
    }
  }

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
      overrideAccess: false,
      req: { user: toPayloadUser(user) },
    })

    return { sent: true }
  } catch (error) {
    return {
      sent: false,
      warning: `Member was saved, but the invite email failed: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    }
  }
}

export const listManageResource = async (
  request: Request,
  resource: string,
): Promise<NextResponse> => {
  if (!isManageResourceSlug(resource)) return manageJsonError('Resource not found.', 404)

  const config = getManageResourceConfig(resource)
  const session = await requireManageApiSession(Boolean(config?.adminOnly))
  if (isErrorResponse(session)) return session

  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page') || 1))
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || 10)))
  const sort = url.searchParams.get('sort') || config?.defaultSort || '-updatedAt'

  const result = await session.payload.find({
    collection: config!.collection,
    depth: 1,
    draft: true,
    limit,
    page,
    sort,
    where: buildManageWhere(resource, url.searchParams),
    overrideAccess: false,
    user: session.user,
  })

  return NextResponse.json(result)
}

export const getManageResource = async (resource: string, id: string): Promise<NextResponse> => {
  if (!isManageResourceSlug(resource)) return manageJsonError('Resource not found.', 404)

  const config = getManageResourceConfig(resource)
  const session = await requireManageApiSession(Boolean(config?.adminOnly))
  if (isErrorResponse(session)) return session

  try {
    const doc = await session.payload.findByID({
      collection: config!.collection,
      id,
      depth: 1,
      draft: true,
      overrideAccess: false,
      user: session.user,
    })

    return NextResponse.json({ doc })
  } catch {
    return manageJsonError('Not found.', 404)
  }
}

export const createManageResource = async (
  request: Request,
  resource: string,
): Promise<NextResponse> => {
  if (!isManageResourceSlug(resource)) return manageJsonError('Resource not found.', 404)

  const config = getManageResourceConfig(resource)
  const session = await requireManageApiSession(Boolean(config?.adminOnly))
  if (isErrorResponse(session)) return session

  const body = (await request.json().catch(() => null)) as RawData | null
  if (!body) return manageJsonError('Invalid JSON body.', 400)

  const data = sanitizeManageData(resource, body, 'create')
  if (data instanceof NextResponse) return data

  const created = await session.payload.create({
    collection: config!.collection,
    data,
    depth: 1,
    draft: getDraftOption(resource, data),
    overrideAccess: false,
    user: session.user,
  })

  if (resource !== 'users') {
    return NextResponse.json({ doc: created }, { status: 201 })
  }

  const email = typeof data.email === 'string' ? data.email : ''
  const invite = email
    ? await sendInviteEmail({ email, payload: session.payload, user: session.user })
    : undefined

  return NextResponse.json({ doc: created, invite }, { status: 201 })
}

export const updateManageResource = async (
  request: Request,
  resource: string,
  id: string,
): Promise<NextResponse> => {
  if (!isManageResourceSlug(resource)) return manageJsonError('Resource not found.', 404)

  const config = getManageResourceConfig(resource)
  const session = await requireManageApiSession(Boolean(config?.adminOnly))
  if (isErrorResponse(session)) return session

  const body = (await request.json().catch(() => null)) as RawData | null
  if (!body) return manageJsonError('Invalid JSON body.', 400)

  const data = sanitizeManageData(resource, body, 'update')
  if (data instanceof NextResponse) return data

  const updated = await session.payload.update({
    collection: config!.collection,
    id,
    data,
    depth: 1,
    draft: getDraftOption(resource, data),
    overrideAccess: false,
    user: session.user,
  })

  return NextResponse.json({ doc: updated })
}

export const deleteManageResource = async (resource: string, id: string): Promise<NextResponse> => {
  if (!isManageResourceSlug(resource)) return manageJsonError('Resource not found.', 404)

  const config = getManageResourceConfig(resource)
  const session = await requireManageApiSession(Boolean(config?.adminOnly))
  if (isErrorResponse(session)) return session

  const deleted = await session.payload.delete({
    collection: config!.collection,
    id,
    overrideAccess: false,
    user: session.user,
  })

  return NextResponse.json({ doc: deleted })
}

export const resetURL = (token: string | undefined): string =>
  `${getServerURL()}/reset-password?token=${token || ''}`

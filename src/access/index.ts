import type { Access, FieldAccess, Where } from 'payload'

export type Role = 'admin' | 'officer' | 'member'

export type AuthUser = {
  id: string | number
  role?: Role
}

const getUser = (req: { user?: unknown }): AuthUser | undefined => req.user as AuthUser | undefined

export const isAdmin: Access = ({ req }) => getUser(req)?.role === 'admin'

export const isAdminOrOfficer: Access = ({ req }) => {
  const role = getUser(req)?.role
  return role === 'admin' || role === 'officer'
}

export const isAuthenticated: Access = ({ req }) => Boolean(getUser(req))

export const isAdminOrSelf: Access = ({ req }) => {
  const user = getUser(req)

  if (!user) return false
  if (user.role === 'admin') return true

  return { id: { equals: user.id } }
}

export const isAdminOrOfficerOrSelf: Access = ({ req }) => {
  const user = getUser(req)

  if (!user) return false
  if (user.role === 'admin' || user.role === 'officer') return true

  return { user: { equals: user.id } }
}

export const isAdminFieldAccess: FieldAccess = ({ req }) => getUser(req)?.role === 'admin'

/** Admin/officer sees everything; others see only published. */
export const publishedOrPrivileged: Access = ({ req }) => {
  const role = getUser(req)?.role
  if (role === 'admin' || role === 'officer') return true
  return { _status: { equals: 'published' } }
}

/** Unauthenticated: published + public only. Privileged: all. Members: published only. */
export const publishedAndPublicOrPrivileged: Access = ({ req }) => {
  const user = getUser(req)

  if (!user) {
    return {
      and: [
        { _status: { equals: 'published' } },
        { membersOnly: { equals: false } },
      ],
    } as Where
  }

  if (user.role === 'admin' || user.role === 'officer') return true

  return { _status: { equals: 'published' } }
}

/** Unauthenticated: public only. Any authenticated user: all. */
export const publicOrAuthenticated: Access = ({ req }) => {
  if (!getUser(req)) return { membersOnly: { equals: false } }
  return true
}

/** Privileged: all. Others: public media only. */
export const publicOrPrivileged: Access = ({ req }) => {
  const role = getUser(req)?.role
  if (role === 'admin' || role === 'officer') return true
  return { isPublic: { equals: true } }
}

import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'officer' | 'member'

type AuthUser = {
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

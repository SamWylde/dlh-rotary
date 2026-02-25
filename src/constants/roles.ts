export const USER_ROLES = ['admin', 'officer', 'member'] as const
export type Role = (typeof USER_ROLES)[number]

export const PRIVILEGED_ROLES = ['admin', 'officer'] as const
export type PrivilegedRole = (typeof PRIVILEGED_ROLES)[number]

export const isPrivilegedRole = (role: Role | undefined): role is PrivilegedRole =>
  role === 'admin' || role === 'officer'

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  officer: 'Officer',
  member: 'Member',
}


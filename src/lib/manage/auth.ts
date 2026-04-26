import { redirect } from 'next/navigation'

import type { SessionUser } from '@/lib/auth'
import { getCurrentUser } from '@/lib/auth'

export const canAccessManage = (user: SessionUser | null | undefined): user is SessionUser =>
  user?.role === 'admin' || user?.role === 'officer'

export const canManageMembers = (user: SessionUser | null | undefined): user is SessionUser => user?.role === 'admin'

export const getManageUser = async (): Promise<SessionUser | null> => {
  const { user } = await getCurrentUser()
  return canAccessManage(user) ? user : null
}

export const requireManageUser = async (): Promise<SessionUser> => {
  const { user } = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (!canAccessManage(user)) {
    redirect('/account')
  }

  return user
}

export const requireAdminUser = async (): Promise<SessionUser> => {
  const user = await requireManageUser()

  if (!canManageMembers(user)) {
    redirect('/manage')
  }

  return user
}

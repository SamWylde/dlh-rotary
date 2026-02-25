import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getServerURL } from '@/lib/url'

export type SessionUser = {
  id: string | number
  role?: 'admin' | 'officer' | 'member'
  email?: string
  fullName?: string
}

export const getCurrentUser = async (): Promise<{
  token: string | null
  user: SessionUser | null
}> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || null

  if (!token) {
    return { token: null, user: null }
  }

  const baseURL = await getServerURL()

  const meReq = await fetch(`${baseURL}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
    cache: 'no-store',
  })

  if (!meReq.ok) {
    return { token: null, user: null }
  }

  const body = (await meReq.json()) as { user?: SessionUser }

  return {
    token,
    user: body.user || null,
  }
}

export const requireUser = async (): Promise<SessionUser> => {
  const { user } = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

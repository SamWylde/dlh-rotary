'use client'

import type { AuthProvider } from '@refinedev/core'

type MeResponse = {
  permissions?: string
  user?: {
    email?: string
    fullName?: string
    id?: number | string
    role?: string
  }
}

const ME_CACHE_MS = 5_000
let meCache: { expiresAt: number; promise: Promise<MeResponse | null> } | null = null

const getMe = async (): Promise<MeResponse | null> => {
  if (meCache && meCache.expiresAt > Date.now()) {
    return meCache.promise
  }

  meCache = {
    expiresAt: Date.now() + ME_CACHE_MS,
    promise: fetch('/manage/api/me', { credentials: 'include' }).then(async (response) => {
      if (!response.ok) return null
      return (await response.json()) as MeResponse
    }),
  }

  return meCache.promise
}

const clearMeCache = () => {
  meCache = null
}

export const manageAuthProvider: AuthProvider = {
  login: async () => ({
    success: true,
  }),

  logout: async () => {
    clearMeCache()

    await fetch('/api/users/logout', {
      credentials: 'include',
      method: 'POST',
    }).catch(() => null)

    return {
      success: true,
      redirectTo: '/login',
    }
  },

  check: async () => {
    const me = await getMe()

    if (!me?.user) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: '/login',
      }
    }

    return { authenticated: true }
  },

  onError: async (error) => {
    if (error?.status === 401 || error?.message === 'Unauthorized') {
      clearMeCache()
      return { logout: true, redirectTo: '/login' }
    }

    return {}
  },

  getIdentity: async () => {
    const me = await getMe()
    return me?.user || null
  },

  getPermissions: async () => {
    const me = await getMe()
    return me?.permissions || null
  },
}

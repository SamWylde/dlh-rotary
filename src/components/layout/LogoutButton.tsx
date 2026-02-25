'use client'

import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // Network failure — continue to redirect; session cookie will expire
    }
    router.push('/')
    router.refresh()
  }

  return (
    <button
      className="rounded border border-[var(--color-header-border-muted,rgba(255,255,255,0.5))] px-2 py-1 hover:bg-[var(--color-header-hover,rgba(255,255,255,0.1))]"
      onClick={handleLogout}
      type="button"
    >
      Logout
    </button>
  )
}

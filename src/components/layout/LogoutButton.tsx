'use client'

import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    router.push('/')
    router.refresh()
  }

  return (
    <button
      className="rounded border border-white/50 px-2 py-1 hover:bg-white/10"
      onClick={handleLogout}
      type="button"
    >
      Logout
    </button>
  )
}

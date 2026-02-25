'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SessionUser } from '@/lib/auth'
import { resolveHref, type NavEntry } from '@/lib/nav'

import { LogoutButton } from './LogoutButton'

export const MobileNav = ({ nav, user }: { nav: NavEntry[]; user: SessionUser | null }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="rounded p-2 hover:bg-white/10"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          className="absolute left-0 right-0 top-full z-50 border-b border-white/20 bg-[var(--color-header-bg,#17458F)] px-4 py-3"
          aria-label="Mobile Navigation"
        >
          <ul className="grid gap-1">
            {nav.map((entry) => {
              const href = resolveHref(entry)
              return (
                <li key={entry.id || `${entry.label}-${href}`}>
                  <Link
                    className="block rounded px-3 py-2 hover:bg-white/10"
                    href={href}
                    target={entry.link?.newTab ? '_blank' : undefined}
                  >
                    {entry.label || 'Untitled'}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2 border-t border-white/20 pt-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/account">
                    Account
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/login">
                  Member Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

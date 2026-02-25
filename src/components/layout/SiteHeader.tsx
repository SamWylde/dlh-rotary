import Link from 'next/link'

import type { SessionUser } from '@/lib/auth'
import { resolveHref, type NavEntry } from '@/lib/nav'

import { LogoutButton } from './LogoutButton'
import { MobileNav } from './MobileNav'

export const SiteHeader = ({
  nav,
  user,
}: {
  nav: NavEntry[]
  user: SessionUser | null
}) => {
  return (
    <header className="relative border-b border-border bg-[var(--color-header-bg,#17458F)] text-[var(--color-header-text,#fff)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link className="text-lg font-semibold tracking-wide" href="/">
          Rotary Club of Downtown Lock Haven
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main Navigation" className="hidden flex-wrap items-center gap-3 text-sm md:flex">
          {nav.map((entry) => {
            const href = resolveHref(entry)
            return (
              <Link
                className="rounded px-2 py-1 hover:bg-white/10"
                href={href}
                key={entry.id || `${entry.label}-${href}`}
                target={entry.link?.newTab ? '_blank' : undefined}
              >
                {entry.label || 'Untitled'}
              </Link>
            )
          })}
          {user ? (
            <>
              <Link className="rounded border border-white/50 px-2 py-1 hover:bg-white/10" href="/account">
                Account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link className="rounded border border-white/50 px-2 py-1 hover:bg-white/10" href="/login">
              Member Login
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <MobileNav nav={nav} user={user} />
      </div>
    </header>
  )
}

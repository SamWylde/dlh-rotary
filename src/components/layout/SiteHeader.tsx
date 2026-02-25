import Link from 'next/link'

import type { SessionUser } from '@/lib/auth'
import { getVisibleChildren, isValidHref, resolveHref, type MainNavEntry } from '@/lib/nav'

import { LogoutButton } from './LogoutButton'
import { MobileNav } from './MobileNav'

export const SiteHeader = ({
  nav,
  user,
}: {
  nav: MainNavEntry[]
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
          {nav.map((entry, index) => {
            const href = resolveHref(entry.link)
            const children = getVisibleChildren(entry, user)
            const hasChildren = children.length > 0
            const key = entry.id || `${entry.label || 'item'}-${index}`
            const label = entry.label || 'Untitled'

            const parentLink = isValidHref(href) ? (
              <Link
                className="rounded px-2 py-1 hover:bg-white/10"
                href={href}
                target={entry.link?.newTab ? '_blank' : undefined}
                rel={entry.link?.newTab ? 'noopener noreferrer' : undefined}
              >
                {label}
              </Link>
            ) : hasChildren ? (
              <button
                aria-label={`Open submenu for ${label}`}
                className="rounded px-2 py-1 hover:bg-white/10"
                type="button"
              >
                {label}
              </button>
            ) : (
              <span className="rounded px-2 py-1 text-white/90">{label}</span>
            )

            if (!hasChildren) {
              return <div key={key}>{parentLink}</div>
            }

            return (
              <div className="group relative" key={key}>
                <div aria-haspopup="menu">{parentLink}</div>
                <ul
                  className="invisible absolute right-0 top-full z-50 mt-2 min-w-56 rounded-md border border-border bg-card p-1 text-card-foreground opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  role="menu"
                >
                  {children.map((child, childIndex) => {
                    const childHref = resolveHref(child.link)
                    const childLabel = child.label || 'Untitled'
                    return (
                      <li key={child.id || `${key}-child-${childIndex}`} role="none">
                        <Link
                          className="block rounded px-3 py-2 text-sm hover:bg-muted"
                          href={childHref}
                          role="menuitem"
                          target={child.link?.newTab ? '_blank' : undefined}
                          rel={child.link?.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {childLabel}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
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

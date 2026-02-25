import Link from 'next/link'

import type { SessionUser } from '@/lib/auth'
import { getVisibleChildren, isValidHref, resolveHref, type MainNavEntry } from '@/lib/nav'

import { LogoutButton } from './LogoutButton'
import { MobileNav } from './MobileNav'
import { NavDropdown } from './NavDropdown'

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
        <Link className="flex items-center gap-2.5 font-semibold tracking-wide" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rotary-logo.svg" alt="" className="h-10 w-10 shrink-0" aria-hidden="true" />
          <span className="text-lg">Rotary Club of Downtown Lock Haven</span>
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
                className="rounded px-2 py-1 hover:bg-[var(--color-header-hover,rgba(255,255,255,0.1))]"
                href={href}
                target={entry.link?.newTab ? '_blank' : undefined}
                rel={entry.link?.newTab ? 'noopener noreferrer' : undefined}
              >
                {label}
              </Link>
            ) : hasChildren ? (
              <button
                aria-label={`Open submenu for ${label}`}
                className="rounded px-2 py-1 hover:bg-[var(--color-header-hover,rgba(255,255,255,0.1))]"
                type="button"
              >
                {label}
              </button>
            ) : (
              <span className="rounded px-2 py-1 text-[var(--color-header-muted-text,rgba(255,255,255,0.85))]">{label}</span>
            )

            if (!hasChildren) {
              return <div key={key}>{parentLink}</div>
            }

            return (
              <NavDropdown
                key={key}
                trigger={parentLink}
                items={children.map((child, childIndex) => ({
                  key: child.id || `${key}-child-${childIndex}`,
                  href: resolveHref(child.link),
                  label: child.label || 'Untitled',
                  newTab: child.link?.newTab ?? false,
                }))}
              />
            )
          })}
          {user ? (
            <>
              <Link className="rounded border border-[var(--color-header-border-muted,rgba(255,255,255,0.5))] px-2 py-1 hover:bg-[var(--color-header-hover,rgba(255,255,255,0.1))]" href="/account">
                Account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link className="rounded border border-[var(--color-header-border-muted,rgba(255,255,255,0.5))] px-2 py-1 hover:bg-[var(--color-header-hover,rgba(255,255,255,0.1))]" href="/login">
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

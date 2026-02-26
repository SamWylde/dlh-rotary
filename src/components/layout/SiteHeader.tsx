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
    <header
      className="relative"
      style={{
        background: 'var(--color-header-bg)',
        borderBottom: 'var(--border-header-width, 3px) solid var(--color-header-border)',
        padding: 'var(--header-padding-y, 16px) var(--header-padding-x, 40px)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link className="flex items-center gap-3" href="/" style={{ textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rotary-logo.svg"
            alt=""
            className="shrink-0"
            style={{ height: 'var(--header-logo-size, 42px)', width: 'var(--header-logo-size, 42px)' }}
            aria-hidden="true"
          />
          <div style={{ lineHeight: 1.3 }}>
            <div
              style={{
                fontWeight: 'var(--club-name-weight, 700)' as unknown as number,
                fontSize: 'var(--club-name-size, 15px)',
                color: 'var(--color-header-text)',
                letterSpacing: 'var(--club-name-spacing, 0.02em)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Rotary Club of
            </div>
            <div
              style={{
                fontWeight: 'var(--club-name-weight, 700)' as unknown as number,
                fontSize: 'var(--club-name-size, 15px)',
                color: 'var(--color-header-text)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Downtown Lock Haven
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center md:flex"
          style={{
            gap: 'var(--nav-gap, 24px)',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--nav-font-weight, 500)' as unknown as number,
            fontSize: 'var(--nav-font-size, 13px)',
            color: 'var(--color-nav-text)',
          }}
        >
          {nav.map((entry, index) => {
            const href = resolveHref(entry.link)
            const children = getVisibleChildren(entry, user)
            const hasChildren = children.length > 0
            const key = entry.id || `${entry.label || 'item'}-${index}`
            const label = entry.label || 'Untitled'

            const parentLink = isValidHref(href) ? (
              <Link
                className="cursor-pointer transition-colors"
                href={href}
                target={entry.link?.newTab ? '_blank' : undefined}
                rel={entry.link?.newTab ? 'noopener noreferrer' : undefined}
                style={{ borderBottom: '2px solid transparent', paddingBottom: '2px' }}
              >
                {label}
              </Link>
            ) : hasChildren ? (
              <button
                aria-label={`Open submenu for ${label}`}
                className="cursor-pointer transition-colors"
                type="button"
                style={{ borderBottom: '2px solid transparent', paddingBottom: '2px' }}
              >
                {label}
              </button>
            ) : (
              <span style={{ borderBottom: '2px solid transparent', paddingBottom: '2px', opacity: 0.6 }}>{label}</span>
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
              <Link
                href="/account"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  padding: 'var(--nav-btn-padding, 6px 16px)',
                  borderRadius: 'var(--nav-btn-radius, 4px)',
                  fontSize: 'var(--nav-btn-font-size, 12px)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/join"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                padding: 'var(--nav-btn-padding, 6px 16px)',
                borderRadius: 'var(--nav-btn-radius, 4px)',
                fontSize: 'var(--nav-btn-font-size, 12px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
              }}
            >
              Join Us
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <MobileNav nav={nav} user={user} />
      </div>
    </header>
  )
}

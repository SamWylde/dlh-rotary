'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SessionUser } from '@/lib/auth'
import { getVisibleChildren, isValidHref, resolveHref, type MainNavEntry } from '@/lib/nav'

import { LogoutButton } from './LogoutButton'

export const MobileNav = ({ nav, user }: { nav: MainNavEntry[]; user: SessionUser | null }) => {
  const [open, setOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  // Close on navigation
  useEffect(() => {
    setOpen(false)
    setExpandedGroups({})
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
            {nav.map((entry, index) => {
              const href = resolveHref(entry.link)
              const label = entry.label || 'Untitled'
              const children = getVisibleChildren(entry, user)
              const hasChildren = children.length > 0
              const groupKey = entry.id || `${label}-${index}`
              const isExpanded = Boolean(expandedGroups[groupKey])

              return (
                <li key={groupKey}>
                  <div className="flex items-center gap-2">
                    {isValidHref(href) ? (
                      <Link
                        className="block flex-1 rounded px-3 py-2 hover:bg-white/10"
                        href={href}
                        target={entry.link?.newTab ? '_blank' : undefined}
                        rel={entry.link?.newTab ? 'noopener noreferrer' : undefined}
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="block flex-1 rounded px-3 py-2 text-white/90">{label}</span>
                    )}
                    {hasChildren ? (
                      <button
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} submenu for ${label}`}
                        className="rounded p-2 hover:bg-white/10"
                        onClick={() =>
                          setExpandedGroups((previous) => ({
                            ...previous,
                            [groupKey]: !previous[groupKey],
                          }))
                        }
                        type="button"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                  {hasChildren && isExpanded ? (
                    <ul className="ml-4 mt-1 grid gap-1 border-l border-white/20 pl-2">
                      {children.map((child, childIndex) => {
                        const childHref = resolveHref(child.link)
                        return (
                          <li key={child.id || `${groupKey}-child-${childIndex}`}>
                            <Link
                              className="block rounded px-3 py-2 text-sm hover:bg-white/10"
                              href={childHref}
                              target={child.link?.newTab ? '_blank' : undefined}
                              rel={child.link?.newTab ? 'noopener noreferrer' : undefined}
                            >
                              {child.label || 'Untitled'}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
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

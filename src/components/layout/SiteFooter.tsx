import Link from 'next/link'

import { resolveHref, type NavEntry } from '@/lib/nav'

export const SiteFooter = ({
  nav,
  contactEmail,
}: {
  nav: NavEntry[]
  contactEmail?: string | null
}) => (
  <footer className="mt-auto border-t border-border bg-[var(--color-footer-bg,#0F2D5E)] text-[var(--color-footer-text,#cbd5e1)]">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm">
      <p>{contactEmail || 'dlhrotary@gmail.com'}</p>
      <nav className="flex flex-wrap gap-3" aria-label="Footer Navigation">
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
      </nav>
    </div>
  </footer>
)
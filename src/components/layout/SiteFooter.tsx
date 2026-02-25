import Link from 'next/link'

import { isValidHref, resolveHref, type FooterNavEntry } from '@/lib/nav'

export const SiteFooter = ({
  nav,
  contactEmail,
  contactPhone,
  address,
  facebookUrl,
}: {
  nav: FooterNavEntry[]
  contactEmail?: string | null
  contactPhone?: string | null
  address?: string | null
  facebookUrl?: string | null
}) => (
  <footer className="mt-auto border-t border-border bg-[var(--color-footer-bg,#0F2D5E)] text-[var(--color-footer-text,#cbd5e1)]">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm md:grid-cols-3">
      {/* Club contact */}
      <div className="grid gap-1.5">
        <p className="font-semibold">Rotary Club of Downtown Lock Haven</p>
        {address && (
          <p className="whitespace-pre-line opacity-70">{address}</p>
        )}
        {contactEmail && (
          <a className="opacity-70 hover:opacity-100" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        )}
        {contactPhone && (
          <a className="opacity-70 hover:opacity-100" href={`tel:${contactPhone.replace(/\D/g, '')}`}>
            {contactPhone}
          </a>
        )}
      </div>

      {/* Footer nav links */}
      <nav aria-label="Footer Navigation" className="grid gap-1.5 content-start">
        {nav.map((entry, index) => {
          const href = resolveHref(entry.link)
          if (!isValidHref(href)) return null
          return (
            <Link
              className="-ml-2 rounded px-2 py-0.5 opacity-70 hover:bg-white/10 hover:opacity-100"
              href={href}
              key={entry.id || `${entry.label}-${index}`}
              target={entry.link?.newTab ? '_blank' : undefined}
              rel={entry.link?.newTab ? 'noopener noreferrer' : undefined}
            >
              {entry.label || 'Untitled'}
            </Link>
          )
        })}
      </nav>

      {/* Social / external */}
      <div className="grid gap-2 content-start">
        {facebookUrl && (
          <a
            className="flex items-center gap-2 opacity-70 hover:opacity-100"
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </a>
        )}
        <a
          className="opacity-70 hover:opacity-100"
          href="https://www.rotary.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rotary International
        </a>
        <p className="mt-2 text-xs opacity-50">
          (c) {new Date().getFullYear()} Rotary Club of Downtown Lock Haven
        </p>
      </div>
    </div>
  </footer>
)


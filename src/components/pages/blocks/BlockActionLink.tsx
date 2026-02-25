import Link from 'next/link'

import type { PageBlockLink } from './blockUtils'
import { resolvePageBlockHref, resolvePageBlockLabel } from './blockUtils'

export const BlockActionLink = ({
  link,
  fallbackLabel,
  variant,
}: {
  link?: PageBlockLink
  fallbackLabel: string
  variant: 'primary' | 'secondary'
}) => {
  const href = resolvePageBlockHref(link)

  if (!href) {
    return null
  }

  const label = resolvePageBlockLabel(link, fallbackLabel)
  const className =
    variant === 'primary'
      ? 'rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90'
      : 'rounded border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary'
  const openInNewTab = Boolean(link?.newTab)

  if (href.startsWith('/')) {
    return (
      <Link
        className={className}
        href={href}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        target={openInNewTab ? '_blank' : undefined}
      >
        {label}
      </Link>
    )
  }

  return (
    <a
      className={className}
      href={href}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      target={openInNewTab ? '_blank' : undefined}
    >
      {label}
    </a>
  )
}

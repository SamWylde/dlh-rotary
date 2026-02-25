import type { HeroBlock, Media } from '@/payload-types'

export type PageBlockLink = HeroBlock['primaryLink']

type LinkReference = NonNullable<PageBlockLink>['reference']

const getReferenceSlug = (reference: LinkReference): string | null => {
  if (!reference || typeof reference !== 'object') return null
  return typeof reference.slug === 'string' && reference.slug.trim().length > 0 ? reference.slug : null
}

const getReferenceTitle = (reference: LinkReference): string | null => {
  if (!reference || typeof reference !== 'object') return null
  return typeof reference.title === 'string' && reference.title.trim().length > 0 ? reference.title : null
}

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

const isSafeExternalURL = (value: string): boolean => {
  try {
    const parsed = new URL(value)
    return SAFE_PROTOCOLS.has(parsed.protocol)
  } catch {
    return false
  }
}

export const resolvePageBlockHref = (link: PageBlockLink): string | null => {
  if (!link) return null

  if (link.type === 'internal') {
    const slug = getReferenceSlug(link.reference)
    return slug ? `/${slug}` : null
  }

  if (link.type === 'external' && typeof link.url === 'string') {
    const normalized = link.url.trim()
    if (normalized.length === 0 || !isSafeExternalURL(normalized)) return null
    return normalized
  }

  return null
}

export const resolvePageBlockLabel = (link: PageBlockLink, fallback: string): string => {
  if (!link) return fallback

  const title = getReferenceTitle(link.reference)
  if (title) return title

  if (typeof link.url === 'string') {
    const normalized = link.url.trim()
    if (normalized.length > 0 && isSafeExternalURL(normalized)) {
      try {
        const parsed = new URL(normalized)
        if (parsed.protocol === 'mailto:') return 'Email'
        if (parsed.protocol === 'tel:') return 'Call'
        return parsed.hostname.replace(/^www\./, '') || fallback
      } catch {
        return fallback
      }
    }
  }

  return fallback
}

export const getMediaFromRelation = (value: number | Media | null | undefined): Media | null => {
  if (!value || typeof value !== 'object') {
    return null
  }

  return value
}

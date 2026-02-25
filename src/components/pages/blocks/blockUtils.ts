import { getMediaFromRelation } from '@/lib/media'
import type { HeroBlock } from '@/payload-types'
import { isSafeURL } from '@/utilities/urlSafety'

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

export const resolvePageBlockHref = (link: PageBlockLink): string | null => {
  if (!link) return null

  if (link.type === 'internal') {
    const slug = getReferenceSlug(link.reference)
    return slug ? `/${slug}` : null
  }

  if (link.type === 'external' && typeof link.url === 'string') {
    const normalized = link.url.trim()
    if (normalized.length === 0 || !isSafeURL(normalized)) return null
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
    if (normalized.length > 0 && isSafeURL(normalized)) {
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

export { getMediaFromRelation }

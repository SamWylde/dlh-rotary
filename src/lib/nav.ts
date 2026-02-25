import type { SessionUser } from '@/lib/auth'
import type { Navigation } from '@/payload-types'

export type MainNavEntry = NonNullable<Navigation['mainNav']>[number]
export type MainNavChild = NonNullable<MainNavEntry['children']>[number]
export type FooterNavEntry = NonNullable<Navigation['footerNav']>[number]
type NavLink = NonNullable<MainNavEntry['link']>

const getInternalReferenceSlug = (reference: NavLink['reference']): string | null => {
  if (!reference) return null

  if (typeof reference === 'object' && 'slug' in reference) {
    const slug = reference.slug
    return typeof slug === 'string' && slug.length > 0 ? slug : null
  }

  return null
}

export const resolveHref = (link?: MainNavEntry['link'] | MainNavChild['link'] | FooterNavEntry['link']): string => {
  const type = link?.type

  if (type === 'external' && link?.url) {
    return link.url
  }

  if (type === 'internal') {
    const slug = getInternalReferenceSlug(link?.reference)
    if (slug) return `/${slug}`
  }

  return '#'
}

export const isValidHref = (href: string): boolean => href !== '#'

export const getVisibleChildren = (
  entry: MainNavEntry,
  user: SessionUser | null,
): MainNavChild[] => {
  const children = entry.children ?? []

  return children.filter((child) => {
    if (child.membersOnly && !user) {
      return false
    }

    return isValidHref(resolveHref(child.link))
  })
}

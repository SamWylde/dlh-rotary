export type NavEntry = {
  id?: string
  label?: string
  link?: {
    type?: 'internal' | 'external'
    url?: string
    reference?: { slug?: string } | string
    newTab?: boolean
  }
}

export const resolveHref = (entry: NavEntry): string => {
  const type = entry.link?.type

  if (type === 'external' && entry.link?.url) {
    return entry.link.url
  }

  if (type === 'internal') {
    const reference = entry.link?.reference
    if (reference && typeof reference === 'object' && reference.slug) {
      return `/${reference.slug}`
    }
    if (typeof reference === 'string' && reference.length > 0) {
      return `/${reference}`
    }
  }

  return '#'
}

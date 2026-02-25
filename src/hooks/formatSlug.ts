import type { CollectionBeforeChangeHook } from 'payload'

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatSlug: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  if (!data) return data

  const title = typeof data.title === 'string' ? data.title.trim() : ''
  const hasManualSlug = typeof data.slug === 'string' && data.slug.trim().length > 0

  if (operation === 'create' && title && !hasManualSlug) {
    data.slug = toSlug(title)
  }

  if (operation === 'update') {
    const titleChanged = title && title !== (originalDoc?.title || '')
    if (titleChanged && !hasManualSlug) {
      data.slug = toSlug(title)
    }
  }

  return data
}
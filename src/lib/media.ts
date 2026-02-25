import type { Media } from '@/payload-types'

export const getMediaFromRelation = (value: number | Media | null | undefined): Media | null => {
  if (!value || typeof value !== 'object') {
    return null
  }

  return value
}

export const getMediaURL = (value: number | Media | null | undefined): string | null => {
  const media = getMediaFromRelation(value)
  return typeof media?.url === 'string' && media.url.length > 0 ? media.url : null
}

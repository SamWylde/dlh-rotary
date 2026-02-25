import type { Metadata } from 'next'

import { lexicalToPlainText } from '@/lib/richText'

type SlugFetcher<T> = (slug: string) => Promise<T | null>

export function makeSlugMetadata<T extends { title: string }>(
  fetcher: SlugFetcher<T>,
  getDescription: (doc: T) => unknown,
) {
  return async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
    const { slug } = await params
    const doc = await fetcher(slug)
    if (!doc) return {}
    const description = lexicalToPlainText(getDescription(doc)).slice(0, 160) || undefined
    return {
      title: `${doc.title} - Rotary Club of Downtown Lock Haven`,
      description,
    }
  }
}

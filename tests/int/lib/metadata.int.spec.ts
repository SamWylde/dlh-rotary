import { describe, expect, it } from 'vitest'

import { makeSlugMetadata } from '@/lib/metadata'

describe('makeSlugMetadata', () => {
  it('returns empty metadata when fetcher returns null', async () => {
    const generate = makeSlugMetadata(async () => null, () => '')
    const metadata = await generate({ params: Promise.resolve({ slug: 'missing' }) })
    expect(metadata).toEqual({})
  })

  it('builds title and truncates description to 160 chars', async () => {
    const longText = 'a'.repeat(220)
    const generate = makeSlugMetadata(
      async () => ({ title: 'Example Page', content: { text: longText } }),
      (doc) => doc.content,
    )

    const metadata = await generate({ params: Promise.resolve({ slug: 'example' }) })
    expect(metadata.title).toBe('Example Page - Rotary Club of Downtown Lock Haven')
    expect(metadata.description).toBe('a'.repeat(160))
  })
})


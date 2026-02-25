import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageLayoutRenderer } from '@/components/pages/PageLayoutRenderer'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'
import type { Page } from '@/payload-types'

const reserved = new Set([
  'about',
  'officers',
  'projects',
  'events',
  'announcements',
  'documents',
  'scholarships',
  'members',
  'account',
  'join',
  'contact',
  'login',
  'donate',
])

const toDescription = (value: string): string | undefined => {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized ? normalized.slice(0, 160) : undefined
}

const getLayoutDescription = (page: Page): string => {
  if (!Array.isArray(page.layout)) return ''

  for (const block of page.layout) {
    switch (block.blockType) {
      case 'heroBlock': {
        const text = [block.eyebrow, block.heading, lexicalToPlainText(block.body)]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          .join(' ')
        if (text) return text
        break
      }
      case 'contentBlock': {
        const text = [block.heading, lexicalToPlainText(block.content)]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          .join(' ')
        if (text) return text
        break
      }
      case 'ctaBlock': {
        const text = [block.heading, lexicalToPlainText(block.body)]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          .join(' ')
        if (text) return text
        break
      }
      case 'statsBlock': {
        const statsText = (block.stats || [])
          .map((stat) =>
            [stat.value, stat.label, stat.description]
              .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
              .join(' '),
          )
          .filter((value) => value.length > 0)
          .join(' ')
        const text = [block.heading, statsText]
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
          .join(' ')
        if (text) return text
        break
      }
      default:
        break
    }
  }

  return ''
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (reserved.has(slug)) return {}
  const page = await getPageBySlug(slug)
  if (!page) return {}
  const description = toDescription(lexicalToPlainText(page.content)) || toDescription(getLayoutDescription(page))

  return {
    title: `${page.title} - Rotary Club of Downtown Lock Haven`,
    description,
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (reserved.has(slug)) {
    notFound()
  }

  const { user } = await getCurrentUser()
  const page = await getPageBySlug(slug, user)

  if (!page) {
    notFound()
  }

  if (Array.isArray(page.layout) && page.layout.length > 0) {
    return <PageLayoutRenderer page={page} user={user} />
  }

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      {page.content ? <RichText className="prose max-w-none" data={page.content as SerializedEditorState} /> : null}
    </article>
  )
}

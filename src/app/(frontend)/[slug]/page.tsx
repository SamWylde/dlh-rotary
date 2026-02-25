import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (reserved.has(slug)) return {}
  const page = await getPageBySlug(slug)
  if (!page) return {}
  const description = lexicalToPlainText(page.content).slice(0, 160) || undefined
  return {
    title: `${page.title} — Rotary Club of Downtown Lock Haven`,
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

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      <p>{lexicalToPlainText(page.content)}</p>
    </article>
  )
}

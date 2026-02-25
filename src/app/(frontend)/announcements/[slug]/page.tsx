import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getAnnouncementBySlug } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'
import { lexicalToPlainText } from '@/lib/richText'

export const generateMetadata = makeSlugMetadata(getAnnouncementBySlug, (a) => a.content)

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const announcement = await getAnnouncementBySlug(slug, user)

  if (!announcement) {
    notFound()
  }

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{announcement.title}</h1>
      <p className="text-sm text-muted-foreground">
        {new Date(announcement.publishedDate).toLocaleDateString('en-US')} - {announcement.priority}
      </p>
      <p>{lexicalToPlainText(announcement.content)}</p>
    </article>
  )
}
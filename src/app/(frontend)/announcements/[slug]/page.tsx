import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { getAnnouncementBySlug } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'

export const generateMetadata = makeSlugMetadata(getAnnouncementBySlug, (a) => a.content)

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const announcement = await getAnnouncementBySlug(slug, user)

  if (!announcement) {
    notFound()
  }

  const dateStr = new Date(announcement.publishedDate).toLocaleDateString('en-US', { dateStyle: 'medium' })

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title={announcement.title} subtitle={dateStr} />
      <section
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {announcement.content && (
          <div
            className="prose max-w-none"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-foreground)',
            }}
          >
            <RichText data={announcement.content as SerializedEditorState} />
          </div>
        )}
      </section>
    </div>
  )
}

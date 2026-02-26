import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { PageLayoutRenderer } from '@/components/pages/PageLayoutRenderer'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Us | Rotary Club of Downtown Lock Haven',
}

export default async function AboutPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('about', user)

  if (page && Array.isArray(page.layout) && page.layout.length > 0) {
    return <PageLayoutRenderer page={page} user={user} />
  }

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{page?.title ?? 'About Our Club'}</h1>
      {page?.content ? (
        <RichText className="prose max-w-none" data={page.content as SerializedEditorState} />
      ) : (
        <p>
          The Rotary Club of Downtown Lock Haven serves Clinton County through local projects, scholarships,
          and partnerships with community organizations.
        </p>
      )}
    </article>
  )
}

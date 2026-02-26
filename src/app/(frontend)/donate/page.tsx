import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Support Us | Rotary Club of Downtown Lock Haven',
}

export default async function DonatePage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('donate', user)

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{page?.title ?? 'Support Us'}</h1>
      {page?.content ? (
        <RichText className="prose max-w-none" data={page.content as SerializedEditorState} />
      ) : (
        <p>Support local scholarships and service projects. Contact dlhrotary@gmail.com for more information.</p>
      )}
    </article>
  )
}

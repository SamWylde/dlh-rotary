import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { InterestForm } from '@/components/forms/InterestForm'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Join Us | Rotary Club of Downtown Lock Haven',
}

export default async function JoinPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('join', user)

  return (
    <section className="grid gap-6">
      <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
        <h1 className="text-3xl font-semibold">{page?.title ?? 'Join Us'}</h1>
        {page?.content ? (
          <RichText className="prose max-w-none" data={page.content as SerializedEditorState} />
        ) : (
          <p>
            All are welcome to join us for fun, fellowship, and guest speakers. Use the contact form to express interest,
            and an officer will follow up.
          </p>
        )}
      </article>
      <InterestForm user={user} />
    </section>
  )
}

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Scholarships | Rotary Club of Downtown Lock Haven',
}

export default async function ScholarshipsPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('scholarships', user)

  if (page?.content) {
    return (
      <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
        <h1 className="text-3xl font-semibold">{page.title}</h1>
        <RichText className="prose max-w-none" data={page.content as SerializedEditorState} />
      </article>
    )
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Scholarships</h1>
      <p>
        The club awards three named scholarships annually for Central Mountain High School seniors.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Eleanor E. J. Kodish Memorial Scholarship ($2,000)</li>
        <li>Dr. Betty Baird Schantz Memorial Scholarship ($2,000)</li>
        <li>Roberta M. Way Memorial Scholarship ($1,500)</li>
      </ul>
      <p>
        Interested in supporting scholarship funding? Visit the <Link className="underline" href="/donate">Donate page</Link>.
      </p>
    </section>
  )
}

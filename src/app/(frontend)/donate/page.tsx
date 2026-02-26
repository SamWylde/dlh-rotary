import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Support Us | Rotary Club of Downtown Lock Haven',
}

export default async function DonatePage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('donate', user)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Support Us" subtitle="Help fund scholarships and community projects" />
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {page?.content ? (
          <div
            className="prose max-w-none"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-foreground)',
            }}
          >
            <RichText data={page.content as SerializedEditorState} />
          </div>
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Support local scholarships and service projects. Contact dlhrotary@gmail.com for more information.
          </p>
        )}
      </section>
    </div>
  )
}

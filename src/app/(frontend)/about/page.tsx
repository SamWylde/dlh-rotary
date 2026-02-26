import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { PageHero } from '@/components/layout/PageHero'
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
    <div className="-mt-8 -mb-8">
      <PageHero title="About Our Club" subtitle="Service Above Self since 2003" />
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
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
            }}
          >
            The Rotary Club of Downtown Lock Haven serves Clinton County through local projects, scholarships,
            and partnerships with community organizations.
          </p>
        )}
      </section>
    </div>
  )
}

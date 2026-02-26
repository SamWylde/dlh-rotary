import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Scholarships | Rotary Club of Downtown Lock Haven',
}

export default async function ScholarshipsPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('scholarships', user)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Scholarships" subtitle="$5,500 awarded annually to Central Mountain HS seniors" />
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
          <div style={{ fontFamily: 'var(--font-body)' }}>
            <p style={{ marginBottom: '16px', color: 'var(--color-muted-foreground)' }}>
              The club awards three named scholarships annually for Central Mountain High School seniors.
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--color-muted-foreground)' }}>
              <li>Eleanor E. J. Kodish Memorial Scholarship ($2,000)</li>
              <li>Dr. Betty Baird Schantz Memorial Scholarship ($2,000)</li>
              <li>Roberta M. Way Memorial Scholarship ($1,500)</li>
            </ul>
            <p style={{ marginTop: '16px', color: 'var(--color-muted-foreground)' }}>
              Interested in supporting scholarship funding? Visit the{' '}
              <Link style={{ color: 'var(--color-primary)', textDecoration: 'underline' }} href="/donate">
                Donate page
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

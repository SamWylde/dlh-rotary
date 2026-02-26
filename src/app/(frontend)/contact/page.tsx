import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact | Rotary Club of Downtown Lock Haven',
}

export default async function ContactPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('contact', user)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Get in Touch" subtitle="We'd love to hear from you" />
      <section
        style={{
          maxWidth: '700px',
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
              marginBottom: '40px',
            }}
          >
            <RichText data={page.content as SerializedEditorState} />
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted-foreground)',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            <p>Email: dlhrotary@gmail.com</p>
            <p>PO Box 634, Lock Haven, PA 17745</p>
          </div>
        )}
        <div
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '32px',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '20px',
            }}
          >
            Send a Message
          </h2>
          <ContactForm user={user} />
        </div>
      </section>
    </div>
  )
}

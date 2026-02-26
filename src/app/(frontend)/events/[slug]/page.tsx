import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RSVPControls } from '@/components/events/RSVPControls'
import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { getEventBySlug, getEventRSVPStatus } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'

export const generateMetadata = makeSlugMetadata(getEventBySlug, (e) => e.description)

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const event = await getEventBySlug(slug, user)

  if (!event) {
    notFound()
  }

  const existingStatus = await getEventRSVPStatus(event.id, user)
  const dateStr = new Date(event.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title={event.title} subtitle={dateStr} />
      <section
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {event.location && (
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {event.location}
          </p>
        )}

        {event.description && (
          <div
            className="prose max-w-none"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-foreground)',
              marginBottom: '32px',
            }}
          >
            <RichText data={event.description as SerializedEditorState} />
          </div>
        )}

        {event.enableRSVP ? (
          user ? (
            <RSVPControls eventID={event.id} initialStatus={existingStatus} />
          ) : (
            <p
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-muted-foreground)',
              }}
            >
              <Link style={{ color: 'var(--color-primary)', textDecoration: 'underline' }} href="/login">
                Sign in
              </Link>{' '}
              to RSVP.
            </p>
          )
        ) : null}
      </section>
    </div>
  )
}

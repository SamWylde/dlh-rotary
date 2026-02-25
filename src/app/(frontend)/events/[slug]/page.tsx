import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RSVPControls } from '@/components/events/RSVPControls'
import { getCurrentUser } from '@/lib/auth'
import { getEventBySlug } from '@/lib/content'
import { getPayloadClient } from '@/lib/payload'
import { lexicalToPlainText } from '@/lib/richText'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}
  const description = lexicalToPlainText(event.description).slice(0, 160) || undefined
  return {
    title: `${event.title} - Rotary Club of Downtown Lock Haven`,
    description,
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const event = await getEventBySlug(slug, user)

  if (!event) {
    notFound()
  }

  let existingStatus: 'yes' | 'no' | 'maybe' | null = null

  if (user) {
    const payload = await getPayloadClient()

    const existing = await payload.find({
      collection: 'rsvps',
      where: {
        and: [
          { event: { equals: event.id } },
          { user: { equals: user.id } },
        ],
      },
      limit: 1,
      overrideAccess: false,
      user,
    })

    existingStatus = (existing.docs[0]?.status as 'yes' | 'no' | 'maybe' | undefined) || null
  }

  return (
    <article className="grid gap-6 rounded-lg border border-border bg-card p-6">
      <header className="grid gap-2">
        <h1 className="text-3xl font-semibold">{event.title}</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(event.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
        {event.location ? <p className="text-sm">{event.location}</p> : null}
      </header>

      {event.description ? <p>{lexicalToPlainText(event.description)}</p> : null}

      {event.enableRSVP ? (
        user ? (
          <RSVPControls eventID={event.id} initialStatus={existingStatus} />
        ) : (
          <p className="text-sm">
            <Link className="underline" href="/login">
              Sign in
            </Link>{' '}
            to RSVP.
          </p>
        )
      ) : null}
    </article>
  )
}
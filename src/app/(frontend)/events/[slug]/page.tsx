import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RSVPControls } from '@/components/events/RSVPControls'
import { getCurrentUser } from '@/lib/auth'
import { getEventBySlug, getEventRSVPStatus } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'
import { lexicalToPlainText } from '@/lib/richText'

export const generateMetadata = makeSlugMetadata(getEventBySlug, (e) => e.description)

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const event = await getEventBySlug(slug, user)

  if (!event) {
    notFound()
  }

  const existingStatus = await getEventRSVPStatus(event.id, user)

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

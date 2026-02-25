import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { getEvents } from '@/lib/content'

export default async function EventsPage() {
  const { user } = await getCurrentUser()
  const events = await getEvents(user)

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Events</h1>
        <Link className="underline" href="/events/calendar">
          Calendar View
        </Link>
      </div>
      <div className="grid gap-3">
        {events.docs.map((event) => (
          <Link
            className="rounded-lg border border-border bg-card p-4 hover:border-primary"
            href={`/events/${event.slug}`}
            key={event.id}
          >
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
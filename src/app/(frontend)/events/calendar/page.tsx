import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { getEvents } from '@/lib/content'

export default async function EventsCalendarPage() {
  const { user } = await getCurrentUser()
  const events = await getEvents(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Events Calendar (Month/Week can be added)</h1>
      <p className="text-sm text-muted-foreground">
        DayPilot Lite package is installed. This MVP uses a date-sorted list until the interactive calendar is wired.
      </p>
      <div className="grid gap-2">
        {events.docs.map((event) => (
          <Link className="rounded border border-border bg-card p-3" href={`/events/${event.slug}`} key={event.id}>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleString('en-US')}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
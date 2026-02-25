import { EventCalendar, type EventCalendarEvent } from '@/components/events/EventCalendar'

import { getCurrentUser } from '@/lib/auth'
import { getEvents } from '@/lib/content'

export default async function EventsCalendarPage() {
  const { user } = await getCurrentUser()
  const events = await getEvents(user)
  const calendarEvents = events.docs
    .map<EventCalendarEvent | null>((event) => {
      const start = new Date(event.date)

      if (Number.isNaN(start.getTime())) {
        return null
      }

      const explicitEnd = event.endDate ? new Date(event.endDate) : null
      const end =
        explicitEnd && !Number.isNaN(explicitEnd.getTime()) ? explicitEnd : new Date(start.getTime() + 60 * 60 * 1000)

      return {
        id: event.id,
        text: event.title,
        start: start.toISOString(),
        end: end.toISOString(),
        slug: event.slug,
        eventType: event.eventType,
      }
    })
    .filter((event): event is EventCalendarEvent => Boolean(event))

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Events Calendar</h1>
      <p className="text-sm text-muted-foreground">Browse upcoming and past club events in a monthly calendar view.</p>
      {calendarEvents.length > 0 ? (
        <EventCalendar events={calendarEvents} />
      ) : (
        <p className="rounded border border-border bg-card p-4 text-sm text-muted-foreground">
          No events are currently available.
        </p>
      )}
    </section>
  )
}

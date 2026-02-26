import { EventCalendar, type EventCalendarEvent } from '@/components/events/EventCalendar'
import { PageHero } from '@/components/layout/PageHero'
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
    <div className="-mt-8 -mb-8">
      <PageHero title="Events Calendar" subtitle="Browse upcoming and past club events" />
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {calendarEvents.length > 0 ? (
          <EventCalendar events={calendarEvents} />
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No events are currently available.
          </p>
        )}
      </section>
    </div>
  )
}

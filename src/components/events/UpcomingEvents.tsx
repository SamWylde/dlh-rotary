import Link from 'next/link'

import type { Event } from '@/payload-types'

import { EventCard } from './EventCard'

export type UpcomingEventsProps = {
  events: Array<Pick<Event, 'id' | 'slug' | 'title' | 'date'>>
  heading?: string
  emptyMessage?: string
  viewAllHref?: string
}

export const UpcomingEvents = ({
  events,
  heading = 'Upcoming Events',
  emptyMessage = 'No events posted yet.',
  viewAllHref,
}: UpcomingEventsProps) => {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        {viewAllHref ? (
          <Link className="text-sm underline" href={viewAllHref}>
            View all
          </Link>
        ) : null}
      </div>
      {events.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid gap-3">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      )}
    </section>
  )
}

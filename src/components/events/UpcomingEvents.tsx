import Link from 'next/link'

import type { Event } from '@/payload-types'

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
    <section>
      <h2
        style={{
          fontSize: 'var(--section-ea-heading-size, 22px)',
          color: 'var(--color-primary)',
          borderBottom: 'var(--border-section-heading-width, 2px) solid var(--color-secondary)',
          paddingBottom: 'var(--section-ea-heading-pb, 8px)',
          display: 'inline-block',
          marginBottom: 'var(--section-ea-heading-mb, 20px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {heading}
      </h2>
      {events.length === 0 ? (
        <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>{emptyMessage}</p>
      ) : (
        <div>
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              style={{
                display: 'flex',
                gap: 'var(--event-row-gap, 14px)',
                padding: 'var(--event-row-padding, 14px) 0',
                borderBottom: '1px solid var(--color-border)',
                alignItems: 'flex-start',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 'var(--event-icon-size, 24px)', lineHeight: 1 }}>📅</span>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--event-title-size, 14px)',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {event.title}
                </p>
                <p
                  style={{
                    fontSize: 'var(--event-date-size, 13px)',
                    color: 'var(--color-text-light)',
                    fontFamily: 'var(--font-body)',
                    marginTop: '2px',
                    margin: '2px 0 0',
                  }}
                >
                  {new Date(event.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          style={{
            display: 'inline-block',
            marginTop: '12px',
            fontSize: '13px',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          View all events
        </Link>
      ) : null}
    </section>
  )
}

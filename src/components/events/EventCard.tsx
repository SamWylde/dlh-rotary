import Link from 'next/link'

import type { Event } from '@/payload-types'
import { formatClubDate } from '@/lib/dateFormat'

export type EventCardProps = {
  event: Pick<Event, 'id' | 'slug' | 'title' | 'date'>
  className?: string
}

export const EventCard = ({ event, className }: EventCardProps) => {
  const classes = className || 'rounded-lg border border-border bg-card p-4 hover:border-primary'

  return (
    <Link className={classes} href={`/events/${event.slug}`}>
      <p className="font-medium">{event.title}</p>
      <p className="text-sm text-muted-foreground">
        {formatClubDate(event.date, { dateStyle: 'medium', timeStyle: 'short' })}
      </p>
    </Link>
  )
}

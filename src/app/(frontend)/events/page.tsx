import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { EventCard } from '@/components/events/EventCard'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getEventsPage } from '@/lib/content'
import { parsePageParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

export const metadata: Metadata = {
  title: 'Events | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 12

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const { user } = await getCurrentUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const events = await getEventsPage({ page, limit: PER_PAGE }, user)
  const redirectHref = getOutOfRangeRedirectHref('/events', page, events)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, events)

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Events</h1>
        <Link className="underline" href="/events/calendar">
          Calendar View
        </Link>
      </div>
      {events.docs.length === 0 ? (
        <p className="text-muted-foreground">No events yet.</p>
      ) : (
        <div className="grid gap-3">
          {events.docs.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      )}
      <PaginationControls basePath="/events" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

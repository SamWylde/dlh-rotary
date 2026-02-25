import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getEventsPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'

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
  const currentPage = events.page ?? page
  const totalPages = events.totalPages ?? 1

  if (events.totalPages && page > events.totalPages) {
    redirect(buildPageHref('/events', events.totalPages))
  }

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
      )}
      <PaginationControls basePath="/events" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

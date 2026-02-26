import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { EventCard } from '@/components/events/EventCard'
import { PageHero } from '@/components/layout/PageHero'
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
    <div className="-mt-8 -mb-8">
      <PageHero title="Events" subtitle="Meetings, service projects, and community gatherings" />
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link
            href="/events/calendar"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Calendar View
          </Link>
        </div>
        {events.docs.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No events yet.
          </p>
        ) : (
          <div className="grid gap-3">
            {events.docs.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
        <div style={{ marginTop: '32px' }}>
          <PaginationControls basePath="/events" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}

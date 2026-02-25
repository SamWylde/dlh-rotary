import Link from 'next/link'
import { Suspense } from 'react'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { getCurrentUser } from '@/lib/auth'
import { getRecentAnnouncements, getUpcomingEvents } from '@/lib/content'

const SectionSkeleton = () => (
  <div className="grid gap-4">
    <div className="h-8 w-48 animate-pulse rounded bg-muted" />
    <div className="grid gap-3">
      {[1, 2, 3].map((i) => (
        <div className="h-20 animate-pulse rounded-lg border border-border bg-muted" key={i} />
      ))}
    </div>
  </div>
)

async function UpcomingEventsSection() {
  const { user } = await getCurrentUser()
  const events = await getUpcomingEvents(5, user)
  return <UpcomingEvents events={events.docs} viewAllHref="/events" />
}

async function LatestAnnouncementsSection() {
  const { user } = await getCurrentUser()
  const announcements = await getRecentAnnouncements(3, user)
  return <LatestAnnouncements announcements={announcements.docs} viewAllHref="/announcements" />
}

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="rounded-xl border border-border bg-card p-8">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Service Above Self</p>
        <h1 className="mt-2 text-4xl font-semibold">Rotary Club of Downtown Lock Haven</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Community projects, scholarships, and weekly fellowship in Clinton County.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded bg-primary px-4 py-2 text-primary-foreground" href="/join">
            Join Us
          </Link>
          <Link className="rounded border border-border px-4 py-2" href="/projects">
            View Projects
          </Link>
        </div>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <UpcomingEventsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <LatestAnnouncementsSection />
      </Suspense>
    </div>
  )
}

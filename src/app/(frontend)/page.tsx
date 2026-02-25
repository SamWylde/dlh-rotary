import Link from 'next/link'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { getCurrentUser } from '@/lib/auth'
import { getRecentAnnouncements, getUpcomingEvents } from '@/lib/content'

export default async function HomePage() {
  const { user } = await getCurrentUser()
  const [events, announcements] = await Promise.all([
    getUpcomingEvents(5, user),
    getRecentAnnouncements(3, user),
  ])

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

      <UpcomingEvents events={events.docs} viewAllHref="/events" />
      <LatestAnnouncements announcements={announcements.docs} viewAllHref="/announcements" />
    </div>
  )
}

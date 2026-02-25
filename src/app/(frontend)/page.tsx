import Link from 'next/link'

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

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Link className="text-sm underline" href="/events">
            View all
          </Link>
        </div>
        <div className="grid gap-3">
          {events.docs.length === 0 ? (
            <p className="text-muted-foreground">No events posted yet.</p>
          ) : (
            events.docs.map((event) => (
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
            ))
          )}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Announcements</h2>
          <Link className="text-sm underline" href="/announcements">
            View all
          </Link>
        </div>
        <div className="grid gap-3">
          {announcements.docs.length === 0 ? (
            <p className="text-muted-foreground">No announcements yet.</p>
          ) : (
            announcements.docs.map((announcement) => (
              <Link
                className="rounded-lg border border-border bg-card p-4 hover:border-primary"
                href={`/announcements/${announcement.slug}`}
                key={announcement.id}
              >
                <p className="font-medium">{announcement.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(announcement.publishedDate).toLocaleDateString('en-US')}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
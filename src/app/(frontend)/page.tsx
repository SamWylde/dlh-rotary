import Link from 'next/link'
import { Suspense } from 'react'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { FacebookFeed } from '@/components/layout/FacebookFeed'
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
      {/* Hero */}
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
          <Link className="rounded border border-border px-4 py-2 hover:bg-muted" href="/projects">
            View Projects
          </Link>
        </div>
      </section>

      {/* Meeting Callout */}
      <div className="rounded-xl bg-primary px-6 py-4 text-primary-foreground">
        <p className="font-medium">📍 We meet every Tuesday at 5:30 PM (social time at 5:15)</p>
        <p className="mt-0.5 text-sm opacity-80">Poorman Gallery, 352 E. Water Street, Lock Haven, PA</p>
      </div>

      {/* About Blurb */}
      <section className="rounded-xl border border-border bg-card px-6 py-5">
        <p className="text-muted-foreground">
          The Rotary Club of Downtown Lock Haven has been serving Clinton County for over 22 years. We&apos;re
          neighbors, friends, and community leaders who come together each week to create positive, lasting change
          — locally and around the world. All are welcome.
        </p>
        <Link
          className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          href="/about"
        >
          Learn More →
        </Link>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <UpcomingEventsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <LatestAnnouncementsSection />
      </Suspense>

      {/* Facebook Feed */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Follow Us on Facebook</h2>
        <FacebookFeed />
      </section>
    </div>
  )
}

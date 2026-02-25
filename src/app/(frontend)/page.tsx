import { Suspense } from 'react'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeProjectsGrid } from '@/components/home/HomeProjectsGrid'
import { MeetingCalloutBar } from '@/components/home/MeetingCalloutBar'
import { ProjectsSkeleton, SectionSkeleton } from '@/components/home/Skeletons'
import { StayConnectedSection } from '@/components/home/StayConnectedSection'
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection'
import { getCurrentUser } from '@/lib/auth'
import { getProjects, getRecentAnnouncements, getUpcomingEvents } from '@/lib/content'

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

async function ProjectsSection() {
  const { user } = await getCurrentUser()
  const projects = await getProjects(user)
  const featured = projects.docs.slice(0, 6)
  return <HomeProjectsGrid projects={featured} />
}

export default function HomePage() {
  return (
    <div className="-mt-8 -mb-8">
      <HomeHero />
      <MeetingCalloutBar />
      <WhoWeAreSection />

      <section className="pb-12">
        <div className="grid gap-8 md:grid-cols-2">
          <Suspense fallback={<SectionSkeleton />}>
            <UpcomingEventsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LatestAnnouncementsSection />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <StayConnectedSection />
    </div>
  )
}


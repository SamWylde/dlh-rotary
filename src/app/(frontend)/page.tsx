import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { FlagsOfHonorCampaignPopup } from '@/components/home/FlagsOfHonorCampaignPopup'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeProjectsGrid } from '@/components/home/HomeProjectsGrid'
import { MeetingCalloutBar } from '@/components/home/MeetingCalloutBar'
import { StayConnectedSection } from '@/components/home/StayConnectedSection'
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection'
import { getCurrentUser } from '@/lib/auth'
import { getProjects, getRecentAnnouncements, getUpcomingEvents } from '@/lib/content'

const getHomeContent = async () => {
  try {
    const { user } = await getCurrentUser()
    const [events, announcements, projects] = await Promise.all([
      getUpcomingEvents(5, user),
      getRecentAnnouncements(3, user),
      getProjects(user),
    ])

    return {
      announcements: announcements.docs,
      events: events.docs,
      projects: projects.docs.slice(0, 6),
    }
  } catch (error) {
    console.error('Failed to load homepage content:', error)

    return {
      announcements: [],
      events: [],
      projects: [],
    }
  }
}

export default async function HomePage() {
  const { announcements, events, projects } = await getHomeContent()

  return (
    <div className="-mt-8 -mb-8">
      <FlagsOfHonorCampaignPopup />
      <HomeHero />
      <MeetingCalloutBar />
      <WhoWeAreSection />

      {/* Events + Announcements side by side */}
      <section
        style={{
          maxWidth: 'var(--section-ea-max-width, 1000px)',
          margin: '0 auto',
          padding:
            'var(--section-ea-padding-top, 20px) 40px var(--section-ea-padding-bottom, 56px)',
        }}
      >
        <div className="grid md:grid-cols-2" style={{ gap: 'var(--section-ea-grid-gap, 32px)' }}>
          <UpcomingEvents events={events} viewAllHref="/events" />
          <LatestAnnouncements announcements={announcements} viewAllHref="/announcements" />
        </div>
      </section>

      <HomeProjectsGrid projects={projects} />

      <StayConnectedSection />
    </div>
  )
}

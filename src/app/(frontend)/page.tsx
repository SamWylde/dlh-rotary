import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { FlagsOfHonorCampaignPopup } from '@/components/home/FlagsOfHonorCampaignPopup'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeProjectsGrid } from '@/components/home/HomeProjectsGrid'
import { MeetingCalloutBar } from '@/components/home/MeetingCalloutBar'
import { StayConnectedSection } from '@/components/home/StayConnectedSection'
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection'
import { getCurrentUser } from '@/lib/auth'
import { getProjects, getUpcomingEvents } from '@/lib/content'

const getHomeContent = async () => {
  try {
    const { user } = await getCurrentUser()
    const [events, projects] = await Promise.all([getUpcomingEvents(5, user), getProjects(user)])

    return {
      events: events.docs,
      projects: projects.docs.slice(0, 6),
    }
  } catch (error) {
    console.error('Failed to load homepage content:', error)

    return {
      events: [],
      projects: [],
    }
  }
}

export default async function HomePage() {
  const { events, projects } = await getHomeContent()

  return (
    <div className="-mt-8 -mb-8">
      <FlagsOfHonorCampaignPopup />
      <HomeHero />
      <MeetingCalloutBar />
      <WhoWeAreSection />

      <section
        style={{
          maxWidth: 'var(--section-ea-max-width, 760px)',
          margin: '0 auto',
          padding:
            'var(--section-ea-padding-top, 20px) 40px var(--section-ea-padding-bottom, 56px)',
        }}
      >
        <UpcomingEvents
          emptyMessage="No upcoming dates posted yet."
          events={events}
          heading="Upcoming Dates"
          viewAllHref="/events"
        />
      </section>

      <HomeProjectsGrid projects={projects} />

      <StayConnectedSection />
    </div>
  )
}

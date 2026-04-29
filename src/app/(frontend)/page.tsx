import { FlagsOfHonorCampaignPopup } from '@/components/home/FlagsOfHonorCampaignPopup'
import { HomeDatesSection } from '@/components/home/HomeDatesSection'
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
    const [events, projects] = await Promise.all([getUpcomingEvents(6, user), getProjects(user)])

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
      <HomeDatesSection events={events} />

      <HomeProjectsGrid projects={projects} />

      <StayConnectedSection />
    </div>
  )
}

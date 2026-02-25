import Link from 'next/link'

import type { Announcement } from '@/payload-types'

import { AnnouncementCard } from './AnnouncementCard'

export type LatestAnnouncementsProps = {
  announcements: Array<Pick<Announcement, 'id' | 'slug' | 'title' | 'publishedDate' | 'priority'>>
  heading?: string
  emptyMessage?: string
  viewAllHref?: string
  showPriority?: boolean
}

export const LatestAnnouncements = ({
  announcements,
  heading = 'Latest Announcements',
  emptyMessage = 'No announcements yet.',
  viewAllHref,
  showPriority = false,
}: LatestAnnouncementsProps) => {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        {viewAllHref ? (
          <Link className="text-sm underline" href={viewAllHref}>
            View all
          </Link>
        ) : null}
      </div>
      {announcements.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid gap-3">
          {announcements.map((announcement) => (
            <AnnouncementCard
              announcement={announcement}
              key={announcement.id}
              showPriority={showPriority}
            />
          ))}
        </div>
      )}
    </section>
  )
}

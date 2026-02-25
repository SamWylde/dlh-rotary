import Link from 'next/link'

import type { Announcement } from '@/payload-types'

export type AnnouncementCardProps = {
  announcement: Pick<Announcement, 'id' | 'slug' | 'title' | 'publishedDate' | 'priority'>
  className?: string
  showPriority?: boolean
}

export const AnnouncementCard = ({
  announcement,
  className,
  showPriority = false,
}: AnnouncementCardProps) => {
  const classes = className || 'rounded-lg border border-border bg-card p-4 hover:border-primary'

  return (
    <Link className={classes} href={`/announcements/${announcement.slug}`}>
      <p className="font-medium">{announcement.title}</p>
      <p className="text-sm text-muted-foreground">
        {new Date(announcement.publishedDate).toLocaleDateString('en-US')}
      </p>
      {showPriority && announcement.priority ? (
        <p className="text-sm">Priority: {announcement.priority}</p>
      ) : null}
    </Link>
  )
}

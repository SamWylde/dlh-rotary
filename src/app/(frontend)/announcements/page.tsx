import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { getRecentAnnouncements } from '@/lib/content'

export default async function AnnouncementsPage() {
  const { user } = await getCurrentUser()
  const announcements = await getRecentAnnouncements(200, user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Announcements</h1>
      <div className="grid gap-3">
        {announcements.docs.map((announcement) => (
          <Link
            className="rounded-lg border border-border bg-card p-4 hover:border-primary"
            href={`/announcements/${announcement.slug}`}
            key={announcement.id}
          >
            <p className="font-medium">{announcement.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(announcement.publishedDate).toLocaleDateString('en-US')}
            </p>
            <p className="text-sm">Priority: {announcement.priority}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
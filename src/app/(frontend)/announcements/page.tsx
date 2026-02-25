import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AnnouncementCard } from '@/components/announcements/AnnouncementCard'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getAnnouncementsPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'

export const metadata: Metadata = {
  title: 'Announcements | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 12

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const { user } = await getCurrentUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const announcements = await getAnnouncementsPage({ page, limit: PER_PAGE }, user)
  const currentPage = announcements.page ?? page
  const totalPages = announcements.totalPages ?? 1

  if (announcements.totalPages && page > announcements.totalPages) {
    redirect(buildPageHref('/announcements', announcements.totalPages))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Announcements</h1>
      {announcements.docs.length === 0 ? (
        <p className="text-muted-foreground">No announcements yet.</p>
      ) : (
        <div className="grid gap-3">
          {announcements.docs.map((announcement) => (
            <AnnouncementCard announcement={announcement} key={announcement.id} />
          ))}
        </div>
      )}
      <PaginationControls
        basePath="/announcements"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  )
}

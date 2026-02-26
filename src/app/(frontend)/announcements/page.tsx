import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AnnouncementCard } from '@/components/announcements/AnnouncementCard'
import { PageHero } from '@/components/layout/PageHero'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getAnnouncementsPage } from '@/lib/content'
import { parsePageParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

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
  const redirectHref = getOutOfRangeRedirectHref('/announcements', page, announcements)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, announcements)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Announcements" subtitle="News and updates from the club" />
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {announcements.docs.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No announcements yet.
          </p>
        ) : (
          <div className="grid gap-3">
            {announcements.docs.map((announcement) => (
              <AnnouncementCard announcement={announcement} key={announcement.id} />
            ))}
          </div>
        )}
        <div style={{ marginTop: '32px' }}>
          <PaginationControls basePath="/announcements" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}

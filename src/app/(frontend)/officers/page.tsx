import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getOfficersPage } from '@/lib/content'
import { parsePageParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

export const metadata: Metadata = {
  title: 'Officers | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20

export default async function OfficersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const { user } = await getCurrentUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const officers = await getOfficersPage({ page, limit: PER_PAGE }, user)
  const redirectHref = getOutOfRangeRedirectHref('/officers', page, officers)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, officers)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Current Officers" subtitle="2025-26 leadership team" />
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {officers.docs.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No officers listed yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {officers.docs.map((officer) => (
              <div
                key={officer.id}
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {officer.fullName}
                </p>
                {officer.title && (
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      marginTop: '4px',
                    }}
                  >
                    {officer.title}
                  </p>
                )}
                {user && officer.email && (
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      marginTop: '8px',
                    }}
                  >
                    {officer.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: '32px' }}>
          <PaginationControls basePath="/officers" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}

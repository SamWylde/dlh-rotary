import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { USER_ROLES } from '@/constants/roles'
import { MemberDirectory } from '@/components/members/MemberDirectory'
import { requireUser } from '@/lib/auth'
import { getMembersPage } from '@/lib/content'
import { parseEnumParam, parsePageParam, parseStringParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

export const metadata: Metadata = {
  title: 'Member Directory | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[]; role?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam, q: qParam, role: roleParam } = await searchParams
  const page = parsePageParam(pageParam)
  const q = parseStringParam(qParam)
  const role = parseEnumParam(roleParam, USER_ROLES)
  const query = {
    q,
    role,
  }

  const members = await getMembersPage({ page, limit: PER_PAGE, q, role }, user)
  const redirectHref = getOutOfRangeRedirectHref('/members', page, members, query)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, members)

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Member Directory" />
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        <MemberDirectory members={members.docs} query={q} role={role} />
        <div style={{ marginTop: '32px' }}>
          <PaginationControls basePath="/members" currentPage={currentPage} totalPages={totalPages} query={query} />
        </div>
      </section>
    </div>
  )
}

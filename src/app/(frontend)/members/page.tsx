import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { MemberDirectory } from '@/components/members/MemberDirectory'
import { requireUser } from '@/lib/auth'
import { getMembersPage } from '@/lib/content'
import { buildPageHref, parseEnumParam, parsePageParam, parseStringParam } from '@/lib/pagination'
import type { User } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Member Directory | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20
const MEMBER_ROLES = ['admin', 'officer', 'member'] as const
type MemberRole = (typeof MEMBER_ROLES)[number]

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[]; role?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam, q: qParam, role: roleParam } = await searchParams
  const page = parsePageParam(pageParam)
  const q = parseStringParam(qParam)
  const role = parseEnumParam(roleParam, MEMBER_ROLES) as MemberRole | undefined
  const query = {
    q,
    role,
  }

  const members = await getMembersPage({ page, limit: PER_PAGE, q, role: role as User['role'] | undefined }, user)
  const currentPage = members.page ?? page
  const totalPages = members.totalPages ?? 1

  if (members.totalPages && page > members.totalPages) {
    redirect(buildPageHref('/members', members.totalPages, query))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Member Directory</h1>
      <MemberDirectory members={members.docs} query={q} role={role} />
      <PaginationControls basePath="/members" currentPage={currentPage} totalPages={totalPages} query={query} />
    </section>
  )
}

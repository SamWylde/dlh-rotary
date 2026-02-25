import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { requireUser } from '@/lib/auth'
import { getMembersPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'

export const metadata: Metadata = {
  title: 'Member Directory | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const members = await getMembersPage({ page, limit: PER_PAGE }, user)
  const currentPage = members.page ?? page
  const totalPages = members.totalPages ?? 1

  if (members.totalPages && page > members.totalPages) {
    redirect(buildPageHref('/members', members.totalPages))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Member Directory</h1>
      {members.docs.length === 0 ? (
        <p className="text-muted-foreground">No members in the directory yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {members.docs.map((member) => (
            <article className="rounded-lg border border-border bg-card p-4" key={member.id}>
              <p className="font-medium">{member.fullName}</p>
              {member.title ? <p className="text-sm text-muted-foreground">{member.title}</p> : null}
              {member.email ? <p className="mt-2 text-sm">{member.email}</p> : null}
              {member.phone ? <p className="text-sm">{member.phone}</p> : null}
            </article>
          ))}
        </div>
      )}
      <PaginationControls basePath="/members" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

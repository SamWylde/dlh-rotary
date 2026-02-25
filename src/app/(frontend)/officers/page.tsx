import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getOfficersPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'

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
  const currentPage = officers.page ?? page
  const totalPages = officers.totalPages ?? 1

  if (officers.totalPages && page > officers.totalPages) {
    redirect(buildPageHref('/officers', officers.totalPages))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Current Officers</h1>
      {officers.docs.length === 0 ? (
        <p className="text-muted-foreground">No officers listed yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {officers.docs.map((officer) => (
            <article className="rounded-lg border border-border bg-card p-4" key={officer.id}>
              <h2 className="text-xl font-medium">{officer.fullName}</h2>
              {officer.title ? <p className="text-sm text-muted-foreground">{officer.title}</p> : null}
              {user && officer.email ? <p className="mt-2 text-sm">{officer.email}</p> : null}
              {user && officer.phone ? <p className="text-sm">{officer.phone}</p> : null}
            </article>
          ))}
        </div>
      )}
      <PaginationControls basePath="/officers" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

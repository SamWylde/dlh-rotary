import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getProjectsPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'
import { lexicalToPlainText } from '@/lib/richText'

export const metadata: Metadata = {
  title: 'Projects | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 12

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const { user } = await getCurrentUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const projects = await getProjectsPage({ page, limit: PER_PAGE }, user)
  const currentPage = projects.page ?? page
  const totalPages = projects.totalPages ?? 1

  if (projects.totalPages && page > projects.totalPages) {
    redirect(buildPageHref('/projects', projects.totalPages))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Projects</h1>
      {projects.docs.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {projects.docs.map((project) => (
            <Link
              className="rounded-lg border border-border bg-card p-4 hover:border-primary"
              href={`/projects/${project.slug}`}
              key={project.id}
            >
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-muted-foreground">{project.category}</p>
              <p className="mt-2 text-sm">{lexicalToPlainText(project.description).slice(0, 160)}</p>
            </Link>
          ))}
        </div>
      )}
      <PaginationControls basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

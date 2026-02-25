import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ProjectCard } from '@/components/projects/ProjectCard'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { getCurrentUser } from '@/lib/auth'
import { getProjectsPage } from '@/lib/content'
import { parsePageParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

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
  const redirectHref = getOutOfRangeRedirectHref('/projects', page, projects)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, projects)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Projects</h1>
      {projects.docs.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {projects.docs.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      <PaginationControls basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { ProjectCard } from '@/components/projects/ProjectCard'
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
    <div className="-mt-8 -mb-8">
      <PageHero title="Our Projects" subtitle="Hands-on service in Clinton County and beyond" />
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {projects.docs.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No projects yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.docs.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        <div style={{ marginTop: '32px' }}>
          <PaginationControls basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}

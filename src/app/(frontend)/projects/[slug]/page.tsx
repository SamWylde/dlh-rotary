import { notFound } from 'next/navigation'

import { VolunteerSignup } from '@/components/forms/VolunteerSignup'
import { ImpactStats } from '@/components/projects/ImpactStats'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { getCurrentUser } from '@/lib/auth'
import { getProjectBySlug } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'
import { lexicalToPlainText } from '@/lib/richText'

export const generateMetadata = makeSlugMetadata(getProjectBySlug, (p) => p.description)

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const project = await getProjectBySlug(slug, user)

  if (!project) {
    notFound()
  }

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      {project.category || project.projectStatus ? (
        <p className="text-sm text-muted-foreground">
          {[project.category, project.projectStatus].filter(Boolean).join(' - ')}
        </p>
      ) : null}
      {lexicalToPlainText(project.description) ? (
        <p>{lexicalToPlainText(project.description)}</p>
      ) : null}
      <ImpactStats impactStats={project.impactStats} />
      <ProjectGallery gallery={project.gallery} />
      <VolunteerSignup project={project} user={user} />
    </article>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { VolunteerSignup } from '@/components/forms/VolunteerSignup'
import { ImpactStats } from '@/components/projects/ImpactStats'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { getCurrentUser } from '@/lib/auth'
import { getProjectBySlug } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  const description = lexicalToPlainText(project.description).slice(0, 160) || undefined
  return {
    title: `${project.title} - Rotary Club of Downtown Lock Haven`,
    description,
  }
}

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
      <p className="text-sm text-muted-foreground">
        {project.category} - {project.projectStatus}
      </p>
      <p>{lexicalToPlainText(project.description)}</p>
      <ImpactStats impactStats={project.impactStats} />
      <ProjectGallery gallery={project.gallery} />
      <VolunteerSignup project={project} user={user} />
    </article>
  )
}

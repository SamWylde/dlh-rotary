import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { VolunteerSignup } from '@/components/forms/VolunteerSignup'
import { ImpactStats } from '@/components/projects/ImpactStats'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { getCurrentUser } from '@/lib/auth'
import { getProjectBySlug } from '@/lib/content'
import { makeSlugMetadata } from '@/lib/metadata'

export const generateMetadata = makeSlugMetadata(getProjectBySlug, (p) => p.description)

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { user } = await getCurrentUser()
  const project = await getProjectBySlug(slug, user)

  if (!project) {
    notFound()
  }

  const subtitle = [project.category, project.projectStatus].filter(Boolean).join(' \u00B7 ') || undefined

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title={project.title} subtitle={subtitle} />
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px 40px',
        }}
      >
        {project.description && (
          <div
            className="prose max-w-none"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-foreground)',
              marginBottom: '32px',
            }}
          >
            <RichText data={project.description as SerializedEditorState} />
          </div>
        )}
        <ImpactStats impactStats={project.impactStats} />
        <ProjectGallery gallery={project.gallery} />
        <VolunteerSignup project={project} user={user} />
      </section>
    </div>
  )
}

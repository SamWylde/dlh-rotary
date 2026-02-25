import Link from 'next/link'

import { lexicalToPlainText } from '@/lib/richText'
import type { Project } from '@/payload-types'

export type ProjectCardProps = {
  project: Pick<Project, 'id' | 'slug' | 'title' | 'category' | 'description' | 'projectStatus'>
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      className="rounded-lg border border-border bg-card p-4 hover:border-primary"
      href={`/projects/${project.slug}`}
    >
      <p className="font-medium">{project.title}</p>
      <p className="text-sm text-muted-foreground">
        {project.category} - {project.projectStatus}
      </p>
      <p className="mt-2 text-sm">{lexicalToPlainText(project.description).slice(0, 160)}</p>
    </Link>
  )
}

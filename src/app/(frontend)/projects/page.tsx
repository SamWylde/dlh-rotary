import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { getProjects } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'

export default async function ProjectsPage() {
  const { user } = await getCurrentUser()
  const projects = await getProjects(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Projects</h1>
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
    </section>
  )
}
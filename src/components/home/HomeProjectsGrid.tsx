import Link from 'next/link'

import { lexicalToPlainText } from '@/lib/richText'
import type { Project } from '@/payload-types'

export type HomeProject = Pick<Project, 'id' | 'slug' | 'title' | 'category' | 'description'>

export const HomeProjectsGrid = ({ projects }: { projects: HomeProject[] }) => (
  <div className="full-bleed" style={{ background: 'var(--color-background)' }}>
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
            Our Work
          </p>
          <h2 className="mt-1 text-3xl font-semibold">What We Do</h2>
        </div>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          style={{ color: 'var(--color-primary)' }}
          href="/projects"
        >
          All Projects -&gt;
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group grid gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:border-primary hover:shadow-md"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: 'var(--color-secondary)',
                  color: 'var(--color-secondary-foreground)',
                }}
              >
                {project.title.charAt(0).toUpperCase()}
              </div>
              <p className="font-semibold leading-snug group-hover:text-primary">{project.title}</p>
              {project.category ? (
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-secondary)' }}>
                  {project.category.replace(/-/g, ' ')}
                </p>
              ) : null}
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {lexicalToPlainText(project.description).slice(0, 160)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)


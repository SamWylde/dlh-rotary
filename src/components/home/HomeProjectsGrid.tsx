import Link from 'next/link'

import { lexicalToPlainText } from '@/lib/richText'
import type { Project } from '@/payload-types'

const PROJECT_ICONS_BY_SLUG: Record<string, string> = {
  'angel-lights': '🕯️',
  'bingo-fundraiser': '🎰',
  'flags-of-honor': '🇺🇸',
  'four-way-test-speech-contest': '🗣️',
  'holiday-gift-bags-for-veterans': '🎁',
  'roberta-way-scholarship': '🎓',
}

const CATEGORY_ICONS: Record<string, string> = {
  'community-service': '🤝',
  'youth': '🎓',
  'international': '🌍',
  'fundraiser': '💰',
}

export type HomeProject = Pick<Project, 'id' | 'slug' | 'title' | 'category' | 'description'>

export const HomeProjectsGrid = ({ projects }: { projects: HomeProject[] }) => (
  <div
    className="full-bleed"
    style={{ background: 'var(--color-background-white, #fff)' }}
  >
    <div
      style={{
        maxWidth: 'var(--section-projects-max-width, 1000px)',
        margin: '0 auto',
        padding: 'var(--section-projects-padding-y, 56px) var(--section-projects-padding-x, 40px)',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--section-projects-heading-size, 28px)',
          color: 'var(--color-primary)',
          textAlign: 'center',
          marginBottom: 'var(--section-projects-heading-mb, 32px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        What We Do
      </h2>

      {projects.length === 0 ? (
        <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>No projects yet.</p>
      ) : (
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'var(--project-grid-gap, 20px)' }}
        >
          {projects.map((project) => {
            const icon = PROJECT_ICONS_BY_SLUG[project.slug] || (project.category && CATEGORY_ICONS[project.category]) || '⚙️'

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--project-card-radius, 8px)',
                  padding: 'var(--project-card-padding, 24px)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div style={{ fontSize: 'var(--project-icon-size, 32px)', marginBottom: 'var(--project-icon-mb, 12px)' }}>
                  {icon}
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--project-name-size, 15px)',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '6px',
                  }}
                >
                  {project.title}
                </p>
                <p
                  style={{
                    fontSize: 'var(--project-desc-size, 13px)',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 'var(--project-desc-line-height, 1.5)',
                    margin: 0,
                  }}
                >
                  {lexicalToPlainText(project.description).slice(0, 100)}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  </div>
)

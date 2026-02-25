import Link from 'next/link'
import { Suspense } from 'react'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { getCurrentUser } from '@/lib/auth'
import { getRecentAnnouncements, getUpcomingEvents, getProjects } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'
import type { Project } from '@/payload-types'

/* ── Skeleton placeholders ──────────────────────────────────────────────────── */

const SectionSkeleton = () => (
  <div className="grid gap-4">
    <div className="h-8 w-48 animate-pulse rounded bg-muted" />
    <div className="grid gap-3">
      {[1, 2, 3].map((i) => (
        <div className="h-20 animate-pulse rounded-lg border border-border bg-muted" key={i} />
      ))}
    </div>
  </div>
)

const ProjectsSkeleton = () => (
  <div className="full-bleed" style={{ background: 'var(--color-background)' }}>
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="h-48 animate-pulse rounded-lg bg-muted" key={i} />
        ))}
      </div>
    </div>
  </div>
)

/* ── Async data-fetching sections ───────────────────────────────────────────── */

async function UpcomingEventsSection() {
  const { user } = await getCurrentUser()
  const events = await getUpcomingEvents(5, user)
  return <UpcomingEvents events={events.docs} viewAllHref="/events" />
}

async function LatestAnnouncementsSection() {
  const { user } = await getCurrentUser()
  const announcements = await getRecentAnnouncements(3, user)
  return <LatestAnnouncements announcements={announcements.docs} viewAllHref="/announcements" />
}

async function ProjectsSection() {
  try {
    const { user } = await getCurrentUser()
    const projects = await getProjects(user)
    const featured = projects.docs.slice(0, 6)
    return <HomeProjectsGrid projects={featured} />
  } catch {
    return null
  }
}

/* ── Projects grid ──────────────────────────────────────────────────────────── */

type HomeProject = Pick<Project, 'id' | 'slug' | 'title' | 'category' | 'description'>

function HomeProjectsGrid({ projects }: { projects: HomeProject[] }) {
  return (
    <div className="full-bleed" style={{ background: '#fff' }}>
      <div className="mx-auto max-w-5xl px-4 py-14">
        <h2
          className="mb-8 text-center text-3xl font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          What We Do
        </h2>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group rounded-lg border p-6 text-center transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <p className="mb-3 text-2xl">
                  {project.title.charAt(0).toUpperCase()}
                </p>
                <p
                  className="mb-1 text-sm font-bold"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {project.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#777' }}>
                  {lexicalToPlainText(project.description).slice(0, 120)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main homepage ──────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="-mt-8 -mb-8">
      {/* ── Hero ── */}
      <section
        className="full-bleed relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, var(--color-primary-deep) 100%)',
        }}
      >
        {/* Decorative circles */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full"
          style={{ background: 'var(--color-decorative-light)' }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full"
          style={{ background: 'var(--color-decorative-lighter)' }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-secondary)', marginBottom: 16 }}
          >
            Service Above Self
          </p>
          <h1
            className="mx-auto text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            Rotary Club of<br />Downtown Lock Haven
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Together, we inspire. Community projects, scholarships, and weekly fellowship serving
            Clinton County for over 22 years.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/join"
              className="rounded px-7 py-3 text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--color-secondary)',
                color: 'var(--color-secondary-foreground)',
              }}
            >
              Join Us
            </Link>
            <Link
              href="/projects"
              className="rounded border-2 px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Meeting callout bar ── */}
      <div className="full-bleed" style={{ background: 'var(--color-secondary)' }}>
        <div
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-3.5 text-sm font-semibold"
          style={{ color: 'var(--color-secondary-foreground)' }}
        >
          <span>📍 Every Tuesday at 5:30 PM</span>
          <span className="opacity-40">|</span>
          <span>Poorman Gallery, 352 E. Water St., Lock Haven, PA</span>
          <span className="opacity-40">|</span>
          <span>Social time starts at 5:15</span>
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section className="py-14 text-center" style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 className="text-3xl font-semibold" style={{ color: 'var(--color-primary)' }}>
          Who We Are
        </h2>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: '#555', lineHeight: 1.8 }}
        >
          We&apos;re neighbors, friends, and community leaders who come together each week to create
          positive, lasting change — locally and around the world. For over 22 years, the Rotary
          Club of Downtown Lock Haven has served Clinton County through community projects,
          scholarships, and fellowship. All are welcome.
        </p>
      </section>

      {/* ── Events + Announcements ── */}
      <section className="pb-12">
        <div className="grid gap-8 md:grid-cols-2">
          <Suspense fallback={<SectionSkeleton />}>
            <UpcomingEventsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LatestAnnouncementsSection />
          </Suspense>
        </div>
      </section>

      {/* ── Projects ── */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      {/* ── Stay Connected ── */}
      <section
        className="full-bleed text-center"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2
            className="text-2xl font-semibold"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            Stay Connected
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Follow us on Facebook for photos, event updates, and community news.
          </p>
          <div className="mt-6 inline-flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100064347773545"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-7 py-3 text-sm font-bold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--color-secondary)',
                color: 'var(--color-secondary-foreground)',
              }}
            >
              📘 Follow on Facebook
            </a>
            <Link
              href="/contact"
              className="rounded border-2 px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              ✉️ Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

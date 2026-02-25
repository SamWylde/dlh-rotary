import Link from 'next/link'
import { Suspense } from 'react'

import { LatestAnnouncements } from '@/components/announcements/LatestAnnouncements'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { FacebookFeed } from '@/components/layout/FacebookFeed'
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
    <div className="full-bleed" style={{ background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-secondary)' }}
            >
              Our Work
            </p>
            <h2 className="mt-1 text-3xl font-semibold">What We Do</h2>
          </div>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            style={{ color: 'var(--color-primary)' }}
            href="/projects"
          >
            All Projects →
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
                <p className="font-semibold leading-snug group-hover:text-primary">
                  {project.title}
                </p>
                {project.category ? (
                  <p
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-secondary)' }}
                  >
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

        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-secondary)' }}
          >
            Service Above Self
          </p>
          <h1
            className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            Rotary Club of Downtown Lock Haven
          </h1>
          <p
            className="mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Community projects, scholarships, and weekly fellowship in Clinton County since 2002.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                background: 'var(--color-secondary)',
                color: 'var(--color-secondary-foreground)',
              }}
            >
              Join Us
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
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
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4"
          style={{ color: 'var(--color-secondary-foreground)' }}
        >
          <div>
            <p className="font-semibold">
              We meet every Tuesday at 5:30 PM{' '}
              <span className="font-normal opacity-75">(social time at 5:15)</span>
            </p>
            <p className="text-sm opacity-75">
              Poorman Gallery, 352 E. Water Street, Lock Haven, PA
            </p>
          </div>
          <Link
            href="/events"
            className="shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/10"
            style={{
              borderColor: 'var(--color-secondary-foreground)',
              color: 'var(--color-secondary-foreground)',
            }}
          >
            See All Events
          </Link>
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section className="py-12 text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-secondary)' }}
        >
          About Us
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-semibold">Who We Are</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The Rotary Club of Downtown Lock Haven has been serving Clinton County for over 22 years.
          We&apos;re neighbors, friends, and community leaders who come together each week to create
          positive, lasting change — locally and around the world. All are welcome.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-primary)' }}
        >
          Learn More About Us
        </Link>
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
        className="full-bleed"
        style={{
          background:
            'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-secondary)' }}
              >
                Stay Connected
              </p>
              <h2
                className="mt-2 text-3xl font-semibold"
                style={{ color: 'var(--color-primary-foreground)' }}
              >
                Follow Our Journey
              </h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Stay up to date with our latest projects, events, and community impact on Facebook.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.facebook.com/profile.php?id=100064347773545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: 'var(--color-secondary)',
                    color: 'var(--color-secondary-foreground)',
                  }}
                >
                  Follow on Facebook
                </a>
                <Link
                  href="/join"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
                  style={{
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: 'var(--color-primary-foreground)',
                  }}
                >
                  Become a Member
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <FacebookFeed />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

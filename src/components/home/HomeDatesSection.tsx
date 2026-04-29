import { ArrowRight, Flag } from 'lucide-react'
import Link from 'next/link'

import { UpcomingEvents, type UpcomingEventsProps } from '@/components/events/UpcomingEvents'

type HomeDatesSectionProps = {
  events: UpcomingEventsProps['events']
}

export const HomeDatesSection = ({ events }: HomeDatesSectionProps) => (
  <section
    className="full-bleed"
    style={{
      background: 'var(--color-background-white, #fff)',
      fontFamily: 'var(--font-body)',
    }}
  >
    <div className="mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pb-8 lg:pt-14">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Club Calendar
          </p>
          <h2
            className="mt-2 text-3xl font-bold leading-tight text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What&apos;s coming up
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Important public dates, weekly meetings, and project milestones without meeting minutes
            or private club notes.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          href="/events"
        >
          Full calendar
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
          <UpcomingEvents
            emptyMessage="No upcoming dates posted yet."
            events={events}
            heading="Upcoming Dates"
            viewAllHref="/events"
          />
        </div>

        <aside className="grid overflow-hidden rounded-lg border border-primary/20 bg-card shadow-sm">
          <div className="border-b border-border bg-primary px-5 py-5 text-white sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Flag aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
                  Featured Project
                </p>
                <h3
                  className="mt-1 text-2xl font-bold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Flags of Honor 2026
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/85">
              Sponsor a flag to honor or remember someone special. The display is planned for May 22
              through June 16 in Triangle Park.
            </p>
          </div>

          <div className="grid content-start gap-4 p-5 sm:p-6">
            <div className="grid gap-3 rounded-md border border-border bg-background p-4">
              <div className="grid gap-1 border-b border-border pb-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-baseline">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Individual Flags
                </p>
                <p className="text-xl font-bold text-foreground">$35 per individual flag</p>
              </div>
              <div className="grid gap-1 border-b border-border pb-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-baseline">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Corporate
                </p>
                <p className="text-xl font-bold text-foreground">$100 business sponsorship</p>
              </div>
              <div className="grid gap-1 border-b border-border pb-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-baseline">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Deadlines
                </p>
                <p className="text-lg font-bold text-foreground">May 8 corporate; May 11 flags</p>
              </div>
              <div className="grid gap-1 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-baseline">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Display Dates
                </p>
                <p className="text-lg font-bold text-foreground">May 22 - June 16</p>
              </div>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Individual sponsors honor or remember someone special. Corporate sponsors receive
              recognition in the booklet, newspaper, and park banner. Proceeds benefit local
              scholarships.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold shadow-sm hover:bg-primary/90"
                href="/projects/flags-of-honor/donate"
                style={{ color: 'var(--color-primary-foreground)' }}
              >
                Sponsor a Flag
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  style={{ color: 'var(--color-primary-foreground)' }}
                />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                href="/projects/flags-of-honor"
              >
                Learn More
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
)

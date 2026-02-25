import Link from 'next/link'

export const MeetingCalloutBar = () => (
  <div className="full-bleed" style={{ background: 'var(--color-secondary)' }}>
    <div
      className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4"
      style={{ color: 'var(--color-secondary-foreground)' }}
    >
      <div>
        <p className="font-semibold">
          We meet every Tuesday at 5:30 PM <span className="font-normal opacity-75">(social time at 5:15)</span>
        </p>
        <p className="text-sm opacity-75">Poorman Gallery, 352 E. Water Street, Lock Haven, PA</p>
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
)


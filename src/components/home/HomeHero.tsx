import Link from 'next/link'

export const HomeHero = () => (
  <section
    className="full-bleed relative overflow-hidden"
    style={{
      background:
        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, var(--color-primary-deep) 100%)',
    }}
  >
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
      <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
        Service Above Self
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl" style={{ color: 'var(--color-primary-foreground)' }}>
        Rotary Club of Downtown Lock Haven
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
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
)


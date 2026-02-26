import Link from 'next/link'

export const HomeHero = () => (
  <section
    className="full-bleed relative overflow-hidden"
    style={{
      background:
        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, var(--color-primary-deep) 100%)',
      padding: 'var(--hero-padding-top, 80px) var(--hero-padding-x, 40px) var(--hero-padding-bottom, 70px)',
      textAlign: 'center',
    }}
  >
    {/* Decorative gold circles */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        top: '-60px',
        right: '-60px',
        width: 'var(--hero-circle-1-size, 300px)',
        height: 'var(--hero-circle-1-size, 300px)',
        background: 'var(--color-decorative-light)',
      }}
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        bottom: '-40px',
        left: '-40px',
        width: 'var(--hero-circle-2-size, 200px)',
        height: 'var(--hero-circle-2-size, 200px)',
        background: 'var(--color-decorative-lighter)',
      }}
    />

    {/* Content */}
    <div className="relative" style={{ zIndex: 1 }}>
      <p
        style={{
          fontSize: 'var(--hero-tagline-size, 12px)',
          letterSpacing: 'var(--hero-tagline-spacing, 0.25em)',
          textTransform: 'uppercase',
          color: 'var(--color-secondary)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          marginBottom: '16px',
        }}
      >
        Service Above Self
      </p>

      <h1
        style={{
          fontSize: 'var(--hero-heading-size, 42px)',
          color: 'var(--color-on-dark)',
          fontWeight: 'var(--hero-heading-weight, 700)' as unknown as number,
          lineHeight: 'var(--hero-heading-line-height, 1.2)',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Rotary Club of
        <br />
        Downtown Lock Haven
      </h1>

      <p
        style={{
          color: 'var(--color-on-dark-75)',
          fontSize: 'var(--hero-sub-size, 17px)',
          maxWidth: 'var(--hero-sub-max-width, 520px)',
          margin: '0 auto 32px',
          lineHeight: 'var(--hero-sub-line-height, 1.6)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Together, we inspire. Community projects, scholarships,
        and weekly fellowship serving Clinton County for over 22 years.
      </p>

      <div style={{ display: 'flex', gap: 'var(--hero-btn-gap, 12px)', justifyContent: 'center' }}>
        <Link
          href="/join"
          style={{
            background: 'var(--color-secondary)',
            color: 'var(--color-secondary-foreground)',
            padding: 'var(--hero-btn-padding, 12px 28px)',
            borderRadius: 'var(--hero-btn-radius, 4px)',
            fontWeight: 700,
            fontSize: 'var(--hero-btn-size, 14px)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Join Us
        </Link>
        <Link
          href="/projects"
          style={{
            border: '2px solid var(--color-on-dark-40)',
            color: 'var(--color-on-dark)',
            padding: 'var(--hero-btn-padding, 12px 28px)',
            borderRadius: 'var(--hero-btn-radius, 4px)',
            fontWeight: 600,
            fontSize: 'var(--hero-btn-size, 14px)',
            fontFamily: 'var(--font-body)',
            background: 'transparent',
          }}
        >
          View Projects
        </Link>
      </div>
    </div>
  </section>
)

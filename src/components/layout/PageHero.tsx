export const PageHero = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <section
    className="full-bleed relative overflow-hidden"
    style={{
      background:
        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, var(--color-primary-deep) 100%)',
      padding: '36px 40px 32px',
      textAlign: 'center',
    }}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        top: '-80px',
        right: '-80px',
        width: '180px',
        height: '180px',
        background: 'var(--color-decorative-light)',
      }}
    />
    <div className="relative" style={{ zIndex: 1 }}>
      <h1
        style={{
          fontSize: '28px',
          color: 'var(--color-on-dark)',
          fontWeight: 700,
          lineHeight: 1.2,
          fontFamily: 'var(--font-heading)',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: 'var(--color-on-dark-75)',
            fontSize: '15px',
            maxWidth: '500px',
            margin: '8px auto 0',
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  </section>
)

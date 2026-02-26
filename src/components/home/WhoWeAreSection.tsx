export const WhoWeAreSection = () => (
  <section
    style={{
      maxWidth: 'var(--section-who-max-width, 800px)',
      margin: '0 auto',
      padding: 'var(--section-who-padding-top, 56px) 40px var(--section-who-padding-bottom, 40px)',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: 'var(--section-who-heading-size, 28px)',
        color: 'var(--color-primary)',
        marginBottom: '16px',
        fontFamily: 'var(--font-heading)',
      }}
    >
      Who We Are
    </h2>
    <p
      style={{
        fontSize: 'var(--section-who-body-size, 16px)',
        lineHeight: 'var(--section-who-body-line-height, 1.8)',
        color: 'var(--color-muted-foreground)',
        fontFamily: 'var(--font-body)',
      }}
    >
      The Rotary Club of Downtown Lock Haven has been serving Clinton County for over 22 years.
      We&apos;re neighbors, friends, and community leaders who come together each week to create
      positive, lasting change, locally and around the world. All are welcome.
    </p>
  </section>
)

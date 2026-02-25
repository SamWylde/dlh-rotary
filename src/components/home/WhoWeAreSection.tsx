import Link from 'next/link'

export const WhoWeAreSection = () => (
  <section className="py-12 text-center">
    <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
      About Us
    </p>
    <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-semibold">Who We Are</h2>
    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
      The Rotary Club of Downtown Lock Haven has been serving Clinton County for over 22 years.
      We&apos;re neighbors, friends, and community leaders who come together each week to create
      positive, lasting change - locally and around the world. All are welcome.
    </p>
    <Link
      href="/about"
      className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      style={{ background: 'var(--color-primary)' }}
    >
      Learn More About Us
    </Link>
  </section>
)


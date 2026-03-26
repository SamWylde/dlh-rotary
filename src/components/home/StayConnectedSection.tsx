import Link from 'next/link'

import { FacebookFeed } from '@/components/layout/FacebookFeed'

export const StayConnectedSection = () => (
  <section
    className="full-bleed"
    style={{
      background: 'var(--color-primary)',
      padding: 'var(--section-cta-padding-y, 48px) var(--section-cta-padding-x, 40px)',
    }}
  >
    <div
      className="grid md:grid-cols-2 items-center"
      style={{ maxWidth: '900px', margin: '0 auto', gap: '40px' }}
    >
      {/* Left: text + buttons */}
      <div style={{ textAlign: 'left' }}>
        <h2
          style={{
            color: 'var(--color-on-dark)',
            fontSize: 'var(--section-cta-heading-size, 24px)',
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Stay Connected
        </h2>
        <p
          style={{
            color: 'var(--color-on-dark-70)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--section-cta-body-size, 15px)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}
        >
          See what we&apos;ve been up to on Facebook, or get in touch — we&apos;d love to hear from
          you.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 'var(--section-cta-btn-gap, 16px)',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://www.facebook.com/profile.php?id=100064347773545"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
              padding: 'var(--section-cta-btn-padding, 12px 28px)',
              borderRadius: 'var(--section-cta-btn-radius, 4px)',
              fontWeight: 700,
              fontSize: 'var(--section-cta-btn-size, 14px)',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Follow on Facebook
          </a>
          <Link
            href="/contact"
            style={{
              border: '2px solid var(--color-on-dark-30)',
              color: 'var(--color-on-dark)',
              padding: 'var(--section-cta-btn-padding, 12px 28px)',
              borderRadius: 'var(--section-cta-btn-radius, 4px)',
              fontWeight: 600,
              fontSize: 'var(--section-cta-btn-size, 14px)',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Right: compact Facebook feed */}
      <div className="flex justify-center md:justify-end">
        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '8px',
            lineHeight: 0,
          }}
        >
          <FacebookFeed />
        </div>
      </div>
    </div>
  </section>
)

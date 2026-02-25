import Link from 'next/link'

import { FacebookFeed } from '@/components/layout/FacebookFeed'

export const StayConnectedSection = () => (
  <section
    className="full-bleed"
    style={{
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
    }}
  >
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
            Stay Connected
          </p>
          <h2 className="mt-2 text-3xl font-semibold" style={{ color: 'var(--color-primary-foreground)' }}>
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
)


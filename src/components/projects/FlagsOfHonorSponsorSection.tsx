import Image from 'next/image'
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const sponsorBenefits = [
  'A sign to display in your business',
  'Your business name in the event booklet',
  'Your business listed in The Express newspaper',
  'Your business named on the corporate sponsor banner in Triangle Park',
]

const sponsorFlyers = [
  {
    title: 'Corporate sponsor poster',
    description: 'Quick overview of the $100 sponsorship, recognition, and deadline.',
    href: '/flags-of-honor/corporate-sponsor-poster.jpg',
    alt: 'Flags of Honor 2026 corporate sponsor poster',
    width: 894,
    height: 1126,
    previewClassName: 'max-h-[24rem]',
  },
  {
    title: 'Corporate sponsor letter',
    description: 'Expanded invitation explaining the project impact and sponsor visibility.',
    href: '/flags-of-honor/corporate-sponsor-letter.jpg',
    alt: 'Flags of Honor 2026 corporate sponsor letter',
    width: 904,
    height: 562,
    previewClassName: 'max-h-[15rem]',
  },
] as const

export const FlagsOfHonorSponsorSection = () => (
  <section
    className="grid gap-8 rounded-[28px] border border-border bg-card p-6 md:p-8 lg:p-10"
    id="corporate-sponsorship"
  >
    <div className="grid gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-primary)]">
        Flags of Honor 2026
      </p>
      <div className="grid gap-2">
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          Become a corporate sponsor for America&apos;s 250th celebration year
        </h2>
        <p className="max-w-4xl text-base leading-7 text-muted-foreground">
          Downtown Lock Haven Rotary is inviting local businesses to help bring Flags of Honor back
          to Triangle Park. A $100 corporate sponsorship supports the patriotic display,
          scholarships for Central Mountain High School students, and local nonprofits that directly
          help people in our community.
        </p>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.92fr)] lg:items-start">
      <Card className="border-border/80 bg-background shadow-sm">
        <CardHeader className="gap-3">
          <div className="inline-flex w-fit rounded-full bg-[color:var(--color-primary)] px-4 py-1 text-sm font-semibold text-white">
            Corporate Sponsorship: $100
          </div>
          <div className="grid gap-2">
            <CardTitle className="leading-tight">
              Your business will be recognized throughout the Flags of Honor display
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              The display runs through both Memorial Day and Flag Day in Triangle Park, with the
              public ceremony scheduled for Sunday, May 24, 2026.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <h3 className="text-lg font-semibold">What&apos;s included</h3>
            <ul className="grid gap-2 pl-5 text-sm leading-6 text-muted-foreground">
              {sponsorBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-[color:var(--color-decorative-lighter)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                Deadline
              </p>
              <p className="mt-2 text-2xl font-semibold">May 8, 2026</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Corporate sponsorship commitments are due by Friday, May 8, 2026.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-[color:var(--color-decorative-lighter)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                Community Impact
              </p>
              <p className="mt-2 text-2xl font-semibold">Scholarships + local help</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Proceeds support scholarships and nonprofits that directly serve local people.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-border p-4">
            <h3 className="text-lg font-semibold">How to sponsor</h3>
            <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-primary)]" />
                <a
                  className="hover:underline"
                  href="mailto:dlhrotary@gmail.com?subject=Flags%20of%20Honor%20Corporate%20Sponsorship"
                >
                  dlhrotary@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-primary)]" />
                <a className="hover:underline" href="tel:+18145715324">
                  814-571-5324
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-primary)]" />
                <address className="not-italic">
                  Rotary Club of Downtown Lock Haven
                  <br />
                  P.O. Box 634
                  <br />
                  Lock Haven, PA 17745
                </address>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-primary)]" />
                <p>
                  Checks should be payable to <strong>Downtown Lock Haven Rotary</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="text-white">
              <a
                href="mailto:dlhrotary@gmail.com?subject=Flags%20of%20Honor%20Corporate%20Sponsorship"
                style={{ color: '#ffffff' }}
              >
                Email about sponsorship
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+18145715324">Call Diahann</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sponsorFlyers.map((flyer) => (
          <Card className="border-border/80 bg-background shadow-sm" key={flyer.href}>
            <CardHeader className="gap-2">
              <CardTitle className="text-xl">{flyer.title}</CardTitle>
              <CardDescription className="leading-6">{flyer.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <a
                className="grid min-h-[220px] place-items-center overflow-hidden rounded-xl border border-border bg-white p-4"
                download
                href={flyer.href}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt={flyer.alt}
                  className={`h-auto w-auto max-w-full ${flyer.previewClassName}`}
                  height={flyer.height}
                  loading="eager"
                  src={flyer.href}
                  unoptimized
                  width={flyer.width}
                />
              </a>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <a download href={flyer.href} target="_blank" rel="noreferrer">
                    Open full size
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

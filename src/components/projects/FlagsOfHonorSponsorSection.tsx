import Image from 'next/image'
import type { ReactNode } from 'react'
import { Building2, Flag, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const individualBenefits = [
  'Sponsor a full-sized American flag in Triangle Park.',
  'Honor or remember a veteran, first responder, teacher, mentor, friend, or family member.',
  'Honorees and sponsors are published in the official booklet and The Express.',
  'Proceeds benefit scholarships.',
]

const corporateBenefits = [
  'A sign to display in your business.',
  'Your business name in the event booklet.',
  'Your business listed in The Express newspaper.',
  'Your business named on the corporate sponsor banner in Triangle Park.',
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

const FieldLine = ({ label }: { label: string }) => (
  <div className="grid gap-1">
    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
      {label}
    </span>
    <span className="h-8 border-b border-foreground/50" />
  </div>
)

const ContactDetail = ({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-primary)]" />
    <div className="text-sm leading-6 text-muted-foreground">{children}</div>
  </div>
)

export const FlagsOfHonorSponsorSection = () => (
  <section
    className="grid min-w-0 gap-8 rounded-[28px] border border-border bg-card p-5 sm:p-6 md:p-8 lg:p-10"
    id="flags-of-honor-support"
  >
    <div className="grid min-w-0 gap-3">
      <p className="break-words text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] sm:tracking-[0.28em]">
        Flags of Honor 2026
      </p>
      <div className="grid gap-2">
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          Sponsor a flag or become a corporate sponsor
        </h2>
        <p className="max-w-4xl text-base leading-7 text-muted-foreground">
          Families, individuals, and local businesses can help bring Flags of Honor back to Triangle
          Park for America&apos;s 250th celebration year. Individual flags honor or remember someone
          special; corporate sponsorships help fund the display, scholarships, and local community
          service.
        </p>
      </div>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="border-border/80 bg-background shadow-sm">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-4 py-1 text-sm font-semibold text-white">
              <Flag className="h-4 w-4" />
              Individual Flag Sponsorship
            </span>
            <span className="text-3xl font-semibold text-foreground">$35</span>
          </div>
          <div className="grid gap-2">
            <CardTitle className="leading-tight">Honor or remember someone special</CardTitle>
            <CardDescription className="text-sm leading-6">
              The display is planned for Friday, May 22 through Tuesday, June 16 in Triangle Park.
              Individual flag sponsorships are due Monday, May 11, 2026.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ul className="grid gap-2 pl-5 text-sm leading-6 text-muted-foreground">
            {individualBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <div className="grid gap-3 rounded-2xl border border-border p-4">
            <h3 className="text-lg font-semibold">How to sponsor a flag</h3>
            <ContactDetail icon={Mail}>
              <a
                className="hover:underline"
                href="mailto:dlhrotary@gmail.com?subject=Flags%20of%20Honor%20Flag%20Sponsorship"
              >
                dlhrotary@gmail.com
              </a>
            </ContactDetail>
            <ContactDetail icon={Phone}>
              <a className="hover:underline" href="tel:+18142442929">
                1-814-244-2929
              </a>
            </ContactDetail>
            <ContactDetail icon={MapPin}>
              <address className="not-italic">
                Rotary Club of Downtown Lock Haven
                <br />
                P.O. Box 634
                <br />
                Lock Haven, PA 17745
              </address>
            </ContactDetail>
            <p className="text-sm leading-6 text-muted-foreground">
              Make checks payable to <strong>Downtown Lock Haven Rotary</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a
                href="#individual-flag-form"
                style={{ color: '#ffffff' }}
                className="hover:text-white"
              >
                Use the flag form
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:dlhrotary@gmail.com?subject=Flags%20of%20Honor%20Flag%20Sponsorship">
                Email about a flag
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-background shadow-sm" id="corporate-sponsorship">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-secondary)] px-4 py-1 text-sm font-semibold text-[color:var(--color-secondary-foreground)]">
              <Building2 className="h-4 w-4" />
              Corporate Sponsorship
            </span>
            <span className="text-3xl font-semibold text-foreground">$100</span>
          </div>
          <div className="grid gap-2">
            <CardTitle className="leading-tight">
              Recognize your business during the display
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Corporate sponsorship commitments are due by Friday, May 8, 2026.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ul className="grid gap-2 pl-5 text-sm leading-6 text-muted-foreground">
            {corporateBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-[color:var(--color-decorative-lighter)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                Deadline
              </p>
              <p className="mt-2 text-2xl font-semibold">May 8, 2026</p>
            </div>
            <div className="rounded-2xl border border-border bg-[color:var(--color-decorative-lighter)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
                Recognition
              </p>
              <p className="mt-2 text-2xl font-semibold">Booklet + banner</p>
            </div>
          </div>

          <Button asChild>
            <a
              href="mailto:dlhrotary@gmail.com?subject=Flags%20of%20Honor%20Corporate%20Sponsorship"
              style={{ color: '#ffffff' }}
              className="hover:text-white"
            >
              Email about corporate sponsorship
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>

    <Card className="border-border/80 bg-background shadow-sm" id="individual-flag-form">
      <CardHeader className="gap-2">
        <CardTitle className="leading-tight">Printable individual flag form</CardTitle>
        <CardDescription className="text-sm leading-6">
          This is the regular $35 flag sponsorship form recreated from the club flyer. Print this
          page, fill out the form, and mail it with payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 rounded-2xl border border-border bg-white p-4 text-black sm:p-6">
          <div className="grid gap-2 text-center">
            <p className="text-3xl font-black uppercase tracking-wide sm:text-4xl">
              Flags of Honor 2026
            </p>
            <p className="text-2xl font-bold italic text-red-800 sm:text-3xl">
              It&apos;s America&apos;s 250th!
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-950">In Triangle Park, Lock Haven</p>
            <p className="text-xl font-semibold text-blue-950">Memorial Day to Flag Day</p>
            <p className="text-base font-bold text-red-900">Friday, May 22 - Tuesday, June 16</p>
            <p className="text-base font-bold text-red-900">
              Ceremony at 12:00 p.m. Sunday, May 24
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-2 text-center text-sm leading-6">
            <p className="font-bold">
              The Rotary Club of Downtown Lock Haven invites you to sponsor a flag honoring someone
              in your life.
            </p>
            <p className="font-semibold text-blue-950">
              Veteran, military personnel, first-responder, teacher, mentor, friend, family member
            </p>
            <p>$35 for each flag sponsorship. Proceeds benefit scholarships.</p>
            <p>
              Honorees and their sponsors are published in the official booklet and The Express.
            </p>
            <p>
              Mail the completed form with payment to Rotary Club of Downtown Lock Haven, P.O. Box
              634, Lock Haven, PA 17745.
            </p>
            <p>If more information is needed, call 1-814-244-2929.</p>
            <p className="font-bold text-red-900">
              Deadline for sponsorships is Monday, May 11, 2026.
            </p>
          </div>

          <div className="grid gap-3 border-t border-dashed border-foreground/60 pt-5">
            <FieldLine label="Name of Sponsor" />
            <FieldLine label="Address" />
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldLine label="Phone" />
              <FieldLine label="Email" />
            </div>
            <div className="grid gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                I would like to honor
              </span>
              <p className="text-sm leading-6 text-muted-foreground">
                Please list name and wording on each flag as you would like them printed.
              </p>
            </div>
            <FieldLine label="Flag #1" />
            <FieldLine label="Flag #2" />
            <FieldLine label="Flag #3" />
            <p className="text-sm leading-6">
              If you have more flags or need more space, please use the back of this form.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldLine label="Total No. of Flags" />
              <FieldLine label="Total Payment Enclosed" />
            </div>
            <p className="text-sm leading-6">
              Make check payable to:{' '}
              <strong className="text-red-900">Downtown Lock Haven Rotary</strong>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="text-2xl font-semibold">Corporate sponsor resources</h3>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          These are the existing corporate sponsorship files. They remain separate from the regular
          individual flag sponsorship form above.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
              <Button asChild size="sm" variant="outline">
                <a download href={flyer.href} target="_blank" rel="noreferrer">
                  Open full size
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

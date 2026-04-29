import { Clock, Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/layout/PageHero'
import { getCurrentUser } from '@/lib/auth'
import { createContactChallenge } from '@/lib/contactProtection'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact | Rotary Club of Downtown Lock Haven',
}

export default async function ContactPage() {
  const { user } = await getCurrentUser()
  const challenge = createContactChallenge()
  const siteSettings = await getSiteSettings(user)
  const email = siteSettings.email || 'dlhrotary@gmail.com'
  const address = (siteSettings.address || 'PO Box 634\nLock Haven, PA 17745')
    .split('\n')
    .filter(Boolean)
    .join(', ')
  const meetingInfo = siteSettings.meetingInfo
  const meetingLocation = [
    meetingInfo?.location || 'Poorman Gallery, 352 E. Water St.',
    meetingInfo?.city || 'Lock Haven, PA 17745',
  ]
    .filter(Boolean)
    .join(', ')

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
    },
    {
      icon: MapPin,
      label: 'Mailing Address',
      value: address,
    },
    {
      icon: Clock,
      label: 'Meetings',
      value: `${meetingInfo?.day || 'Tuesdays'} at ${meetingInfo?.time || '5:30 PM (social at 5:15)'}`,
    },
  ]

  return (
    <div className="-mt-8 -mb-8">
      <PageHero title="Contact" subtitle="Reach the Rotary Club of Downtown Lock Haven" />
      <section className="full-bleed bg-background" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:px-8 lg:py-16">
          <aside className="min-w-0 rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
              Rotary Club of Downtown Lock Haven
            </p>
            <h2
              className="mt-3 text-3xl font-bold leading-tight text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get in touch.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Send a question, share a service idea, or ask about joining us at an upcoming meeting.
            </p>

            <div className="mt-6 grid gap-0 divide-y divide-border">
              {contactDetails.map((detail) => {
                const Icon = detail.icon

                return (
                  <div
                    className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 py-4 first:pt-0 last:pb-0"
                    key={detail.label}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{detail.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-md border border-border bg-background p-4">
              <p className="text-sm font-semibold text-foreground">Meeting Location</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{meetingLocation}</p>
            </div>
          </aside>

          <div className="min-w-0 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7 lg:p-8">
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Send a Message
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We&apos;ll route your note to the right club contact.
              </p>
            </div>
            <ContactForm challenge={challenge} user={user} />
          </div>
        </div>
      </section>
    </div>
  )
}

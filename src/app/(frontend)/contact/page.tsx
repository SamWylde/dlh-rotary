import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { getCurrentUser } from '@/lib/auth'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact | Rotary Club of Downtown Lock Haven',
}

export default async function ContactPage() {
  const { user } = await getCurrentUser()
  const siteSettings = await getSiteSettings(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p>Email: {siteSettings.email || 'dlhrotary@gmail.com'}</p>
      {siteSettings.meetingInfo?.day || siteSettings.meetingInfo?.time ? (
        <p>
          Meeting: {[siteSettings.meetingInfo.day, siteSettings.meetingInfo.time].filter(Boolean).join(' ')}
        </p>
      ) : null}
      <ContactForm user={user} />
    </section>
  )
}

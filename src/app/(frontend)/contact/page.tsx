import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import { getCurrentUser } from '@/lib/auth'
import { getConfiguredForm, getSiteSettings } from '@/lib/content'

export default async function ContactPage() {
  const { user } = await getCurrentUser()
  const [siteSettings, contactForm] = await Promise.all([
    getSiteSettings(user),
    getConfiguredForm('contactForm', user),
  ])

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p>Email: {siteSettings.email || 'dlhrotary@gmail.com'}</p>
      <p>
        Meeting: {siteSettings.meetingInfo?.day} {siteSettings.meetingInfo?.time}
      </p>
      {contactForm ? (
        <PayloadFormRenderer form={contactForm} />
      ) : (
        <p className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
          Contact form is not configured. In Payload Admin, open Site Settings and select a form for the{' '}
          <b>Contact Form</b> field.
        </p>
      )}
    </section>
  )
}

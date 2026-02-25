import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import type { SessionUser } from '@/lib/auth'
import { getConfiguredForm } from '@/lib/content'

export type ContactFormProps = {
  user?: SessionUser | null
}

export const ContactForm = async ({ user }: ContactFormProps) => {
  const contactForm = await getConfiguredForm('contactForm', user)

  if (!contactForm) {
    return (
      <p className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
        Contact form is not configured. In Payload Admin, open Site Settings and select a form for the <b>Contact Form</b>{' '}
        field.
      </p>
    )
  }

  return <PayloadFormRenderer form={contactForm} />
}

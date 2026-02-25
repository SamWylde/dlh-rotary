import { ConfiguredForm } from '@/components/forms/ConfiguredForm'
import type { SessionUser } from '@/lib/auth'

export type ContactFormProps = {
  user?: SessionUser | null
}

export const ContactForm = async ({ user }: ContactFormProps) => (
  <ConfiguredForm fallbackLabel="Contact Form" formKey="contactForm" user={user} />
)

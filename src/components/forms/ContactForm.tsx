'use client'

import { useState, type FormEvent } from 'react'

import type { SessionUser } from '@/lib/auth'

export type ContactFormProps = {
  user?: SessionUser | null
}

type ContactFormValues = {
  email: string
  message: string
  name: string
  phone: string
}

const initialValues = (user?: SessionUser | null): ContactFormValues => ({
  email: user?.email || '',
  message: '',
  name: user?.fullName || '',
  phone: '',
})

export const ContactForm = ({ user }: ContactFormProps) => {
  const [values, setValues] = useState<ContactFormValues>(() => initialValues(user))
  const [status, setStatus] = useState<'error' | 'idle' | 'success'>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    setFeedback(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const body = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        throw new Error(body.error || 'Unable to send your message. Please try again.')
      }

      setValues(initialValues(user))
      setStatus('success')
      setFeedback('Thanks. Your message has been sent to the club.')
    } catch (error) {
      setStatus('error')
      setFeedback(
        error instanceof Error ? error.message : 'Unable to send your message. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-1 text-sm" htmlFor="contact-name">
        <span className="font-medium">Name *</span>
        <input
          className="rounded-md border border-border bg-background px-3 py-2"
          id="contact-name"
          maxLength={120}
          onChange={(event) => setField('name', event.target.value)}
          required
          type="text"
          value={values.name}
        />
      </label>

      <label className="grid gap-1 text-sm" htmlFor="contact-email">
        <span className="font-medium">Email *</span>
        <input
          className="rounded-md border border-border bg-background px-3 py-2"
          id="contact-email"
          maxLength={254}
          onChange={(event) => setField('email', event.target.value)}
          required
          type="email"
          value={values.email}
        />
      </label>

      <label className="grid gap-1 text-sm" htmlFor="contact-phone">
        <span className="font-medium">Phone</span>
        <input
          className="rounded-md border border-border bg-background px-3 py-2"
          id="contact-phone"
          maxLength={50}
          onChange={(event) => setField('phone', event.target.value)}
          type="tel"
          value={values.phone}
        />
      </label>

      <label className="grid gap-1 text-sm" htmlFor="contact-message">
        <span className="font-medium">Message *</span>
        <textarea
          className="min-h-36 rounded-md border border-border bg-background px-3 py-2"
          id="contact-message"
          maxLength={5000}
          onChange={(event) => setField('message', event.target.value)}
          required
          value={values.message}
        />
      </label>

      <div aria-atomic="true" aria-live="polite">
        {feedback ? (
          <p
            className={
              status === 'success'
                ? 'rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800'
                : 'rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800'
            }
          >
            {feedback}
          </p>
        ) : null}
      </div>

      <button
        className="rounded-md bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

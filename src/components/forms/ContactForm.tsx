'use client'

import { useState, type FormEvent } from 'react'

import { Send } from 'lucide-react'

import type { ContactChallenge } from '@/lib/contactProtection'
import type { SessionUser } from '@/lib/auth'

export type ContactFormProps = {
  challenge: ContactChallenge
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

export const ContactForm = ({ challenge, user }: ContactFormProps) => {
  const [values, setValues] = useState<ContactFormValues>(() => initialValues(user))
  const [challengeAnswer, setChallengeAnswer] = useState('')
  const [website, setWebsite] = useState('')
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
        body: JSON.stringify({
          ...values,
          challengeAnswer,
          challengeToken: challenge.token,
          website,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const body = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        throw new Error(body.error || 'Unable to send your message. Please try again.')
      }

      setValues(initialValues(user))
      setChallengeAnswer('')
      setWebsite('')
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
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div
        aria-hidden="true"
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          type="text"
          value={website}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm" htmlFor="contact-name">
          <span className="font-semibold text-foreground">Name *</span>
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm"
            id="contact-name"
            maxLength={120}
            onChange={(event) => setField('name', event.target.value)}
            required
            type="text"
            value={values.name}
          />
        </label>

        <label className="grid gap-2 text-sm" htmlFor="contact-email">
          <span className="font-semibold text-foreground">Email *</span>
          <input
            className="h-11 rounded-md border border-border bg-background px-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm"
            id="contact-email"
            maxLength={254}
            onChange={(event) => setField('email', event.target.value)}
            required
            type="email"
            value={values.email}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm" htmlFor="contact-phone">
        <span className="font-semibold text-foreground">Phone</span>
        <input
          className="h-11 rounded-md border border-border bg-background px-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm"
          id="contact-phone"
          maxLength={50}
          onChange={(event) => setField('phone', event.target.value)}
          type="tel"
          value={values.phone}
        />
      </label>

      <label className="grid gap-2 text-sm" htmlFor="contact-message">
        <span className="font-semibold text-foreground">Message *</span>
        <textarea
          className="min-h-40 rounded-md border border-border bg-background px-3 py-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm"
          id="contact-message"
          maxLength={5000}
          onChange={(event) => setField('message', event.target.value)}
          required
          value={values.message}
        />
      </label>

      <label className="grid gap-2 text-sm" htmlFor="contact-human-check">
        <span className="font-semibold text-foreground">Human check *</span>
        <span className="text-sm leading-6 text-muted-foreground">
          What is {challenge.question}? This helps keep automated spam out.
        </span>
        <input
          autoComplete="off"
          className="h-11 rounded-md border border-border bg-background px-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm"
          id="contact-human-check"
          inputMode="numeric"
          maxLength={3}
          onChange={(event) => setChallengeAnswer(event.target.value)}
          pattern="[0-9]*"
          required
          type="text"
          value={challengeAnswer}
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
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        <Send aria-hidden="true" className="h-4 w-4" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

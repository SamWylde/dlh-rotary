import { NextResponse } from 'next/server'

import { verifyContactChallenge } from '@/lib/contactProtection'
import { SMTP_CONFIG_ERROR, SMTP_CONFIGURED } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

const CONTACT_RECIPIENTS = ['dlhrotary@gmail.com', 'thomasdarby@dlhrotary.org'] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactRequestBody = {
  challengeAnswer?: unknown
  challengeToken?: unknown
  email?: unknown
  message?: unknown
  name?: unknown
  phone?: unknown
  website?: unknown
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_ATTEMPTS = 5
const rateLimits = new Map<string, RateLimitEntry>()

const getString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const escapeHTML = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const parseBody = async (request: Request): Promise<ContactRequestBody | null> => {
  try {
    const body = (await request.json()) as unknown
    return body && typeof body === 'object' ? (body as ContactRequestBody) : null
  } catch {
    return null
  }
}

const getClientKey = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || request.headers.get('x-real-ip') || 'unknown'
}

const isRateLimited = (key: string, now = Date.now()): boolean => {
  for (const [entryKey, entry] of rateLimits) {
    if (entry.resetAt <= now) {
      rateLimits.delete(entryKey)
    }
  }

  const entry = rateLimits.get(key)

  if (!entry) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  rateLimits.set(key, entry)

  return entry.count > RATE_LIMIT_MAX_ATTEMPTS
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const body = await parseBody(request)

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = getString(body.name)
  const email = getString(body.email).toLowerCase()
  const phone = getString(body.phone)
  const message = getString(body.message)
  const honeypot = getString(body.website)
  const challengeAnswer = getString(body.challengeAnswer)
  const challengeToken = getString(body.challengeToken)

  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  const challenge = verifyContactChallenge({
    answer: challengeAnswer,
    token: challengeToken,
  })

  if (!challenge.ok) {
    return NextResponse.json({ error: challenge.error }, { status: 400 })
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (phone.length > 50) {
    return NextResponse.json({ error: 'Please shorten the phone number.' }, { status: 400 })
  }

  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: 'Please enter a message between 10 and 5,000 characters.' },
      { status: 400 },
    )
  }

  const rateLimitKey = `contact:${getClientKey(request)}`

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: 'Too many messages were sent from this connection. Please wait and try again.' },
      {
        headers: { 'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
        status: 429,
      },
    )
  }

  if (!SMTP_CONFIGURED) {
    return NextResponse.json(
      { error: `Email is not configured (${SMTP_CONFIG_ERROR}).` },
      { status: 503 },
    )
  }

  const payload = await getPayloadClient()
  const safeName = escapeHTML(name)
  const safeEmail = escapeHTML(email)
  const safePhone = phone ? escapeHTML(phone) : ''
  const safeMessage = escapeHTML(message).replace(/\n/g, '<br />')
  const subject = `Website contact: ${name.slice(0, 80)}`
  const text = [
    'A new website contact message was submitted.',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n\n')
  const html = `
    <p>A new website contact message was submitted.</p>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `

  try {
    await payload.sendEmail({
      html,
      replyTo: email,
      subject,
      text,
      to: CONTACT_RECIPIENTS.join(', '),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    payload.logger.error(
      `Contact form email failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please email dlhrotary@gmail.com.' },
      { status: 500 },
    )
  }
}

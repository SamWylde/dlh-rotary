import { NextResponse } from 'next/server'

import { SMTP_CONFIG_ERROR, SMTP_CONFIGURED } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

const CONTACT_RECIPIENTS = ['dlhrotary@gmail.com', 'thomasdarby@dlhrotary.org'] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactRequestBody = {
  email?: unknown
  message?: unknown
  name?: unknown
  phone?: unknown
}

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

export const POST = async (request: Request): Promise<NextResponse> => {
  const body = await parseBody(request)

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = getString(body.name)
  const email = getString(body.email).toLowerCase()
  const phone = getString(body.phone)
  const message = getString(body.message)

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

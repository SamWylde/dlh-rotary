import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'

import { PAYLOAD_SECRET } from '@/lib/env'

export type ContactChallenge = {
  question: string
  token: string
}

type ChallengePayload = {
  issuedAt: number
  left: number
  nonce: string
  right: number
  v: 1
}

export const CONTACT_CHALLENGE_MAX_AGE_MS = 60 * 60 * 1000
export const CONTACT_CHALLENGE_MIN_AGE_MS = 1500

const secret = `contact-form:${PAYLOAD_SECRET}`

const encodePayload = (payload: ChallengePayload): string =>
  Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')

const signPayload = (encodedPayload: string): string =>
  createHmac('sha256', secret).update(encodedPayload).digest('base64url')

const safeEqual = (left: string, right: string): boolean => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

const parsePayload = (encodedPayload: string): ChallengePayload | null => {
  try {
    const value = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as unknown

    if (!value || typeof value !== 'object') {
      return null
    }

    const payload = value as Partial<ChallengePayload>

    if (
      payload.v !== 1 ||
      !Number.isInteger(payload.left) ||
      !Number.isInteger(payload.right) ||
      !Number.isInteger(payload.issuedAt) ||
      typeof payload.nonce !== 'string' ||
      payload.nonce.length < 16
    ) {
      return null
    }

    return payload as ChallengePayload
  } catch {
    return null
  }
}

export const createContactChallenge = (now = Date.now()): ContactChallenge => {
  const left = randomInt(4, 13)
  const right = randomInt(3, 12)
  const encodedPayload = encodePayload({
    issuedAt: now,
    left,
    nonce: randomBytes(12).toString('base64url'),
    right,
    v: 1,
  })

  return {
    question: `${left} + ${right}`,
    token: `${encodedPayload}.${signPayload(encodedPayload)}`,
  }
}

export const verifyContactChallenge = ({
  answer,
  now = Date.now(),
  token,
}: {
  answer: string
  now?: number
  token: string
}): { error: string; ok: false } | { ok: true } => {
  const [encodedPayload, signature, extra] = token.split('.')

  if (!encodedPayload || !signature || extra) {
    return { error: 'Please complete the human check.', ok: false }
  }

  if (!safeEqual(signPayload(encodedPayload), signature)) {
    return { error: 'Please complete the human check again.', ok: false }
  }

  const payload = parsePayload(encodedPayload)

  if (!payload) {
    return { error: 'Please complete the human check again.', ok: false }
  }

  const age = now - payload.issuedAt

  if (age < CONTACT_CHALLENGE_MIN_AGE_MS) {
    return { error: 'Please wait a moment before sending your message.', ok: false }
  }

  if (age > CONTACT_CHALLENGE_MAX_AGE_MS) {
    return { error: 'The human check expired. Please refresh the page and try again.', ok: false }
  }

  if (!/^\d{1,3}$/.test(answer.trim())) {
    return { error: 'Please answer the human check.', ok: false }
  }

  if (Number(answer) !== payload.left + payload.right) {
    return { error: 'The human check answer is incorrect.', ok: false }
  }

  return { ok: true }
}

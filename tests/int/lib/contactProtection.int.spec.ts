import { describe, expect, it } from 'vitest'

import {
  CONTACT_CHALLENGE_MAX_AGE_MS,
  CONTACT_CHALLENGE_MIN_AGE_MS,
  createContactChallenge,
  verifyContactChallenge,
} from '@/lib/contactProtection'

type EncodedPayload = {
  issuedAt: number
  left: number
  right: number
}

const getAnswer = (token: string): string => {
  const [encodedPayload] = token.split('.')
  const payload = JSON.parse(
    Buffer.from(encodedPayload, 'base64url').toString('utf8'),
  ) as EncodedPayload

  return String(payload.left + payload.right)
}

describe('contactProtection', () => {
  it('accepts a valid signed challenge after the minimum wait', () => {
    const now = 1_800_000
    const challenge = createContactChallenge(now)

    expect(
      verifyContactChallenge({
        answer: getAnswer(challenge.token),
        now: now + CONTACT_CHALLENGE_MIN_AGE_MS,
        token: challenge.token,
      }),
    ).toEqual({ ok: true })
  })

  it('rejects a challenge answered too quickly', () => {
    const now = 1_800_000
    const challenge = createContactChallenge(now)

    expect(
      verifyContactChallenge({
        answer: getAnswer(challenge.token),
        now: now + CONTACT_CHALLENGE_MIN_AGE_MS - 1,
        token: challenge.token,
      }).ok,
    ).toBe(false)
  })

  it('rejects expired challenges', () => {
    const now = 1_800_000
    const challenge = createContactChallenge(now)

    expect(
      verifyContactChallenge({
        answer: getAnswer(challenge.token),
        now: now + CONTACT_CHALLENGE_MAX_AGE_MS + 1,
        token: challenge.token,
      }).ok,
    ).toBe(false)
  })

  it('rejects incorrect answers', () => {
    const now = 1_800_000
    const challenge = createContactChallenge(now)

    expect(
      verifyContactChallenge({
        answer: '999',
        now: now + CONTACT_CHALLENGE_MIN_AGE_MS,
        token: challenge.token,
      }).ok,
    ).toBe(false)
  })

  it('rejects forged tokens', () => {
    const now = 1_800_000
    const challenge = createContactChallenge(now)
    const [encodedPayload, signature] = challenge.token.split('.')
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as EncodedPayload
    const forgedPayload = Buffer.from(
      JSON.stringify({ ...payload, left: payload.left + 1 }),
      'utf8',
    ).toString('base64url')

    expect(
      verifyContactChallenge({
        answer: String(payload.left + 1 + payload.right),
        now: now + CONTACT_CHALLENGE_MIN_AGE_MS,
        token: `${forgedPayload}.${signature}`,
      }).ok,
    ).toBe(false)
  })
})

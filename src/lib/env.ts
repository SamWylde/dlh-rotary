/**
 * Environment variable validation.
 * Import this module early (e.g. in payload.config.ts) so missing vars
 * cause a clear startup error instead of a confusing runtime failure.
 */

const isProd = process.env.NODE_ENV === 'production'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function warnEnv(name: string, fallback: string): string {
  const value = process.env[name]
  if (!value && isProd) {
    console.warn(`[env] ${name} is not set — falling back to "${fallback}"`)
  }
  return value || fallback
}

/** Canonical database URL. Prefer DATABASE_URL (Vercel Neon integration), fall back to DATABASE_URI. */
export const DATABASE_URL = isProd
  ? requireEnv('DATABASE_URL')
  : process.env.DATABASE_URL || process.env.DATABASE_URI || 'postgresql://payload:payload@localhost:5432/payload'

export const PAYLOAD_SECRET = isProd
  ? requireEnv('PAYLOAD_SECRET')
  : process.env.PAYLOAD_SECRET || 'dev-only-not-for-production'

export const BLOB_READ_WRITE_TOKEN = isProd
  ? requireEnv('BLOB_READ_WRITE_TOKEN')
  : process.env.BLOB_READ_WRITE_TOKEN || ''

export const RESEND_API_KEY = warnEnv('RESEND_API_KEY', '')

export const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || (isProd ? requireEnv('NEXT_PUBLIC_SERVER_URL') : 'http://localhost:3000')

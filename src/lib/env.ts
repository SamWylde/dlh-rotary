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
    console.warn(`[env] ${name} is not set - falling back to "${fallback}"`)
  }
  return value || fallback
}

function normalizeDatabaseURL(value: string): string {
  try {
    const url = new URL(value)
    const sslMode = url.searchParams.get('sslmode')
    const useLibPQCompat = url.searchParams.get('uselibpqcompat') === 'true'

    if (
      !useLibPQCompat &&
      (sslMode === 'prefer' || sslMode === 'require' || sslMode === 'verify-ca')
    ) {
      url.searchParams.set('sslmode', 'verify-full')
      return url.toString()
    }
  } catch {
    return value
  }

  return value
}

/** Canonical database URL. Prefer DATABASE_URL (Vercel Neon integration), fall back to DATABASE_URI. */
export const DATABASE_URL = normalizeDatabaseURL(
  isProd
    ? requireEnv('DATABASE_URL')
    : process.env.DATABASE_URL ||
        process.env.DATABASE_URI ||
        'postgresql://payload:payload@localhost:5432/payload',
)

export const PAYLOAD_SECRET = isProd
  ? requireEnv('PAYLOAD_SECRET')
  : process.env.PAYLOAD_SECRET || 'dev-only-not-for-production'

/** Optional - blob storage is disabled gracefully if token is missing. */
export const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || ''

const rawSMTPPort = Number(process.env.SMTP_PORT || 465)
const validSMTPPort = Number.isInteger(rawSMTPPort) && rawSMTPPort > 0

export const SMTP_HOST = warnEnv('SMTP_HOST', 'smtp.purelymail.com')
export const SMTP_PORT = validSMTPPort ? rawSMTPPort : 465
export const SMTP_SECURE = (process.env.SMTP_SECURE || 'true') === 'true'
export const SMTP_USER = warnEnv('SMTP_USER', '')
export const SMTP_PASSWORD = warnEnv('SMTP_PASSWORD', '')
export const DEFAULT_FROM_EMAIL = warnEnv('DEFAULT_FROM_EMAIL', 'noreply@dlhrotary.org')
export const DEFAULT_FROM_NAME = warnEnv('DEFAULT_FROM_NAME', 'Rotary Club of Downtown Lock Haven')

export const SMTP_CONFIG_ERROR = [
  SMTP_HOST ? null : 'SMTP_HOST',
  validSMTPPort ? null : 'SMTP_PORT',
  SMTP_USER ? null : 'SMTP_USER',
  SMTP_PASSWORD ? null : 'SMTP_PASSWORD',
  DEFAULT_FROM_EMAIL ? null : 'DEFAULT_FROM_EMAIL',
]
  .filter(Boolean)
  .join(', ')

export const SMTP_CONFIGURED = SMTP_CONFIG_ERROR.length === 0

if (isProd && !SMTP_CONFIGURED) {
  throw new Error(`Missing or invalid SMTP configuration: ${SMTP_CONFIG_ERROR}`)
}

export const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (isProd ? requireEnv('NEXT_PUBLIC_SERVER_URL') : 'http://localhost:3000')

import { getServerURL } from '@/lib/url'

const escapeHTML = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const generatePasswordResetEmailHTML = (args?: {
  token?: string
  user?: { fullName?: string }
}) => {
  const { token, user } = args || {}
  const name = escapeHTML(user?.fullName || 'there')

  if (!token) {
    return `
      <p>Hi ${name},</p>
      <p>A password reset was requested for the Rotary Club of Downtown Lock Haven website, but the reset token could not be generated.</p>
      <p>Please request a new password reset link.</p>
    `
  }

  const resetURL = escapeHTML(`${getServerURL()}/reset-password?token=${encodeURIComponent(token)}`)

  return `
    <p>Hi ${name},</p>
    <p>An account has been created for you on the Rotary Club of Downtown Lock Haven website, or a password reset was requested.</p>
    <p><a href="${resetURL}">Set your password</a></p>
    <p>If you did not request this, you can ignore this email.</p>
  `
}

export const generatePasswordResetEmailSubject = () => 'Set your Rotary website password'

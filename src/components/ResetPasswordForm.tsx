'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = searchParams.get('token') || ''

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    if (!token) {
      setError('This password reset link is missing a token.')
      return
    }

    if (password.length < 8) {
      setError('Use at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/users/reset-password', {
        body: JSON.stringify({ password, token }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const body = (await response.json().catch(() => ({}))) as { message?: string }

      if (!response.ok) {
        setError(body.message || 'This reset link is invalid or expired.')
        return
      }

      setMessage('Your password has been set. You can now sign in.')
      setPassword('')
      setConfirmPassword('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mx-auto grid max-w-md gap-4 rounded-lg border border-border bg-card p-6" onSubmit={submit}>
      <div>
        <h1 className="text-2xl font-semibold">Set Your Password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a password for your member account.</p>
      </div>
      <label className="grid gap-1 text-sm">
        New Password
        <Input onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
      </label>
      <label className="grid gap-1 text-sm">
        Confirm Password
        <Input
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          value={confirmPassword}
        />
      </label>
      {message ? (
        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          <p>{message}</p>
          <Link className="mt-2 inline-block font-semibold underline underline-offset-4" href="/login">
            Sign in
          </Link>
        </div>
      ) : null}
      {error ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      {message ? (
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      ) : (
        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Saving...' : 'Set Password'}
        </Button>
      )}
    </form>
  )
}

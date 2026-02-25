'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError('Invalid credentials. Please try again.')
        return
      }

      router.push('/account')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mx-auto grid max-w-md gap-3 rounded-lg border border-border bg-card p-6" onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold">Member Login</h1>
      <label className="grid gap-1 text-sm">
        Email
        <input
          className="rounded border border-border bg-background px-3 py-2"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </label>
      <label className="grid gap-1 text-sm">
        Password
        <input
          className="rounded border border-border bg-background px-3 py-2"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        className="rounded bg-primary px-3 py-2 font-medium text-primary-foreground disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
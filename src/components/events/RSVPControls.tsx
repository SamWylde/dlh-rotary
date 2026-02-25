'use client'

import { useState } from 'react'

const statuses: Array<{ label: string; value: 'yes' | 'no' | 'maybe' }> = [
  { label: 'Attending', value: 'yes' },
  { label: 'Maybe', value: 'maybe' },
  { label: 'Not Attending', value: 'no' },
]

export const RSVPControls = ({
  eventID,
  initialStatus,
}: {
  eventID: string | number
  initialStatus?: 'yes' | 'no' | 'maybe' | null
}) => {
  const [status, setStatus] = useState<'yes' | 'no' | 'maybe' | null>(initialStatus || null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async (nextStatus: 'yes' | 'no' | 'maybe') => {
    setIsSaving(true)
    setError(null)

    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventID, status: nextStatus }),
    })

    if (!res.ok) {
      setError('Unable to save RSVP right now.')
      setIsSaving(false)
      return
    }

    setStatus(nextStatus)
    setIsSaving(false)
  }

  return (
    <div className="grid gap-2 rounded-lg border border-border bg-card p-4">
      <h2 className="text-lg font-semibold">RSVP</h2>
      <div className="flex flex-wrap gap-2">
        {statuses.map((entry) => (
          <button
            className={`rounded border px-3 py-2 text-sm ${
              status === entry.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background'
            }`}
            disabled={isSaving}
            key={entry.value}
            onClick={() => save(entry.value)}
            type="button"
          >
            {entry.label}
          </button>
        ))}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

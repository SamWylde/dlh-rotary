'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayPilotMonth } from '@daypilot/daypilot-lite-react'

import type { Event } from '@/payload-types'

export type EventCalendarEvent = {
  id: number | string
  text: string
  start: string
  end: string
  slug: string
  eventType: Event['eventType']
}

export type EventCalendarProps = {
  events: EventCalendarEvent[]
}

const eventTypeColors: Record<Event['eventType'], { background: string; border: string; bar: string }> = {
  meeting: { background: '#eaf2ff', border: '#17458f', bar: '#17458f' },
  speaker: { background: '#fff4dc', border: '#f7a81b', bar: '#f7a81b' },
  service: { background: '#e7f6ec', border: '#2f855a', bar: '#2f855a' },
  fundraiser: { background: '#ffecec', border: '#c53030', bar: '#c53030' },
  social: { background: '#f2ebff', border: '#6b46c1', bar: '#6b46c1' },
  board: { background: '#e9ecef', border: '#495057', bar: '#495057' },
}

const formatMonthStart = (year: number, month: number): string => {
  const monthNumber = String(month + 1).padStart(2, '0')
  return `${year}-${monthNumber}-01`
}

const toMonthLabel = (monthStart: string): string => {
  const monthDate = new Date(`${monthStart}T00:00:00`)
  return monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const shiftMonth = (monthStart: string, diff: number): string => {
  const [yearText, monthText] = monthStart.split('-')
  const year = Number(yearText)
  const month = Number(monthText) - 1
  const shifted = new Date(year, month + diff, 1)
  return formatMonthStart(shifted.getFullYear(), shifted.getMonth())
}

export const EventCalendar = ({ events }: EventCalendarProps) => {
  const router = useRouter()
  const [startDate, setStartDate] = useState<string>(() => {
    const now = new Date()
    return formatMonthStart(now.getFullYear(), now.getMonth())
  })

  const calendarEvents = useMemo(
    () =>
      events.map((event) => {
        const colors = eventTypeColors[event.eventType]
        return {
          id: event.id,
          text: event.text,
          start: event.start,
          end: event.end,
          backColor: colors.background,
          borderColor: colors.border,
          barColor: colors.bar,
          tags: {
            slug: event.slug,
          },
        }
      }),
    [events],
  )

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <button
          className="rounded border border-border px-3 py-1 text-sm hover:border-primary"
          onClick={() => setStartDate((previous) => shiftMonth(previous, -1))}
          type="button"
        >
          Previous
        </button>
        <p className="text-lg font-semibold">{toMonthLabel(startDate)}</p>
        <div className="flex items-center gap-2">
          <button
            className="rounded border border-border px-3 py-1 text-sm hover:border-primary"
            onClick={() => {
              const today = new Date()
              setStartDate(formatMonthStart(today.getFullYear(), today.getMonth()))
            }}
            type="button"
          >
            Today
          </button>
          <button
            className="rounded border border-border px-3 py-1 text-sm hover:border-primary"
            onClick={() => setStartDate((previous) => shiftMonth(previous, 1))}
            type="button"
          >
            Next
          </button>
        </div>
      </div>

      <div aria-label="Monthly event calendar" role="region">
      <DayPilotMonth
        cellHeaderHeight={24}
        cellHeight={120}
        eventClickHandling="Enabled"
        eventDeleteHandling="Disabled"
        eventMoveHandling="Disabled"
        eventResizeHandling="Disabled"
        events={calendarEvents}
        lineSpace={2}
        onEventClick={(args) => {
          args.preventDefault()

          const slug = (args.e.data as { tags?: { slug?: string } }).tags?.slug
          if (slug) {
            router.push(`/events/${slug}`)
          }
        }}
        startDate={startDate}
        timeRangeSelectedHandling="Disabled"
        weekStarts={0}
      />
      </div>
    </div>
  )
}

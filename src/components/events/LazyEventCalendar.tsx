'use client'

import dynamic from 'next/dynamic'

import type { EventCalendarProps } from './EventCalendar'

const EventCalendar = dynamic(
  () => import('./EventCalendar').then((mod) => ({ default: mod.EventCalendar })),
  { ssr: false, loading: () => <div className="h-96 animate-pulse rounded-lg border border-border bg-muted" /> },
)

export const LazyEventCalendar = (props: EventCalendarProps) => <EventCalendar {...props} />

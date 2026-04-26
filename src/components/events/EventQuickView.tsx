'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import Link from 'next/link'

import type { Event } from '@/payload-types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatClubDate, formatClubTime } from '@/lib/dateFormat'

type EventQuickViewProps = {
  event: Pick<Event, 'id' | 'slug' | 'title' | 'date' | 'endDate' | 'location' | 'description' | 'eventType'> | null
  onClose: () => void
}

const eventTypeLabels: Record<string, string> = {
  meeting: 'Meeting',
  speaker: 'Guest Speaker',
  service: 'Service',
  fundraiser: 'Fundraiser',
  social: 'Social',
  board: 'Board Meeting',
}

export const EventQuickView = ({ event, onClose }: EventQuickViewProps) => {
  if (!event) return null

  const dateStr = formatClubDate(event.date, { dateStyle: 'long', timeStyle: 'short' })
  const endStr = event.endDate ? formatClubTime(event.endDate) : null

  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>
            {event.title}
          </DialogTitle>
          <DialogDescription asChild>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginTop: '8px',
              }}
            >
              <span style={{ fontSize: '14px' }}>
                {dateStr}{endStr ? ` – ${endStr}` : ''}
              </span>
              {event.location && (
                <span style={{ fontSize: '13px' }}>
                  {event.location}
                </span>
              )}
              <span
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  marginTop: '2px',
                }}
              >
                {eventTypeLabels[event.eventType] || event.eventType}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        {event.description && (
          <div
            className="prose prose-sm max-w-none"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-foreground)',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            <RichText data={event.description as SerializedEditorState} />
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', textAlign: 'right' }}>
          <Link
            href={`/events/${event.slug}`}
            style={{
              fontSize: '13px',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            View full details
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

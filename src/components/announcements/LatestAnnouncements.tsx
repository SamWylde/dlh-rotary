import Link from 'next/link'

import type { Announcement } from '@/payload-types'

import { lexicalToPlainText } from '@/lib/richText'

export type LatestAnnouncementsProps = {
  announcements: Array<Pick<Announcement, 'id' | 'slug' | 'title' | 'publishedDate' | 'priority' | 'content'>>
  heading?: string
  emptyMessage?: string
  viewAllHref?: string
  showPriority?: boolean
}

export const LatestAnnouncements = ({
  announcements,
  heading = 'Latest Announcements',
  emptyMessage = 'No announcements yet.',
  viewAllHref,
}: LatestAnnouncementsProps) => {
  return (
    <section>
      <h2
        style={{
          fontSize: 'var(--section-ea-heading-size, 22px)',
          color: 'var(--color-primary)',
          borderBottom: 'var(--border-section-heading-width, 2px) solid var(--color-secondary)',
          paddingBottom: 'var(--section-ea-heading-pb, 8px)',
          display: 'inline-block',
          marginBottom: 'var(--section-ea-heading-mb, 20px)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {heading}
      </h2>
      {announcements.length === 0 ? (
        <p style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-body)' }}>{emptyMessage}</p>
      ) : (
        <div>
          {announcements.map((announcement) => {
            const excerpt = lexicalToPlainText(announcement.content).slice(0, 120)

            return (
              <Link
                key={announcement.id}
                href={`/announcements/${announcement.slug}`}
                style={{
                  display: 'block',
                  padding: 'var(--event-row-padding, 14px) 0',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--announcement-title-size, 14px)',
                    color: 'var(--color-foreground)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {announcement.title}
                </p>
                <p
                  style={{
                    fontSize: 'var(--announcement-date-size, 12px)',
                    color: 'var(--color-text-lighter)',
                    fontFamily: 'var(--font-body)',
                    margin: '2px 0 0',
                  }}
                >
                  {new Date(announcement.publishedDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
                {excerpt ? (
                  <p
                    style={{
                      fontSize: 'var(--announcement-excerpt-size, 13px)',
                      color: 'var(--color-text-subtle)',
                      fontFamily: 'var(--font-body)',
                      marginTop: '6px',
                      lineHeight: 'var(--announcement-excerpt-line-height, 1.5)',
                      margin: '6px 0 0',
                    }}
                  >
                    {excerpt}{excerpt.length >= 120 ? '…' : ''}
                  </p>
                ) : null}
              </Link>
            )
          })}
        </div>
      )}
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          style={{
            display: 'inline-block',
            marginTop: '12px',
            fontSize: '13px',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          View all announcements
        </Link>
      ) : null}
    </section>
  )
}

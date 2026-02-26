import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/forms/ContactForm'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug, getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact | Rotary Club of Downtown Lock Haven',
}

export default async function ContactPage() {
  const { user } = await getCurrentUser()
  const [page, siteSettings] = await Promise.all([getPageBySlug('contact', user), getSiteSettings(user)])

  return (
    <section className="grid gap-6">
      <article className="grid gap-4 rounded-lg border border-border bg-card p-6">
        <h1 className="text-3xl font-semibold">{page?.title ?? 'Contact'}</h1>
        {page?.content ? (
          <RichText className="prose max-w-none" data={page.content as SerializedEditorState} />
        ) : (
          <>
            <p>Email: {siteSettings.email || 'dlhrotary@gmail.com'}</p>
            {siteSettings.meetingInfo?.day || siteSettings.meetingInfo?.time ? (
              <p>
                Meeting: {[siteSettings.meetingInfo.day, siteSettings.meetingInfo.time].filter(Boolean).join(' ')}
              </p>
            ) : null}
          </>
        )}
      </article>
      <ContactForm user={user} />
    </section>
  )
}

import type { CollectionAfterChangeHook } from 'payload'

import { lexicalToPlainText } from '@/lib/richText'
import { getServerURL } from '@/lib/url'

const EMAIL_BATCH_SIZE = 50

const chunk = <T,>(values: T[], size: number): T[][] => {
  if (size <= 0) return [values]

  const result: T[][] = []

  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size))
  }

  return result
}

const escapeHTML = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const getRecipientEmails = async (hook: Parameters<CollectionAfterChangeHook>[0]): Promise<string[]> => {
  const emails = new Set<string>()
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    // Always override access — this is a system-level query to notify all members.
    const users = await hook.req.payload.find({
      collection: 'users',
      where: {
        email: {
          exists: true,
        },
      },
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })

    for (const user of users.docs) {
      if (typeof user.email !== 'string') continue
      const email = user.email.trim()
      if (email.length > 0) {
        emails.add(email)
      }
    }

    hasNextPage = Boolean(users.hasNextPage)
    page += 1
  }

  return Array.from(emails)
}

export const sendAnnouncementNotification: CollectionAfterChangeHook = async (hook) => {
  const { doc, previousDoc } = hook

  if (doc?._status !== 'published') {
    return doc
  }

  if (previousDoc?._status === 'published') {
    return doc
  }

  if (!process.env.RESEND_API_KEY) {
    hook.req.payload.logger.warn('Skipping announcement notification: RESEND_API_KEY is not configured.')
    return doc
  }

  try {
    const recipients = await getRecipientEmails(hook)

    if (recipients.length === 0) {
      hook.req.payload.logger.info('Skipping announcement notification: no recipients found.')
      return doc
    }

    const announcementURL = `${getServerURL()}/announcements/${doc.slug}`
    const plainTextBody = lexicalToPlainText(doc.content).slice(0, 500)
    const subject = `New Rotary announcement: ${doc.title}`
    const safeTitle = escapeHTML(doc.title)
    const safeBody = plainTextBody ? escapeHTML(plainTextBody) : ''
    const safeURL = escapeHTML(announcementURL)
    const htmlBody = `
      <p>A new Rotary Club announcement has been published.</p>
      <p><strong>${safeTitle}</strong></p>
      ${safeBody ? `<p>${safeBody}</p>` : ''}
      <p><a href="${safeURL}">Read the full announcement</a></p>
    `
    const textBody = [
      'A new Rotary Club announcement has been published.',
      doc.title,
      plainTextBody,
      `Read more: ${announcementURL}`,
    ]
      .filter((line) => line && line.length > 0)
      .join('\n\n')

    for (const recipientBatch of chunk(recipients, EMAIL_BATCH_SIZE)) {
      const [primaryRecipient, ...bccRecipients] = recipientBatch

      await hook.req.payload.sendEmail({
        bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
        html: htmlBody,
        subject,
        text: textBody,
        to: primaryRecipient,
      })
    }
  } catch (error) {
    hook.req.payload.logger.error(
      `Announcement notification failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }

  return doc
}

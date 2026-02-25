import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import type { SessionUser } from '@/lib/auth'
import { getFormByID } from '@/lib/content'
import type { Page } from '@/payload-types'

type ContactFormBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'contactFormBlock' }>

export const ContactFormBlock = async ({
  block,
  user,
}: {
  block: ContactFormBlockData
  user: SessionUser | null
}) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const form = await getFormByID(block.form, user)

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {block.intro ? <RichText className="prose max-w-none text-sm text-muted-foreground" data={block.intro as SerializedEditorState} /> : null}
      {form ? (
        <PayloadFormRenderer form={form} />
      ) : (
        <p className="rounded border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
          Form is not configured for this block. In Payload Admin, select a form in the <b>Form</b> field.
        </p>
      )}
    </section>
  )
}

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import type { Page } from '@/payload-types'

type ContentBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'contentBlock' }>

export const ContentBlock = ({ block }: { block: ContentBlockData }) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''

  if (!heading && !block.content) {
    return null
  }

  return (
    <section className="grid gap-3 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {block.content ? <RichText className="prose max-w-none" data={block.content as SerializedEditorState} /> : null}
    </section>
  )
}

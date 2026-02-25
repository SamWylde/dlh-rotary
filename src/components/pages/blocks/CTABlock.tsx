import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import type { Page } from '@/payload-types'

import { BlockActionLink } from './BlockActionLink'
import { resolvePageBlockHref } from './blockUtils'

type CTABlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'ctaBlock' }>

export const CTABlock = ({ block }: { block: CTABlockData }) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const hasActions = Boolean(resolvePageBlockHref(block.primaryLink) || resolvePageBlockHref(block.secondaryLink))

  if (!heading && !block.body && !hasActions) {
    return null
  }

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {block.body ? <RichText className="prose max-w-none" data={block.body as SerializedEditorState} /> : null}
      {hasActions ? (
        <div className="flex flex-wrap gap-2">
          <BlockActionLink fallbackLabel="Get Involved" link={block.primaryLink} variant="primary" />
          <BlockActionLink fallbackLabel="Learn More" link={block.secondaryLink} variant="secondary" />
        </div>
      ) : null}
    </section>
  )
}

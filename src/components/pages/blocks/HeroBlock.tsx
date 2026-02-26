import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import Image from 'next/image'

import type { Page } from '@/payload-types'

import { BlockActionLink } from './BlockActionLink'
import { getMediaFromRelation, resolvePageBlockHref } from './blockUtils'

type HeroBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'heroBlock' }>

export const HeroBlock = ({ block }: { block: HeroBlockData }) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const eyebrow = typeof block.eyebrow === 'string' ? block.eyebrow.trim() : ''
  const media = getMediaFromRelation(block.image)
  const imageURL = typeof media?.url === 'string' ? media.url : null
  const hasActions = Boolean(resolvePageBlockHref(block.primaryLink) || resolvePageBlockHref(block.secondaryLink))

  if (!heading && !block.body && !imageURL) {
    return null
  }

  return (
    <section className="grid gap-6 rounded-lg border border-border bg-card p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div className="grid gap-4">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p> : null}
        {heading ? <h2 className="text-3xl font-semibold">{heading}</h2> : null}
        {block.body ? <RichText className="prose max-w-none" data={block.body as SerializedEditorState} /> : null}
        {hasActions ? (
          <div className="flex flex-wrap gap-2">
            <BlockActionLink fallbackLabel="Learn More" link={block.primaryLink} variant="primary" />
            <BlockActionLink fallbackLabel="Read More" link={block.secondaryLink} variant="secondary" />
          </div>
        ) : null}
      </div>
      {imageURL ? (
        <div className="relative h-64 overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            alt={media?.alt || heading || 'Hero image'}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            src={imageURL}
          />
        </div>
      ) : null}
    </section>
  )
}

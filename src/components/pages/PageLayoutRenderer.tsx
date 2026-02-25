import type { SessionUser } from '@/lib/auth'
import type { Page } from '@/payload-types'

import { CTABlock } from './blocks/CTABlock'
import { ContactFormBlock } from './blocks/ContactFormBlock'
import { ContentBlock } from './blocks/ContentBlock'
import { HeroBlock } from './blocks/HeroBlock'
import { ImageGalleryBlock } from './blocks/ImageGalleryBlock'
import { OfficerGridBlock } from './blocks/OfficerGridBlock'
import { StatsBarBlock } from './blocks/StatsBarBlock'

type PageLayoutBlock = NonNullable<Page['layout']>[number]

export type PageLayoutRendererProps = {
  page: Page
  user: SessionUser | null
}

const isPageLayoutBlock = (value: unknown): value is PageLayoutBlock => {
  if (!value || typeof value !== 'object') return false

  const blockType = (value as { blockType?: unknown }).blockType
  return typeof blockType === 'string'
}

const getBlockKey = (block: PageLayoutBlock, index: number): string => {
  if (typeof block.id === 'string' && block.id.length > 0) {
    return block.id
  }

  return `${block.blockType}-${index}`
}

export const PageLayoutRenderer = ({ page, user }: PageLayoutRendererProps) => {
  const layout = (Array.isArray(page.layout) ? page.layout : []).filter(isPageLayoutBlock)

  if (layout.length === 0) {
    return null
  }

  return (
    <section className="grid gap-6">
      {layout.map((block, index) => {
        const key = getBlockKey(block, index)

        switch (block.blockType) {
          case 'heroBlock':
            return <HeroBlock block={block} key={key} />
          case 'contentBlock':
            return <ContentBlock block={block} key={key} />
          case 'imageGalleryBlock':
            return <ImageGalleryBlock block={block} key={key} />
          case 'ctaBlock':
            return <CTABlock block={block} key={key} />
          case 'officerGridBlock':
            return <OfficerGridBlock block={block} key={key} user={user} />
          case 'statsBlock':
            return <StatsBarBlock block={block} key={key} />
          case 'contactFormBlock':
            return <ContactFormBlock block={block} key={key} user={user} />
          default:
            return null
        }
      })}
    </section>
  )
}

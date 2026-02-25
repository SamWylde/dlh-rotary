import Image from 'next/image'

import type { Page } from '@/payload-types'

import { getMediaFromRelation } from './blockUtils'

type ImageGalleryBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'imageGalleryBlock' }>

type GalleryImage = {
  key: string
  url: string
  alt: string
  caption: string
}

export const ImageGalleryBlock = ({ block }: { block: ImageGalleryBlockData }) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const images: GalleryImage[] = (block.images || [])
    .map((item, index) => {
      const media = getMediaFromRelation(item.image)
      const url = typeof media?.url === 'string' ? media.url : null

      if (!url) {
        return null
      }

      const caption = typeof item.caption === 'string' ? item.caption.trim() : ''

      return {
        key: item.id || `${index}`,
        url,
        alt: media?.alt || caption || heading || `Gallery image ${index + 1}`,
        caption,
      }
    })
    .filter((item): item is GalleryImage => item !== null)

  if (!heading && images.length === 0) {
    return null
  }

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <figure className="grid gap-2 overflow-hidden rounded-lg border border-border bg-background" key={image.key}>
              <div className="relative aspect-[4/3] bg-muted">
                <Image alt={image.alt} className="object-cover" fill sizes="(min-width: 1024px) 25vw, 50vw" src={image.url} />
              </div>
              {image.caption ? <figcaption className="px-3 pb-3 text-sm text-muted-foreground">{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  )
}

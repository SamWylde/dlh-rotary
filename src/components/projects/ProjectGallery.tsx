'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getMediaFromRelation, getMediaURL } from '@/lib/media'
import type { Project } from '@/payload-types'

type ProjectGalleryItem = NonNullable<Project['gallery']>[number]

export type ProjectGalleryProps = {
  gallery: Project['gallery']
}

type GalleryImage = {
  key: string
  url: string
  alt: string
  caption: string | null | undefined
}

export const ProjectGallery = ({ gallery }: ProjectGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  useEffect(() => {
    if (selectedIndex === null) return

    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedIndex, closeLightbox])
  const images = useMemo<GalleryImage[]>(
    () =>
      (gallery || [])
        .map((item, index) => {
          const typedItem = item as ProjectGalleryItem
          const url = getMediaURL(typedItem.image)

          if (!url) {
            return null
          }

          const media = getMediaFromRelation(typedItem.image)
          return {
            key: typedItem.id || `${index}`,
            url,
            alt: media?.alt || typedItem.caption || `Project image ${index + 1}`,
            caption: typedItem.caption,
          }
        })
        .filter((item): item is GalleryImage => item !== null),
    [gallery],
  )

  if (images.length === 0) {
    return null
  }

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <section className="grid gap-3">
      <h2 className="text-2xl font-semibold">Project Gallery</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            className="overflow-hidden rounded border border-border bg-background text-left"
            key={image.key}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            <Image alt={image.alt} className="aspect-[4/3] w-full object-cover" height={400} src={image.url} width={600} />
            {image.caption ? <p className="px-3 py-2 text-sm text-muted-foreground">{image.caption}</p> : null}
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          aria-label="Project gallery lightbox"
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
          role="dialog"
        >
          <button
            aria-label="Close gallery"
            className="absolute right-4 top-4 rounded border border-white/30 px-3 py-1 text-sm text-white hover:bg-white/10"
            onClick={closeLightbox}
            ref={closeButtonRef}
            type="button"
          >
            Close
          </button>
          <div className="grid max-h-full w-full max-w-4xl gap-3">
            <Image alt={selectedImage.alt} className="max-h-[80vh] w-full rounded object-contain" height={800} src={selectedImage.url} width={1200} />
            {selectedImage.caption ? <p className="text-center text-sm text-white/85">{selectedImage.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

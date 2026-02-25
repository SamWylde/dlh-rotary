import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ collection, doc }) => {
  const collectionSlug = collection.slug
  const slug = doc?.slug

  revalidatePath('/')
  revalidatePath(`/${collectionSlug}`)

  if (slug) {
    revalidatePath(`/${collectionSlug}/${slug}`)
  }

  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ collection, doc }) => {
  const collectionSlug = collection.slug

  revalidatePath('/')
  revalidatePath(`/${collectionSlug}`)

  if (doc?.slug) {
    revalidatePath(`/${collectionSlug}/${doc.slug}`)
  }

  return doc
}
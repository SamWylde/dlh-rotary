import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  revalidatePath('/')

  if (doc?.slug) {
    revalidatePath(`/${doc.slug}`)
  }

  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  revalidatePath('/')

  if (doc?.slug) {
    revalidatePath(`/${doc.slug}`)
  }

  return doc
}
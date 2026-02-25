import type { Document } from '@/payload-types'
import { DOCUMENT_CATEGORIES } from '@/constants/documentCategories'

export const categoryLabels: Record<Document['category'], string> = Object.fromEntries(
  DOCUMENT_CATEGORIES.map((c) => [c.value, c.label]),
) as Record<Document['category'], string>

export const categoryOptions: Array<{ label: string; value: Document['category'] }> = DOCUMENT_CATEGORIES.map(
  (c) => ({ label: c.label, value: c.value }),
)

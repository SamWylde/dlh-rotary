import type { Document } from '@/payload-types'

export const categoryLabels: Record<Document['category'], string> = {
  minutes: 'Meeting Minutes',
  bylaws: 'Bylaws & Governance',
  financial: 'Financial Reports',
  'ri-resources': 'Rotary International Resources',
  forms: 'Forms & Templates',
  other: 'Other',
}

export const categoryOptions: Array<{ label: string; value: Document['category'] }> = Object.entries(categoryLabels).map(
  ([value, label]) => ({ label, value: value as Document['category'] }),
)

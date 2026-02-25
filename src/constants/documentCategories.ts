export const DOCUMENT_CATEGORIES = [
  { label: 'Meeting Minutes', value: 'minutes' },
  { label: 'Bylaws & Governance', value: 'bylaws' },
  { label: 'Financial Reports', value: 'financial' },
  { label: 'Rotary International Resources', value: 'ri-resources' },
  { label: 'Forms & Templates', value: 'forms' },
  { label: 'Other', value: 'other' },
] as const

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number]['value']

export const DOCUMENT_CATEGORY_VALUES = DOCUMENT_CATEGORIES.map((c) => c.value) as readonly DocumentCategory[]

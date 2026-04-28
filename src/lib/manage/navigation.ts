export const MANAGE_FORM_HASH = 'manage-form'

export const MANAGE_RESOURCE_PATHS = {
  announcements: '/manage/announcements',
  documents: '/manage/documents',
  events: '/manage/events',
  forms: '/manage/forms',
  'form-submissions': '/manage/form-submissions',
  pages: '/manage/pages',
  users: '/manage/members',
} as const

export type ManageUIResource = keyof typeof MANAGE_RESOURCE_PATHS

export const manageResourcePath = (resource: ManageUIResource): string =>
  MANAGE_RESOURCE_PATHS[resource]

export const manageCreateHref = (resource: ManageUIResource): string =>
  `${manageResourcePath(resource)}?new=1#${MANAGE_FORM_HASH}`

export const manageEditHref = (resource: ManageUIResource, id: number | string): string =>
  `${manageResourcePath(resource)}?edit=${encodeURIComponent(String(id))}#${MANAGE_FORM_HASH}`

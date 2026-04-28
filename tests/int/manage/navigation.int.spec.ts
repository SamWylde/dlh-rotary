import { describe, expect, it } from 'vitest'

import {
  MANAGE_FORM_HASH,
  manageCreateHref,
  manageEditHref,
  manageResourcePath,
  type ManageUIResource,
} from '@/lib/manage/navigation'

const resources = [
  ['announcements', '/manage/announcements'],
  ['events', '/manage/events'],
  ['documents', '/manage/documents'],
  ['forms', '/manage/forms'],
  ['form-submissions', '/manage/form-submissions'],
  ['pages', '/manage/pages'],
  ['users', '/manage/members'],
] as const satisfies readonly [ManageUIResource, string][]

describe('manage navigation helpers', () => {
  it.each(resources)('maps %s to %s', (resource, path) => {
    expect(manageResourcePath(resource)).toBe(path)
  })

  it.each(resources)('builds %s new item intent URLs with the form hash', (resource, path) => {
    expect(manageCreateHref(resource)).toBe(`${path}?new=1#${MANAGE_FORM_HASH}`)
  })

  it.each(resources)(
    'builds %s edit intent URLs with encoded ids and the form hash',
    (resource, path) => {
      expect(manageEditHref(resource, 'minutes 2026')).toBe(
        `${path}?edit=minutes%202026#${MANAGE_FORM_HASH}`,
      )
    },
  )
})

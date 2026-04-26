import { describe, expect, it } from 'vitest'

import { sanitizeManageData } from '@/lib/manage/api'
import {
  buildManageWhere,
  getManageResourceConfig,
  isManageResourceSlug,
} from '@/lib/manage/resources'
import { plainTextToLexical } from '@/lib/manage/richText'

describe('manage resources', () => {
  it('rejects unsupported resources', () => {
    expect(isManageResourceSlug('users')).toBe(true)
    expect(isManageResourceSlug('bad-resource')).toBe(false)
    expect(getManageResourceConfig('bad-resource')).toBeNull()
  })

  it('builds constrained search filters', () => {
    const where = buildManageWhere(
      'announcements',
      new URLSearchParams({ search: 'meeting', status: 'draft' }),
    )

    expect(where).toEqual({
      and: [
        {
          or: [{ title: { contains: 'meeting' } }],
        },
        { _status: { equals: 'draft' } },
      ],
    })
  })

  it('creates Payload Lexical-shaped plain text content', () => {
    expect(plainTextToLexical('First paragraph\n\nSecond paragraph')).toMatchObject({
      root: {
        type: 'root',
        children: [
          { type: 'paragraph', children: [{ type: 'text', text: 'First paragraph' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Second paragraph' }] },
        ],
      },
    })
  })

  it('rejects event date ranges that end before they start', async () => {
    const result = sanitizeManageData(
      'events',
      {
        title: 'Bad range',
        date: '2026-05-10T18:00',
        endDate: '2026-05-10T17:00',
        eventType: 'meeting',
      },
      'create',
    )

    expect(result).toHaveProperty('status', 400)
    await expect((result as Response).json()).resolves.toMatchObject({
      error: 'End date must be after the start date.',
    })
  })

  it('does not default missing roles on member updates', () => {
    const result = sanitizeManageData(
      'users',
      {
        fullName: 'Existing Admin',
        email: 'admin@example.org',
      },
      'update',
    )

    expect(result).not.toHaveProperty('role')
  })

  it('rejects invalid member emails before Payload send attempts', async () => {
    const result = sanitizeManageData(
      'users',
      {
        fullName: 'Broken Email',
        email: 'not-an-email',
      },
      'create',
    )

    expect(result).toHaveProperty('status', 400)
    await expect((result as Response).json()).resolves.toMatchObject({
      error: 'Email must be a valid email address.',
    })
  })
})

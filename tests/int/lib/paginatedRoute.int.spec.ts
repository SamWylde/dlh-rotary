import { describe, expect, it } from 'vitest'

import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

describe('paginated route helpers', () => {
  it('normalizes pagination state from result and requested page', () => {
    const state = getPaginationState(3, { page: 2, totalPages: 9 })
    expect(state).toEqual({ currentPage: 2, totalPages: 9 })
  })

  it('uses requested page and default total pages when result values are missing', () => {
    const state = getPaginationState(4, {})
    expect(state).toEqual({ currentPage: 4, totalPages: 1 })
  })

  it('returns redirect href when requested page exceeds total pages', () => {
    const href = getOutOfRangeRedirectHref('/members', 8, { totalPages: 3 }, { q: 'abc', role: 'officer' })
    expect(href).toBe('/members?q=abc&role=officer&page=3')
  })

  it('returns null redirect when requested page is in range', () => {
    const href = getOutOfRangeRedirectHref('/events', 2, { totalPages: 4 })
    expect(href).toBeNull()
  })
})


import { describe, expect, it } from 'vitest'

import { getNumericRelationshipID, getRelationshipID } from '@/utilities/getRelationshipID'

describe('getRelationshipID', () => {
  it('returns raw string and number ids', () => {
    expect(getRelationshipID('123')).toBe('123')
    expect(getRelationshipID(456)).toBe(456)
  })

  it('extracts id from populated relationship object', () => {
    expect(getRelationshipID({ id: 789, title: 'Doc' })).toBe(789)
    expect(getRelationshipID({ id: 'abc' })).toBe('abc')
  })

  it('returns null for unsupported values', () => {
    expect(getRelationshipID(null)).toBeNull()
    expect(getRelationshipID(undefined)).toBeNull()
    expect(getRelationshipID({})).toBeNull()
  })
})

describe('getNumericRelationshipID', () => {
  it('returns numeric ids as-is', () => {
    expect(getNumericRelationshipID(42)).toBe(42)
  })

  it('coerces numeric strings', () => {
    expect(getNumericRelationshipID('24')).toBe(24)
    expect(getNumericRelationshipID({ id: '101' })).toBe(101)
  })

  it('returns null for non-finite or non-numeric values', () => {
    expect(getNumericRelationshipID('not-a-number')).toBeNull()
    expect(getNumericRelationshipID(Number.NaN)).toBeNull()
    expect(getNumericRelationshipID(Infinity)).toBeNull()
  })
})


import { describe, expect, it } from 'vitest'

import { hasSafeURLProtocol, isSafeURL } from '@/utilities/urlSafety'
import { validateURL } from '@/utilities/validateURL'

describe('url safety', () => {
  it('accepts allowed protocols', () => {
    expect(isSafeURL('https://payloadcms.com')).toBe(true)
    expect(isSafeURL('http://example.com')).toBe(true)
    expect(isSafeURL('mailto:test@example.com')).toBe(true)
    expect(isSafeURL('tel:+18145551212')).toBe(true)
  })

  it('rejects disallowed protocols and malformed values', () => {
    expect(isSafeURL('javascript:alert(1)')).toBe(false)
    expect(isSafeURL('data:text/html;base64,abc')).toBe(false)
    expect(isSafeURL('not a valid url')).toBe(false)
  })

  it('keeps validateURL behavior consistent with safety utility', () => {
    expect(validateURL('https://example.com')).toBe(true)
    expect(validateURL('mailto:test@example.com')).toBe(true)
    expect(validateURL('javascript:alert(1)')).toContain('Only http, https, mailto, and tel URLs are allowed')
  })

  it('allows empty values in validateURL', () => {
    expect(validateURL(undefined)).toBe(true)
    expect(validateURL(null)).toBe(true)
    expect(validateURL('')).toBe(true)
  })

  it('checks URL instance protocol helper', () => {
    expect(hasSafeURLProtocol(new URL('https://example.com'))).toBe(true)
    expect(hasSafeURLProtocol(new URL('mailto:test@example.com'))).toBe(true)
    expect(hasSafeURLProtocol(new URL('ftp://example.com'))).toBe(false)
  })
})


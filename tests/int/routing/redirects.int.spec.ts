import { describe, expect, it } from 'vitest'

import redirects from '../../../redirects.js'

describe('route redirects', () => {
  it('keeps friendly auth and CMS aliases available', async () => {
    const routes = await redirects()

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          destination: '/manage',
          permanent: false,
          source: '/dashboard',
        }),
        expect.objectContaining({
          destination: '/login',
          permanent: false,
          source: '/signin',
        }),
        expect.objectContaining({
          destination: '/login',
          permanent: false,
          source: '/sign-in',
        }),
        expect.objectContaining({
          destination: '/login',
          permanent: false,
          source: '/log-in',
        }),
      ]),
    )
  })
})

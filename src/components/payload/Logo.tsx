import { getPayloadClient } from '@/lib/payload'
import { getMediaURL } from '@/lib/media'
import type { SiteSetting } from '@/payload-types'

// Note: Logo and Icon each fetch site-settings independently. Payload dedupes
// concurrent requests within a single render, so this is acceptable.
const getLogoURL = async (): Promise<string | null> => {
  const payload = await getPayloadClient()
  // Uses anonymous access (no user passed). Site-settings are publicly readable.
  const siteSettings = (await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    overrideAccess: false,
  })) as SiteSetting

  return getMediaURL(siteSettings.logo) || getMediaURL(siteSettings.logoSimplified)
}

const Logo = async () => {
  try {
    const logoURL = await getLogoURL()

    if (logoURL) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="Rotary Club of Downtown Lock Haven"
          src={logoURL}
          style={{ display: 'block', height: '38px', objectFit: 'contain', width: 'auto' }}
        />
      )
    }
  } catch {
    // Fall through to text fallback.
  }

  return <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>Rotary DLH</span>
}

export default Logo

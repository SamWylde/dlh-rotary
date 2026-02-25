import { getPayloadClient } from '@/lib/payload'
import { getMediaURL } from '@/lib/media'
import type { SiteSetting } from '@/payload-types'

// Note: Icon and Logo each fetch site-settings independently. Payload dedupes
// concurrent requests within a single render, so this is acceptable.
const getIconURL = async (): Promise<string | null> => {
  const payload = await getPayloadClient()
  // Uses anonymous access (no user passed). Site-settings are publicly readable.
  const siteSettings = (await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    overrideAccess: false,
  })) as SiteSetting

  return getMediaURL(siteSettings.logoSimplified) || getMediaURL(siteSettings.logo)
}

const Icon = async () => {
  try {
    const iconURL = await getIconURL()

    if (iconURL) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="Rotary DLH"
          src={iconURL}
          style={{ borderRadius: '6px', display: 'block', height: '28px', objectFit: 'contain', width: '28px' }}
        />
      )
    }
  } catch {
    // Fall through to text fallback.
  }

  return (
    <span
      style={{
        alignItems: 'center',
        border: '1px solid var(--theme-elevation-300)',
        borderRadius: '6px',
        display: 'inline-flex',
        fontSize: '0.75rem',
        fontWeight: 700,
        height: '28px',
        justifyContent: 'center',
        width: '28px',
      }}
    >
      R
    </span>
  )
}

export default Icon

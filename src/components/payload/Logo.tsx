import { getBrandingAssets } from '@/lib/branding'

const Logo = async () => {
  try {
    const { logoURL } = await getBrandingAssets()

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

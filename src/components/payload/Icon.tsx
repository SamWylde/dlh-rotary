import { getBrandingAssets } from '@/lib/branding'

const Icon = async () => {
  try {
    const { iconURL } = await getBrandingAssets()

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

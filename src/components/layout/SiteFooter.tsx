export const SiteFooter = ({
  contactEmail,
  contactPhone,
  address,
}: {
  nav?: unknown[]
  contactEmail?: string | null
  contactPhone?: string | null
  address?: string | null
  facebookUrl?: string | null
}) => (
  <footer
    className="mt-auto"
    style={{
      background: 'var(--color-footer-bg)',
      color: 'var(--color-footer-text)',
      padding: 'var(--footer-padding-y, 32px) var(--footer-padding-x, 40px)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--footer-font-size, 13px)',
    }}
  >
    <div
      className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between"
    >
      {/* Left side */}
      <div>
        <p style={{ color: 'var(--color-footer-heading)', fontWeight: 600, marginBottom: '4px' }}>
          Rotary Club of Downtown Lock Haven
        </p>
        <p>{address || 'PO Box 634, Lock Haven, PA 17745'}</p>
        <p>
          📞 <a href={`tel:${(contactPhone || '(814) 571-5324').replace(/\D/g, '')}`} style={{ color: 'inherit' }}>{contactPhone || '(814) 571-5324'}</a>
          {' · '}
          ✉️ <a href={`mailto:${contactEmail || 'dlhrotary@gmail.com'}`} style={{ color: 'inherit' }}>{contactEmail || 'dlhrotary@gmail.com'}</a>
        </p>
      </div>

      {/* Right side */}
      <div className="md:text-right">
        <p>Rotary District 7360 · Rotary International</p>
        <p style={{ marginTop: '4px' }}>
          &copy; {new Date().getFullYear()} Rotary Club of Downtown Lock Haven
        </p>
      </div>
    </div>
  </footer>
)

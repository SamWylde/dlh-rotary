export const MeetingCalloutBar = () => (
  <div
    className="full-bleed"
    style={{
      background: 'var(--color-secondary)',
      padding: 'var(--meeting-padding-y, 14px) var(--meeting-padding-x, 40px)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--meeting-font-size, 14px)',
        fontWeight: 'var(--meeting-font-weight, 600)' as unknown as number,
        color: 'var(--color-secondary-foreground)',
        flexWrap: 'wrap',
      }}
    >
      <span>Every Tuesday at 5:30 PM</span>
      <span style={{ opacity: 'var(--meeting-separator-opacity, 0.4)' }}>|</span>
      <span>Poorman Gallery, 352 E. Water St., Lock Haven, PA</span>
      <span style={{ opacity: 'var(--meeting-separator-opacity, 0.4)' }}>|</span>
      <span>Social time starts at 5:15</span>
    </div>
  </div>
)

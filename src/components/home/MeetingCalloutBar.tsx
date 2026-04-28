export const MeetingCalloutBar = () => (
  <div
    className="full-bleed"
    style={{
      background: 'var(--color-secondary)',
      padding: 'var(--meeting-padding-y, 14px) var(--meeting-padding-x, 24px)',
    }}
  >
    <div
      className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:flex-wrap sm:gap-6"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--meeting-font-size, 14px)',
        fontWeight: 'var(--meeting-font-weight, 600)' as unknown as number,
        color: 'var(--color-secondary-foreground)',
      }}
    >
      <span>Meetings every Tuesday at 5:30 PM</span>
      <span
        className="hidden sm:inline"
        style={{ opacity: 'var(--meeting-separator-opacity, 0.4)' }}
      >
        |
      </span>
      <span>Poorman Gallery, 352 E. Water St., Lock Haven, PA</span>
      <span
        className="hidden sm:inline"
        style={{ opacity: 'var(--meeting-separator-opacity, 0.4)' }}
      >
        |
      </span>
      <span>Social time starts at 5:15</span>
    </div>
  </div>
)

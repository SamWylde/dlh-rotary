export const SectionSkeleton = () => (
  <div className="grid gap-4">
    <div className="h-8 w-48 animate-pulse rounded bg-muted" />
    <div className="grid gap-3">
      {[1, 2, 3].map((i) => (
        <div className="h-20 animate-pulse rounded-lg border border-border bg-muted" key={i} />
      ))}
    </div>
  </div>
)

export const ProjectsSkeleton = () => (
  <div className="full-bleed" style={{ background: 'var(--color-background)' }}>
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="h-48 animate-pulse rounded-lg bg-muted" key={i} />
        ))}
      </div>
    </div>
  </div>
)


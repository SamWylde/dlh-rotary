'use client'

export default function FrontendError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="grid place-items-center gap-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <button
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </section>
  )
}

import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h1 className="text-3xl font-semibold">Page Not Found</h1>
      <p>The page you requested does not exist or you do not have access.</p>
      <Link className="underline" href="/">
        Return home
      </Link>
    </section>
  )
}
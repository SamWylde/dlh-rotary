import Link from 'next/link'

import { requireUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'

export default async function AccountPage() {
  const user = await requireUser()
  const payload = await getPayloadClient()

  const me = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 1,
    overrideAccess: false,
    user,
  })

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">My Account</h1>
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="font-medium">{me.fullName}</p>
        <p className="text-sm text-muted-foreground">{me.email}</p>
        {me.title ? <p className="text-sm">{me.title}</p> : null}
      </div>
      <p className="text-sm text-muted-foreground">
        Update profile details in the admin panel at{' '}
        <Link className="underline" href="/admin">
          /admin
        </Link>
        .
      </p>
    </section>
  )
}

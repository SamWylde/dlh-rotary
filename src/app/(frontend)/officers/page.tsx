import { getCurrentUser } from '@/lib/auth'
import { getOfficers } from '@/lib/content'

export default async function OfficersPage() {
  const { user } = await getCurrentUser()
  const officers = await getOfficers(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Current Officers</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {officers.docs.map((officer) => (
          <article className="rounded-lg border border-border bg-card p-4" key={officer.id}>
            <h2 className="text-xl font-medium">{officer.fullName}</h2>
            {officer.title ? <p className="text-sm text-muted-foreground">{officer.title}</p> : null}
            {officer.email ? <p className="mt-2 text-sm">{officer.email}</p> : null}
            {officer.phone ? <p className="text-sm">{officer.phone}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
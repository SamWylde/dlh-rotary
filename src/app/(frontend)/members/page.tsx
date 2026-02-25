import { requireUser } from '@/lib/auth'
import { getMemberDirectory } from '@/lib/content'

export default async function MembersPage() {
  const user = await requireUser()
  const members = await getMemberDirectory(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Member Directory</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {members.docs.map((member) => (
          <article className="rounded-lg border border-border bg-card p-4" key={member.id}>
            <p className="font-medium">{member.fullName}</p>
            {member.title ? <p className="text-sm text-muted-foreground">{member.title}</p> : null}
            {member.email ? <p className="mt-2 text-sm">{member.email}</p> : null}
            {member.phone ? <p className="text-sm">{member.phone}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
import type { SessionUser } from '@/lib/auth'
import { getOfficers } from '@/lib/content'
import type { Page } from '@/payload-types'

type OfficerGridBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'officerGridBlock' }>

const normalizeLimit = (value: number | null | undefined): number => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.floor(value)
  }

  return 6
}

export const OfficerGridBlock = async ({
  block,
  user,
}: {
  block: OfficerGridBlockData
  user: SessionUser | null
}) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const limit = normalizeLimit(block.limit)
  const officers = await getOfficers(user, limit)

  if (!heading && officers.docs.length === 0) {
    return null
  }

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {officers.docs.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {officers.docs.map((officer) => (
            <article className="rounded-lg border border-border bg-background p-4" key={officer.id}>
              <h3 className="text-xl font-medium">{officer.fullName}</h3>
              {officer.title ? <p className="text-sm text-muted-foreground">{officer.title}</p> : null}
              {block.showEmail && officer.email ? <p className="mt-2 text-sm">{officer.email}</p> : null}
              {block.showPhone && officer.phone ? <p className="text-sm">{officer.phone}</p> : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No officers listed yet.</p>
      )}
    </section>
  )
}

import type { User } from '@/payload-types'

export type MemberCardProps = {
  member: Pick<User, 'id' | 'fullName' | 'title' | 'email' | 'phone'>
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <p className="font-medium">{member.fullName}</p>
      {member.title ? <p className="text-sm text-muted-foreground">{member.title}</p> : null}
      {member.email ? <p className="mt-2 text-sm">{member.email}</p> : null}
      {member.phone ? <p className="text-sm">{member.phone}</p> : null}
    </article>
  )
}

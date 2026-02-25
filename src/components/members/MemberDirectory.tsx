import Link from 'next/link'

import { MemberCard } from '@/components/members/MemberCard'
import type { User } from '@/payload-types'

const roleOptions: Array<{ label: string; value: User['role'] }> = [
  { label: 'Admin', value: 'admin' },
  { label: 'Officer', value: 'officer' },
  { label: 'Member', value: 'member' },
]

export type MemberDirectoryProps = {
  members: Array<Pick<User, 'id' | 'fullName' | 'title' | 'email' | 'phone'>>
  query?: string
  role?: User['role']
}

export const MemberDirectory = ({ members, query, role }: MemberDirectoryProps) => {
  return (
    <div className="grid gap-4">
      <form className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[2fr_1fr_auto]" method="get">
        <label className="grid gap-1 text-sm">
          <span>Name or title</span>
          <input
            className="rounded border border-border bg-background px-3 py-2"
            defaultValue={query || ''}
            name="q"
            placeholder="Search members"
            type="search"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Role</span>
          <select
            className="rounded border border-border bg-background px-3 py-2"
            defaultValue={role || ''}
            name="role"
          >
            <option value="">All roles</option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">
            Apply
          </button>
          <Link className="rounded border border-border px-4 py-2 text-sm" href="/members">
            Clear
          </Link>
        </div>
      </form>

      {members.length === 0 ? (
        <p className="text-muted-foreground">No members in the directory yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}

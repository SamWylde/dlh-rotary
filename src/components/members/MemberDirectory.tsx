import { FilterForm } from '@/components/filters/FilterForm'
import { ROLE_LABELS, USER_ROLES } from '@/constants/roles'
import { MemberCard } from '@/components/members/MemberCard'
import type { User } from '@/payload-types'

const roleOptions: Array<{ label: string; value: User['role'] }> = USER_ROLES.map((role) => ({
  label: ROLE_LABELS[role],
  value: role,
}))

export type MemberDirectoryProps = {
  members: Array<Pick<User, 'id' | 'fullName' | 'title' | 'email' | 'phone'>>
  query?: string
  role?: User['role']
}

export const MemberDirectory = ({ members, query, role }: MemberDirectoryProps) => {
  return (
    <div className="grid gap-4">
      <FilterForm clearHref="/members">
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
      </FilterForm>

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

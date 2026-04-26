import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireAdminUser } from '@/lib/manage/auth'

export default async function ManageMembersPage() {
  const user = await requireAdminUser()

  return <ManageResourcePage resource="users" userRole={user.role} />
}

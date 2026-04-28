import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManageFormSubmissionsPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="form-submissions" userRole={user.role} />
}

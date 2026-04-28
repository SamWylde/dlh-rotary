import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManageFormsPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="forms" userRole={user.role} />
}

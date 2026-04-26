import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManagePagesPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="pages" userRole={user.role} />
}

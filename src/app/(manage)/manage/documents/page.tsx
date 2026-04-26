import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManageDocumentsPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="documents" userRole={user.role} />
}

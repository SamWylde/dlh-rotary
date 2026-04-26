import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManageEventsPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="events" userRole={user.role} />
}

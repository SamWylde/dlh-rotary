import { ManageResourcePage } from '@/components/manage/ManageResourcePage'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManageAnnouncementsPage() {
  const user = await requireManageUser()

  return <ManageResourcePage resource="announcements" userRole={user.role} />
}

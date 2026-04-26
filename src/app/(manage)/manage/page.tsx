import { ManageDashboard } from '@/components/manage/ManageDashboard'
import { requireManageUser } from '@/lib/manage/auth'

export default async function ManagePage() {
  const user = await requireManageUser()

  return <ManageDashboard user={user} />
}

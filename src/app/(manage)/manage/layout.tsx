import React from 'react'

import { ManageRefineProvider } from '@/components/manage/ManageRefineProvider'
import { ManageShell } from '@/components/manage/ManageShell'
import { requireManageUser } from '@/lib/manage/auth'

export const dynamic = 'force-dynamic'

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const user = await requireManageUser()

  return (
    <ManageRefineProvider>
      <ManageShell user={user}>{children}</ManageShell>
    </ManageRefineProvider>
  )
}

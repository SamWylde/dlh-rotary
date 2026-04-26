import { NextResponse } from 'next/server'

import { requireManageApiSession, isErrorResponse } from '@/lib/manage/api'

export const dynamic = 'force-dynamic'

export const GET = async (): Promise<NextResponse> => {
  const session = await requireManageApiSession()
  if (isErrorResponse(session)) return session

  return NextResponse.json({
    user: session.user,
    permissions: session.user.role,
  })
}

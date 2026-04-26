import { NextResponse } from 'next/server'

import {
  isErrorResponse,
  manageJsonError,
  requireManageApiSession,
  sendInviteEmail,
} from '@/lib/manage/api'

export const dynamic = 'force-dynamic'

export const POST = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
  const session = await requireManageApiSession(true)
  if (isErrorResponse(session)) return session

  const { id } = await params
  const user = await session.payload
    .findByID({
      collection: 'users',
      id,
      depth: 0,
      overrideAccess: false,
      user: session.user,
    })
    .catch(() => null)

  if (!user) return manageJsonError('Member not found.', 404)

  const email = typeof user.email === 'string' ? user.email.trim() : ''
  if (!email) return manageJsonError('Member does not have an email address.', 400)

  const invite = await sendInviteEmail({ email, payload: session.payload, user: session.user })

  return NextResponse.json({ invite })
}

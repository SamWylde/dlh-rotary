import type { NextResponse } from 'next/server'

import { createManageResource, listManageResource } from '@/lib/manage/api'

export const dynamic = 'force-dynamic'

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
): Promise<NextResponse> => {
  const { resource } = await params
  return listManageResource(request, resource)
}

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
): Promise<NextResponse> => {
  const { resource } = await params
  return createManageResource(request, resource)
}

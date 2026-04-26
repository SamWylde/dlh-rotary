import type { NextResponse } from 'next/server'

import { deleteManageResource, getManageResource, updateManageResource } from '@/lib/manage/api'

export const dynamic = 'force-dynamic'

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
): Promise<NextResponse> => {
  const { resource, id } = await params
  return getManageResource(resource, id)
}

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
): Promise<NextResponse> => {
  const { resource, id } = await params
  return updateManageResource(request, resource, id)
}

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
): Promise<NextResponse> => {
  const { resource, id } = await params
  return deleteManageResource(resource, id)
}

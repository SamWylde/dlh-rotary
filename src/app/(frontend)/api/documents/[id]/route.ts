import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'
import { getServerURL } from '@/lib/url'
import { getRelationshipID } from '@/utilities/getRelationshipID'

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> => {
  const { user } = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const payload = await getPayloadClient()

  let document

  try {
    document = await payload.findByID({
      collection: 'documents',
      id,
      depth: 1,
      overrideAccess: false,
      user,
    })
  } catch {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  const mediaID = getRelationshipID(document.file)

  if (!mediaID) {
    return NextResponse.json({ error: 'Missing file relation' }, { status: 500 })
  }

  let media

  try {
    media = await payload.findByID({
      collection: 'media',
      id: mediaID,
      depth: 0,
      overrideAccess: true,
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const fileURL = (media as { url?: string }).url
  const rawFilename = (media as { filename?: string }).filename || `${document.title}.bin`
  const filename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_')

  if (!fileURL) {
    return NextResponse.json({ error: 'File URL unavailable' }, { status: 500 })
  }

  try {
    const parsed = new URL(fileURL, getServerURL())
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid file URL protocol' }, { status: 500 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid file URL' }, { status: 500 })
  }

  const upstream = await fetch(fileURL)

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Unable to fetch file from storage' }, { status: 502 })
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
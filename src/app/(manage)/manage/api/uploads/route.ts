import { NextResponse } from 'next/server'

import { isErrorResponse, manageJsonError, requireManageApiSession } from '@/lib/manage/api'

export const dynamic = 'force-dynamic'

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set([
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const hasSignature = (buffer: Buffer, signature: number[], offset = 0): boolean =>
  signature.every((byte, index) => buffer[offset + index] === byte)

const detectMimeType = (buffer: Buffer, fileName: string): string | null => {
  const lowerName = fileName.toLowerCase()

  if (buffer.length >= 3 && hasSignature(buffer, [0xff, 0xd8, 0xff])) return 'image/jpeg'
  if (buffer.length >= 8 && hasSignature(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return 'image/png'
  if (
    buffer.length >= 6 &&
    (buffer.subarray(0, 6).toString('ascii') === 'GIF87a' ||
      buffer.subarray(0, 6).toString('ascii') === 'GIF89a')
  ) {
    return 'image/gif'
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp'
  }
  if (buffer.length >= 5 && buffer.subarray(0, 5).toString('ascii') === '%PDF-')
    return 'application/pdf'
  if (
    buffer.length >= 8 &&
    hasSignature(buffer, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]) &&
    lowerName.endsWith('.doc')
  ) {
    return 'application/msword'
  }
  if (
    buffer.length >= 4 &&
    hasSignature(buffer, [0x50, 0x4b, 0x03, 0x04]) &&
    lowerName.endsWith('.docx')
  ) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }

  return null
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const session = await requireManageApiSession()
  if (isErrorResponse(session)) return session

  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return manageJsonError('File is required.', 400)
  }

  if (file.size <= 0) {
    return manageJsonError('File must not be empty.', 400)
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return manageJsonError('File must be 12MB or smaller.', 400)
  }

  const fileName = file.name.split(/[\\/]/).pop()?.trim() || 'upload'
  const alt = String(formData.get('alt') || file.name).trim()
  if (!alt) {
    return manageJsonError('Alt text is required.', 400)
  }

  const isPublic = String(formData.get('isPublic') || 'true') !== 'false'
  const caption = String(formData.get('caption') || '').trim() || undefined
  const buffer = Buffer.from(await file.arrayBuffer())
  const declaredMimeType = file.type.toLowerCase()
  const detectedMimeType = detectMimeType(buffer, fileName)

  if (
    declaredMimeType &&
    declaredMimeType !== 'application/octet-stream' &&
    !ALLOWED_MIME_TYPES.has(declaredMimeType)
  ) {
    return manageJsonError('File type is not allowed.', 400)
  }

  if (!detectedMimeType || !ALLOWED_MIME_TYPES.has(detectedMimeType)) {
    return manageJsonError('File content does not match an allowed file type.', 400)
  }

  if (
    declaredMimeType &&
    declaredMimeType !== 'application/octet-stream' &&
    declaredMimeType !== detectedMimeType
  ) {
    return manageJsonError('File content does not match the declared file type.', 400)
  }

  const doc = await session.payload.create({
    collection: 'media',
    data: {
      alt,
      caption,
      isPublic,
    },
    file: {
      data: buffer,
      mimetype: detectedMimeType,
      name: fileName,
      size: file.size,
    },
    depth: 0,
    overrideAccess: false,
    user: session.user,
  })

  return NextResponse.json({ doc }, { status: 201 })
}

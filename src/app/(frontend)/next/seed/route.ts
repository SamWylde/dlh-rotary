import config from '@payload-config'
import { seed } from '@/seed'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export const POST = async (request: Request): Promise<NextResponse> => {
  const expectedSecret = process.env.SEED_SECRET

  if (!expectedSecret) {
    return NextResponse.json({ error: 'SEED_SECRET env var is not configured' }, { status: 403 })
  }

  const providedSecret = request.headers.get('x-seed-secret')

  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const force = url.searchParams.get('force') === 'true'

  const payload = await getPayload({ config })
  const result = await seed(payload, { force })

  return NextResponse.json(result)
}

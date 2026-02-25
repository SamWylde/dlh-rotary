import config from '@payload-config'
import { seed } from '@/seed'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export const POST = async (request: Request): Promise<NextResponse> => {
  const expectedSecret = process.env.SEED_SECRET
  const providedSecret = request.headers.get('x-seed-secret')

  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const force = url.searchParams.get('force') === 'true'

  const payload = await getPayload({ config })
  const result = await seed(payload, { force })

  return NextResponse.json(result)
}
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'

type Body = {
  eventID?: string | number
  status?: 'yes' | 'no' | 'maybe'
  guests?: number
  note?: string
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const { user } = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as Body

  if (!body.eventID || !body.status || !['yes', 'no', 'maybe'].includes(body.status)) {
    return NextResponse.json({ error: 'Invalid RSVP payload' }, { status: 400 })
  }

  const eventID = typeof body.eventID === 'string' ? Number(body.eventID) : body.eventID

  if (!Number.isFinite(eventID)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
  }

  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: 'rsvps',
    where: {
      and: [
        { event: { equals: eventID } },
        { user: { equals: user.id } },
      ],
    },
    limit: 1,
    overrideAccess: false,
    user,
  })

  if (existing.docs.length > 0) {
    const updated = await payload.update({
      collection: 'rsvps',
      id: existing.docs[0].id,
      data: {
        status: body.status,
        guests: body.guests ?? 0,
        note: body.note,
      },
      overrideAccess: false,
      user,
    })

    return NextResponse.json({ id: updated.id, status: updated.status })
  }

  const userID = typeof user.id === 'string' ? Number(user.id) : user.id

  const created = await payload.create({
    collection: 'rsvps',
    draft: false,
    data: {
      event: eventID,
      user: userID,
      // eventUserKey is auto-populated by beforeValidate hook
      eventUserKey: `${eventID}:${userID}`,
      status: body.status,
      guests: body.guests ?? 0,
      note: body.note ?? undefined,
    },
    overrideAccess: false,
    user,
  })

  return NextResponse.json({ id: created.id, status: created.status })
}

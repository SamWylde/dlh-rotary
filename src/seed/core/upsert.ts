import type { Payload } from 'payload'

type UpsertArgs = {
  collection: Parameters<Payload['find']>[0]['collection']
  uniqueField: string
  uniqueValue: string
  data: Record<string, unknown>
}

export const upsertByField = async (
  payload: Payload,
  args: UpsertArgs,
): Promise<string | number> => {
  const { collection, uniqueField, uniqueValue, data } = args

  const existing = await payload.find({
    collection,
    where: { [uniqueField]: { equals: uniqueValue } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0]?.id as string | number
    await payload.update({ collection, id, data, overrideAccess: true })
    return id
  }

  const created = await payload.create({ collection, data, overrideAccess: true })
  return created.id as string | number
}


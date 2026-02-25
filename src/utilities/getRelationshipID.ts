/**
 * Extract the ID from a Payload relationship field value.
 *
 * Relationship fields can be a raw ID (string or number depending on DB
 * adapter) or a populated document object with an `id` property.
 */
export const getRelationshipID = (value: unknown): string | number | null => {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }
  return null
}

/**
 * Like getRelationshipID but always coerces to a finite number.
 * Use when the downstream API (e.g. payload.findByID) requires a numeric ID.
 */
export const getNumericRelationshipID = (value: unknown): number | null => {
  const id = getRelationshipID(value)
  if (typeof id === 'number' && Number.isFinite(id)) return id
  if (typeof id === 'string' && id.trim().length > 0) {
    const parsed = Number(id)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

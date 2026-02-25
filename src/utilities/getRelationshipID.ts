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

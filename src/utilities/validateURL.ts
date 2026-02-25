/** Payload field validate function that checks for a valid URL when a value is provided. */
export const validateURL = (value: string | null | undefined): string | true => {
  if (!value) return true
  try {
    new URL(value)
    return true
  } catch {
    return 'Please enter a valid URL (e.g. https://example.com)'
  }
}

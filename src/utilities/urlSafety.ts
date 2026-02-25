export const SAFE_URL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'] as const

type SafeURLProtocol = (typeof SAFE_URL_PROTOCOLS)[number]

export const hasSafeURLProtocol = (url: URL): boolean =>
  SAFE_URL_PROTOCOLS.includes(url.protocol as SafeURLProtocol)

export const isSafeURL = (value: string): boolean => {
  try {
    const url = new URL(value)
    return hasSafeURLProtocol(url)
  } catch {
    return false
  }
}


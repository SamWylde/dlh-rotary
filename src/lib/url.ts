import { headers } from 'next/headers'

export const getServerURL = async (): Promise<string> => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  const headerStore = await headers()
  const host = headerStore.get('x-forwarded-host') || headerStore.get('host') || 'localhost:3000'
  const protocol = headerStore.get('x-forwarded-proto') || 'http'

  return `${protocol}://${host}`
}
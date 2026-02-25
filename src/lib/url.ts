export const getServerURL = (): string => {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

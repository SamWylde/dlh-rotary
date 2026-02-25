export const getNextTuesday = (): Date => {
  const now = new Date()
  const day = now.getDay()
  const daysUntilTuesday = (2 - day + 7) % 7 || 7
  const next = new Date(now)
  next.setDate(now.getDate() + daysUntilTuesday)
  next.setHours(17, 30, 0, 0)
  return next
}


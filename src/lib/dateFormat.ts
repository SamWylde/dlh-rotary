type DateStyle = Intl.DateTimeFormatOptions['dateStyle']
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle']

const CLUB_TIME_ZONE = 'UTC'

const pad = (value: number): string => String(value).padStart(2, '0')

export const formatClubDate = (
  value: string | number | Date,
  options: { dateStyle?: DateStyle; timeStyle?: TimeStyle } = {},
): string => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toLocaleString('en-US', {
    dateStyle: options.dateStyle ?? 'medium',
    timeStyle: options.timeStyle,
    timeZone: CLUB_TIME_ZONE,
  })
}

export const formatClubTime = (value: string | number | Date): string => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toLocaleString('en-US', {
    timeStyle: 'short',
    timeZone: CLUB_TIME_ZONE,
  })
}

export const toClubCalendarDateTime = (value: string | number | Date): string => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return [
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`,
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`,
  ].join('T')
}

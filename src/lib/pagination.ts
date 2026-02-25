export type PaginationQuery = Record<string, string | undefined>

export const parsePageParam = (value: string | string[] | undefined): number => {
  const candidate = Array.isArray(value) ? value[0] : value
  const parsed = Number(candidate)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

export const parseStringParam = (value: string | string[] | undefined): string | undefined => {
  const candidate = Array.isArray(value) ? value[0] : value

  if (typeof candidate !== 'string') {
    return undefined
  }

  const normalized = candidate.trim()
  return normalized.length > 0 ? normalized : undefined
}

export const parseEnumParam = <T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
): T | undefined => {
  const candidate = parseStringParam(value)

  if (!candidate) {
    return undefined
  }

  return allowed.includes(candidate as T) ? (candidate as T) : undefined
}

export const buildPageHref = (basePath: string, page: number, query?: PaginationQuery): string => {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query || {})) {
    if (!value) continue
    params.set(key, value)
  }

  if (page > 1) {
    params.set('page', String(page))
  }

  const queryString = params.toString()
  return queryString.length > 0 ? `${basePath}?${queryString}` : basePath
}

export const parsePageParam = (value: string | string[] | undefined): number => {
  const candidate = Array.isArray(value) ? value[0] : value
  const parsed = Number(candidate)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

export const buildPageHref = (basePath: string, page: number): string => {
  if (page <= 1) {
    return basePath
  }

  return `${basePath}?page=${page}`
}

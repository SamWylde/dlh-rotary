import { buildPageHref, type PaginationQuery } from '@/lib/pagination'

type PaginatedResult = {
  page?: number | null
  totalPages?: number | null
}

export type PaginationState = {
  currentPage: number
  totalPages: number
}

export const getPaginationState = (
  requestedPage: number,
  result: PaginatedResult,
): PaginationState => ({
  currentPage: result.page ?? requestedPage,
  totalPages: result.totalPages ?? 1,
})

export const getOutOfRangeRedirectHref = (
  basePath: string,
  requestedPage: number,
  result: PaginatedResult,
  query?: PaginationQuery,
): string | null => {
  if (!result.totalPages || requestedPage <= result.totalPages) {
    return null
  }

  return buildPageHref(basePath, result.totalPages, query)
}


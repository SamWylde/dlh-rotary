import Link from 'next/link'

import { buildPageHref, type PaginationQuery } from '@/lib/pagination'

type PaginationControlsProps = {
  basePath: string
  currentPage: number
  totalPages: number
  query?: PaginationQuery
}

export const PaginationControls = ({ basePath, currentPage, totalPages, query }: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null
  }

  const previousHref = currentPage > 1 ? buildPageHref(basePath, currentPage - 1, query) : null
  const nextHref = currentPage < totalPages ? buildPageHref(basePath, currentPage + 1, query) : null

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4 pt-2">
      <div>
        {previousHref ? (
          <Link className="rounded border border-border px-3 py-1 text-sm hover:border-primary" href={previousHref}>
            Previous
          </Link>
        ) : (
          <span className="rounded border border-border px-3 py-1 text-sm text-muted-foreground">Previous</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div>
        {nextHref ? (
          <Link className="rounded border border-border px-3 py-1 text-sm hover:border-primary" href={nextHref}>
            Next
          </Link>
        ) : (
          <span className="rounded border border-border px-3 py-1 text-sm text-muted-foreground">Next</span>
        )}
      </div>
    </nav>
  )
}

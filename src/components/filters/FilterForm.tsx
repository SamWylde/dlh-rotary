import Link from 'next/link'

import type { ReactNode } from 'react'

export type FilterFormProps = {
  children: ReactNode
  clearHref: string
  applyLabel?: string
  clearLabel?: string
}

export const FilterForm = ({
  children,
  clearHref,
  applyLabel = 'Apply',
  clearLabel = 'Clear',
}: FilterFormProps) => (
  <form className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[2fr_1fr_auto]" method="get">
    {children}
    <div className="flex items-end gap-2">
      <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">
        {applyLabel}
      </button>
      <Link className="rounded border border-border px-4 py-2 text-sm" href={clearHref}>
        {clearLabel}
      </Link>
    </div>
  </form>
)


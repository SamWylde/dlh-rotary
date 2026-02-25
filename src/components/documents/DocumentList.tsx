import Link from 'next/link'

import { categoryOptions } from '@/components/documents/categoryLabels'
import { DocumentCard } from '@/components/documents/DocumentCard'
import type { Document } from '@/payload-types'

export type DocumentListProps = {
  documents: Array<Pick<Document, 'id' | 'title' | 'category' | 'description'>>
  category?: Document['category']
  query?: string
}

export const DocumentList = ({ documents, category, query }: DocumentListProps) => {
  return (
    <div className="grid gap-4">
      <form className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[2fr_1fr_auto]" method="get">
        <label className="grid gap-1 text-sm">
          <span>Search documents</span>
          <input
            className="rounded border border-border bg-background px-3 py-2"
            defaultValue={query || ''}
            name="q"
            placeholder="Title or description"
            type="search"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Category</span>
          <select
            className="rounded border border-border bg-background px-3 py-2"
            defaultValue={category || ''}
            name="category"
          >
            <option value="">All categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">
            Apply
          </button>
          <Link className="rounded border border-border px-4 py-2 text-sm" href="/documents">
            Clear
          </Link>
        </div>
      </form>

      {documents.length === 0 ? (
        <p className="text-muted-foreground">No documents yet.</p>
      ) : (
        <div className="grid gap-3">
          {documents.map((document) => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      )}
    </div>
  )
}

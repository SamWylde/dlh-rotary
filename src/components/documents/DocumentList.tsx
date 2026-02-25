import { categoryOptions } from '@/components/documents/categoryLabels'
import { DocumentCard } from '@/components/documents/DocumentCard'
import { FilterForm } from '@/components/filters/FilterForm'
import type { Document } from '@/payload-types'

export type DocumentListProps = {
  documents: Array<Pick<Document, 'id' | 'title' | 'category' | 'description'>>
  category?: Document['category']
  query?: string
}

export const DocumentList = ({ documents, category, query }: DocumentListProps) => {
  return (
    <div className="grid gap-4">
      <FilterForm clearHref="/documents">
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
      </FilterForm>

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

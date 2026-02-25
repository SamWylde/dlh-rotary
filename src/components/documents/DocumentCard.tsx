import { categoryLabels } from '@/components/documents/categoryLabels'
import type { Document } from '@/payload-types'

export type DocumentCardProps = {
  document: Pick<Document, 'id' | 'title' | 'category' | 'description'>
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <p className="font-medium">{document.title}</p>
      <p className="text-sm text-muted-foreground">{categoryLabels[document.category]}</p>
      {document.description ? <p className="mt-2 text-sm">{document.description}</p> : null}
      <a className="mt-3 inline-flex text-sm underline" href={`/api/documents/${document.id}`}>
        Download
      </a>
    </article>
  )
}

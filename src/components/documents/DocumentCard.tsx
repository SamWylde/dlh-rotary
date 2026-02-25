import { categoryLabels } from '@/components/documents/categoryLabels'
import { getMediaURL } from '@/lib/media'
import type { Document } from '@/payload-types'

export type DocumentCardProps = {
  document: Pick<Document, 'id' | 'title' | 'category' | 'description' | 'file'>
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const fileURL = getMediaURL(document.file)

  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <p className="font-medium">{document.title}</p>
      <p className="text-sm text-muted-foreground">{categoryLabels[document.category]}</p>
      {document.description ? <p className="mt-2 text-sm">{document.description}</p> : null}
      {fileURL ? (
        <a className="mt-3 inline-flex text-sm underline" href={fileURL} rel="noopener noreferrer" target="_blank">
          Download
        </a>
      ) : null}
    </article>
  )
}

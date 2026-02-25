import { requireUser } from '@/lib/auth'
import { getDocuments } from '@/lib/content'

export default async function DocumentsPage() {
  const user = await requireUser()
  const documents = await getDocuments(user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Document Repository</h1>
      <div className="grid gap-3">
        {documents.docs.map((document) => (
          <article className="rounded-lg border border-border bg-card p-4" key={document.id}>
            <p className="font-medium">{document.title}</p>
            <p className="text-sm text-muted-foreground">{document.category}</p>
            {document.description ? <p className="mt-2 text-sm">{document.description}</p> : null}
            <a className="mt-3 inline-flex text-sm underline" href={`/api/documents/${document.id}`}>
              Download
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
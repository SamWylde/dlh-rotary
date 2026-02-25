import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PaginationControls } from '@/components/layout/PaginationControls'
import { requireUser } from '@/lib/auth'
import { getDocumentsPage } from '@/lib/content'
import { buildPageHref, parsePageParam } from '@/lib/pagination'

export const metadata: Metadata = {
  title: 'Documents | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const documents = await getDocumentsPage({ page, limit: PER_PAGE }, user)
  const currentPage = documents.page ?? page
  const totalPages = documents.totalPages ?? 1

  if (documents.totalPages && page > documents.totalPages) {
    redirect(buildPageHref('/documents', documents.totalPages))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Document Repository</h1>
      {documents.docs.length === 0 ? (
        <p className="text-muted-foreground">No documents yet.</p>
      ) : (
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
      )}
      <PaginationControls basePath="/documents" currentPage={currentPage} totalPages={totalPages} />
    </section>
  )
}

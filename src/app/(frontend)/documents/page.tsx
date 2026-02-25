import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { DocumentList } from '@/components/documents/DocumentList'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { requireUser } from '@/lib/auth'
import { getDocumentsPage } from '@/lib/content'
import { DOCUMENT_CATEGORY_VALUES } from '@/constants/documentCategories'
import { parseEnumParam, parsePageParam, parseStringParam } from '@/lib/pagination'
import { getOutOfRangeRedirectHref, getPaginationState } from '@/lib/paginatedRoute'

export const metadata: Metadata = {
  title: 'Documents | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[]; q?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam, category: categoryParam, q: qParam } = await searchParams
  const page = parsePageParam(pageParam)
  const category = parseEnumParam(categoryParam, DOCUMENT_CATEGORY_VALUES)
  const q = parseStringParam(qParam)
  const query = {
    category,
    q,
  }

  const documents = await getDocumentsPage({ page, limit: PER_PAGE, category, q }, user)
  const redirectHref = getOutOfRangeRedirectHref('/documents', page, documents, query)

  if (redirectHref) {
    redirect(redirectHref)
  }

  const { currentPage, totalPages } = getPaginationState(page, documents)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Document Repository</h1>
      <DocumentList category={category} documents={documents.docs} query={q} />
      <PaginationControls basePath="/documents" currentPage={currentPage} totalPages={totalPages} query={query} />
    </section>
  )
}

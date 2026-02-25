import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { DocumentList } from '@/components/documents/DocumentList'
import { PaginationControls } from '@/components/layout/PaginationControls'
import { requireUser } from '@/lib/auth'
import { getDocumentsPage } from '@/lib/content'
import { buildPageHref, parseEnumParam, parsePageParam, parseStringParam } from '@/lib/pagination'
import type { Document } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Documents | Rotary Club of Downtown Lock Haven',
}

const PER_PAGE = 20
const DOCUMENT_CATEGORIES = ['minutes', 'bylaws', 'financial', 'ri-resources', 'forms', 'other'] as const

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[]; q?: string | string[] }>
}) {
  const user = await requireUser()
  const { page: pageParam, category: categoryParam, q: qParam } = await searchParams
  const page = parsePageParam(pageParam)
  const category = parseEnumParam(categoryParam, DOCUMENT_CATEGORIES) as Document['category'] | undefined
  const q = parseStringParam(qParam)
  const query = {
    category,
    q,
  }

  const documents = await getDocumentsPage({ page, limit: PER_PAGE, category, q }, user)
  const currentPage = documents.page ?? page
  const totalPages = documents.totalPages ?? 1

  if (documents.totalPages && page > documents.totalPages) {
    redirect(buildPageHref('/documents', documents.totalPages, query))
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Document Repository</h1>
      <DocumentList category={category} documents={documents.docs} query={q} />
      <PaginationControls basePath="/documents" currentPage={currentPage} totalPages={totalPages} query={query} />
    </section>
  )
}

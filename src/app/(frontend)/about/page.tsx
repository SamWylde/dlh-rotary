import { PageLayoutRenderer } from '@/components/pages/PageLayoutRenderer'
import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'

export default async function AboutPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('about', user)

  if (page && Array.isArray(page.layout) && page.layout.length > 0) {
    return <PageLayoutRenderer page={page} user={user} />
  }

  return (
    <article className="prose max-w-none rounded-xl border border-border bg-card p-8">
      <h1>About Our Club</h1>
      <p>
        The Rotary Club of Downtown Lock Haven serves Clinton County through local projects, scholarships,
        and partnerships with community organizations.
      </p>
      {page?.content ? <p>{lexicalToPlainText(page.content)}</p> : null}
    </article>
  )
}
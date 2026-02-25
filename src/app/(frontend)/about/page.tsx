import { getCurrentUser } from '@/lib/auth'
import { getPageBySlug } from '@/lib/content'
import { lexicalToPlainText } from '@/lib/richText'

export default async function AboutPage() {
  const { user } = await getCurrentUser()
  const page = await getPageBySlug('about', user)

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
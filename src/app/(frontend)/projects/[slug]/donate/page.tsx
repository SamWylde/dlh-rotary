import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageHero } from '@/components/layout/PageHero'
import { FlagsOfHonorSponsorSection } from '@/components/projects/FlagsOfHonorSponsorSection'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/auth'
import { getProjectBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Support Flags of Honor | Rotary Club of Downtown Lock Haven',
  description: 'Flag sponsorship and corporate sponsorship information for Flags of Honor 2026.',
}

export default async function ProjectDonatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (slug !== 'flags-of-honor') {
    notFound()
  }

  const { user } = await getCurrentUser()
  const project = await getProjectBySlug(slug, user)

  if (!project) {
    notFound()
  }

  return (
    <div className="-mt-8 -mb-8">
      <PageHero
        title="Support Flags of Honor"
        subtitle="Donate, sponsor, and help fund scholarships and local community impact"
      />

      <section
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '32px clamp(0px, 4vw, 40px) 48px',
        }}
      >
        <div className="mb-6 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href={`/projects/${project.slug}`}>Back to Flags of Honor</Link>
          </Button>
        </div>
        <FlagsOfHonorSponsorSection />
      </section>
    </div>
  )
}

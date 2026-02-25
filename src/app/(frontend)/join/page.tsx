import type { Metadata } from 'next'

import { InterestForm } from '@/components/forms/InterestForm'
import { getCurrentUser } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Join Us | Rotary Club of Downtown Lock Haven',
}

export default async function JoinPage() {
  const { user } = await getCurrentUser()

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Join Us</h1>
      <p>
        All are welcome to join us for fun, fellowship, and guest speakers. Use the contact form to express interest,
        and an officer will follow up.
      </p>
      <InterestForm user={user} />
    </section>
  )
}

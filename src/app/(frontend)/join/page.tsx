import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import { getCurrentUser } from '@/lib/auth'
import { getConfiguredForm } from '@/lib/content'

export default async function JoinPage() {
  const { user } = await getCurrentUser()
  const joinForm = await getConfiguredForm('joinForm', user)

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Join Us</h1>
      <p>
        All are welcome to join us for fun, fellowship, and guest speakers. Use the contact form to express interest,
        and an officer will follow up.
      </p>
      {joinForm ? (
        <PayloadFormRenderer form={joinForm} />
      ) : (
        <p className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
          Join form is not configured. In Payload Admin, open Site Settings and select a form for the <b>Join Form</b>{' '}
          field.
        </p>
      )}
    </section>
  )
}

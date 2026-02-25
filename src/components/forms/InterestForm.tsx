import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import type { SessionUser } from '@/lib/auth'
import { getConfiguredForm } from '@/lib/content'

export type InterestFormProps = {
  user?: SessionUser | null
}

export const InterestForm = async ({ user }: InterestFormProps) => {
  const joinForm = await getConfiguredForm('joinForm', user)

  if (!joinForm) {
    return (
      <p className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
        Join form is not configured. In Payload Admin, open Site Settings and select a form for the <b>Join Form</b> field.
      </p>
    )
  }

  return <PayloadFormRenderer form={joinForm} />
}

import { ConfiguredForm } from '@/components/forms/ConfiguredForm'
import type { SessionUser } from '@/lib/auth'

export type InterestFormProps = {
  user?: SessionUser | null
}

export const InterestForm = async ({ user }: InterestFormProps) => (
  <ConfiguredForm fallbackLabel="Join Form" formKey="joinForm" user={user} />
)

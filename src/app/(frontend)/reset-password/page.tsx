import { Suspense } from 'react'

import { ResetPasswordForm } from '@/components/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

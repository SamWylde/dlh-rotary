import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import type { SessionUser } from '@/lib/auth'
import { getConfiguredForm, type SiteSettingsFormKey } from '@/lib/content'

export type ConfiguredFormProps = {
  formKey: SiteSettingsFormKey
  fallbackLabel: string
  user?: SessionUser | null
}

export const ConfiguredForm = async ({ formKey, fallbackLabel, user }: ConfiguredFormProps) => {
  const form = await getConfiguredForm(formKey, user)

  if (!form) {
    return (
      <p className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
        {fallbackLabel} is not configured. In Payload Admin, open Site Settings and select a form for the{' '}
        <b>{fallbackLabel}</b> field.
      </p>
    )
  }

  return <PayloadFormRenderer form={form} />
}

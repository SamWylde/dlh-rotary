'use client'

import { useMemo, useState } from 'react'

import { lexicalToPlainText } from '@/lib/richText'
import type { Form } from '@/payload-types'

type FormField = NonNullable<Form['fields']>[number]
type SupportedFormField = Extract<
  FormField,
  {
    blockType: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'state' | 'checkbox' | 'message'
  }
>
type InputFormField = Exclude<SupportedFormField, { blockType: 'message' }>

type FormValues = Record<string, string | boolean>
type FormErrors = Record<string, string>

export type PayloadFormRendererProps = {
  form: Form
  className?: string
  heading?: string
}

const fieldLabel = (field: InputFormField): string => field.label || field.name

const isSupportedField = (field: FormField): field is SupportedFormField => {
  return [
    'text',
    'email',
    'number',
    'textarea',
    'select',
    'state',
    'checkbox',
    'message',
  ].includes(field.blockType)
}

const isInputField = (field: SupportedFormField): field is InputFormField => field.blockType !== 'message'

const initialValueForField = (field: InputFormField): string | boolean => {
  if (field.blockType === 'checkbox') {
    return Boolean(field.defaultValue)
  }

  if (field.blockType === 'number') {
    return field.defaultValue !== null && field.defaultValue !== undefined ? String(field.defaultValue) : ''
  }

  if ('defaultValue' in field && field.defaultValue !== null && field.defaultValue !== undefined) {
    return String(field.defaultValue)
  }

  return ''
}

const normalizeFieldValue = (field: InputFormField, value: string | boolean): string => {
  if (field.blockType === 'checkbox') {
    return value ? 'true' : 'false'
  }

  return String(value)
}

const getConfirmationMessage = (form: Form): string => {
  if (form.confirmationType !== 'message') {
    return 'Thanks for your submission.'
  }

  const message = lexicalToPlainText(form.confirmationMessage)
  return message || 'Thanks for your submission.'
}

export const PayloadFormRenderer = ({ form, className, heading }: PayloadFormRendererProps) => {
  const supportedFields = useMemo(() => (form.fields || []).filter(isSupportedField), [form.fields])
  const inputFields = useMemo(() => supportedFields.filter(isInputField), [supportedFields])

  const [values, setValues] = useState<FormValues>(() =>
    inputFields.reduce<FormValues>((acc, field) => {
      acc[field.name] = initialValueForField(field)
      return acc
    }, {}),
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (): boolean => {
    const nextErrors: FormErrors = {}

    for (const field of inputFields) {
      if (!field.required) continue

      const value = values[field.name]

      if (field.blockType === 'checkbox') {
        if (value !== true) {
          nextErrors[field.name] = `${fieldLabel(field)} is required.`
        }
        continue
      }

      if (typeof value !== 'string' || value.trim().length === 0) {
        nextErrors[field.name] = `${fieldLabel(field)} is required.`
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    const submissionData = inputFields.map((field) => ({
      field: field.name,
      value: normalizeFieldValue(field, values[field.name] ?? ''),
    }))

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form.id,
          submissionData,
        }),
      })

      if (!response.ok) {
        setSubmitError('Unable to submit form. Please try again.')
        return
      }

      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        const redirectUrl = form.redirect.url
        if (redirectUrl.startsWith('/') || redirectUrl.startsWith('https://') || redirectUrl.startsWith('http://')) {
          window.location.assign(redirectUrl)
          return
        }
      }

      setIsSubmitted(true)
    } catch {
      setSubmitError('Unable to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={className}>
        {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
        <div className="rounded-lg border border-border bg-card p-6">
          <p>{getConfirmationMessage(form)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      <form className="grid gap-4 rounded-lg border border-border bg-card p-6" onSubmit={onSubmit}>
        {supportedFields.map((field) => {
          if (field.blockType === 'message') {
            return (
              <p className="text-sm text-muted-foreground" key={field.id || `message-${field.blockName || 'field'}`}>
                {lexicalToPlainText(field.message)}
              </p>
            )
          }

          const error = errors[field.name]

          if (field.blockType === 'checkbox') {
            return (
              <label
                className="flex items-start gap-2 text-sm"
                htmlFor={field.name}
                key={field.id || field.name}
              >
                <input
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  aria-invalid={Boolean(error)}
                  checked={Boolean(values[field.name])}
                  id={field.name}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  {fieldLabel(field)}
                  {field.required ? ' *' : ''}
                </span>
                {error ? <span className="text-red-600" id={`${field.name}-error`}>{error}</span> : null}
              </label>
            )
          }

          if (field.blockType === 'textarea') {
            return (
              <label className="grid gap-1 text-sm" htmlFor={field.name} key={field.id || field.name}>
                <span>
                  {fieldLabel(field)}
                  {field.required ? ' *' : ''}
                </span>
                <textarea
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  aria-invalid={Boolean(error)}
                  className="min-h-28 rounded border border-border bg-background px-3 py-2"
                  id={field.name}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  required={Boolean(field.required)}
                  value={String(values[field.name] ?? '')}
                />
                {error ? <span className="text-red-600" id={`${field.name}-error`}>{error}</span> : null}
              </label>
            )
          }

          if (field.blockType === 'select') {
            return (
              <label className="grid gap-1 text-sm" htmlFor={field.name} key={field.id || field.name}>
                <span>
                  {fieldLabel(field)}
                  {field.required ? ' *' : ''}
                </span>
                <select
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  aria-invalid={Boolean(error)}
                  className="rounded border border-border bg-background px-3 py-2"
                  id={field.name}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  required={Boolean(field.required)}
                  value={String(values[field.name] ?? '')}
                >
                  <option value="">{field.placeholder || 'Select an option'}</option>
                  {(field.options || []).map((option) => (
                    <option key={option.id || option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {error ? <span className="text-red-600" id={`${field.name}-error`}>{error}</span> : null}
              </label>
            )
          }

          const inputType = field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'

          return (
            <label className="grid gap-1 text-sm" htmlFor={field.name} key={field.id || field.name}>
              <span>
                {fieldLabel(field)}
                {field.required ? ' *' : ''}
              </span>
              <input
                aria-describedby={error ? `${field.name}-error` : undefined}
                aria-invalid={Boolean(error)}
                className="rounded border border-border bg-background px-3 py-2"
                id={field.name}
                onChange={(event) =>
                  setValues((previous) => ({
                    ...previous,
                    [field.name]: event.target.value,
                  }))
                }
                placeholder={field.blockType === 'state' ? 'PA' : undefined}
                required={Boolean(field.required)}
                type={inputType}
                value={String(values[field.name] ?? '')}
              />
              {error ? <span className="text-red-600" id={`${field.name}-error`}>{error}</span> : null}
            </label>
          )
        })}

        <div aria-live="polite" aria-atomic="true">
          {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
          {Object.keys(errors).length > 0 ? (
            <p className="text-sm text-red-600">Please fix the errors above to continue.</p>
          ) : null}
        </div>

        <button
          className="rounded bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
        </button>
      </form>
    </div>
  )
}

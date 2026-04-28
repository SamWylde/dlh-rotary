'use client'

import { useCreate, useDelete, useList, useUpdate } from '@refinedev/core'
import { Edit, Eye, Mail, Plus, RefreshCw, Search, Trash2, Upload } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import type { Role } from '@/constants/roles'
import { DOCUMENT_CATEGORIES } from '@/constants/documentCategories'
import {
  MANAGE_FORM_HASH,
  manageCreateHref,
  manageEditHref,
  manageResourcePath,
  type ManageUIResource,
} from '@/lib/manage/navigation'
import { lexicalToPlainText } from '@/lib/richText'
import { cn } from '@/utilities/ui'

type ResourceName = ManageUIResource
type ManageFormFieldType =
  | 'checkbox'
  | 'email'
  | 'number'
  | 'select'
  | 'state'
  | 'text'
  | 'textarea'
type ManageFormField = {
  id: string
  label: string
  name: string
  optionsText?: string
  required?: boolean
  type: ManageFormFieldType
}
type FieldType =
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'email'
  | 'formBuilder'
  | 'number'
  | 'richText'
  | 'select'
  | 'text'
  | 'textarea'
  | 'upload'
type FormValue = boolean | ManageFormField[] | number | string | undefined
type FormValues = Record<string, FormValue>
type ManageRecord = Record<string, unknown> & { id: number | string }

type FieldConfig = {
  accept?: string
  helper?: string
  label: string
  name: string
  options?: { label: string; value: string }[]
  required?: boolean
  show?: (values: FormValues) => boolean
  sourceName?: string
  type: FieldType
}

type ResourceConfig = {
  allowCreate?: boolean
  canDelete?: (role: Role | undefined) => boolean
  description: string
  draftable?: boolean
  fields: FieldConfig[]
  filter?: 'category' | 'role' | 'status'
  label: string
  readOnly?: boolean
  resource: ResourceName
  searchPlaceholder: string
  singularLabel: string
}

const eventTypes = [
  { label: 'Regular Meeting', value: 'meeting' },
  { label: 'Guest Speaker', value: 'speaker' },
  { label: 'Community Service', value: 'service' },
  { label: 'Fundraiser', value: 'fundraiser' },
  { label: 'Social', value: 'social' },
  { label: 'Board Meeting', value: 'board' },
]

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Officer', value: 'officer' },
  { label: 'Member', value: 'member' },
]

const priorityOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Important', value: 'important' },
  { label: 'Urgent', value: 'urgent' },
]

const RESOURCE_CONFIG: Record<ResourceName, ResourceConfig> = {
  announcements: {
    description: 'Post news and club updates for public visitors or members.',
    draftable: true,
    fields: [
      { label: 'Title', name: 'title', required: true, type: 'text' },
      {
        label: 'Body',
        name: 'contentText',
        required: true,
        sourceName: 'content',
        type: 'richText',
      },
      { label: 'Priority', name: 'priority', options: priorityOptions, type: 'select' },
      { label: 'Published Date', name: 'publishedDate', type: 'date' },
      { label: 'Featured Image', name: 'featuredImage', accept: 'image/*', type: 'upload' },
      { label: 'Members Only', name: 'membersOnly', type: 'checkbox' },
      { label: 'Pin to Top', name: 'pinned', type: 'checkbox' },
    ],
    filter: 'status',
    label: 'Announcements',
    resource: 'announcements',
    searchPlaceholder: 'Search announcements...',
    singularLabel: 'announcement',
  },
  events: {
    description: 'Add meetings, speakers, service projects, fundraisers, and social events.',
    draftable: true,
    fields: [
      { label: 'Title', name: 'title', required: true, type: 'text' },
      { label: 'Start Date & Time', name: 'date', required: true, type: 'datetime' },
      { label: 'End Date & Time', name: 'endDate', type: 'datetime' },
      {
        label: 'Event Type',
        name: 'eventType',
        options: eventTypes,
        required: true,
        type: 'select',
      },
      { label: 'Location', name: 'location', type: 'text' },
      {
        label: 'Description',
        name: 'descriptionText',
        sourceName: 'description',
        type: 'richText',
      },
      {
        label: 'Speaker Name',
        name: 'speakerName',
        show: (values) => values.eventType === 'speaker',
        type: 'text',
      },
      {
        label: 'Speaker Topic',
        name: 'speakerTopic',
        show: (values) => values.eventType === 'speaker',
        type: 'text',
      },
      { label: 'Featured Image', name: 'featuredImage', accept: 'image/*', type: 'upload' },
      { label: 'Enable RSVP', name: 'enableRSVP', type: 'checkbox' },
      {
        label: 'RSVP Deadline',
        name: 'rsvpDeadline',
        show: (values) => Boolean(values.enableRSVP),
        type: 'datetime',
      },
      {
        label: 'Max Attendees',
        name: 'maxAttendees',
        show: (values) => Boolean(values.enableRSVP),
        type: 'number',
      },
      { label: 'Ticket Price', name: 'ticketPrice', type: 'number' },
      { label: 'Ticket Link', name: 'ticketLink', type: 'text' },
      { label: 'Recurring Event', name: 'isRecurring', type: 'checkbox' },
      {
        label: 'Recurring Note',
        name: 'recurringNote',
        show: (values) => Boolean(values.isRecurring),
        type: 'text',
      },
    ],
    filter: 'status',
    label: 'Events',
    resource: 'events',
    searchPlaceholder: 'Search events...',
    singularLabel: 'event',
  },
  documents: {
    canDelete: (role) => role === 'admin',
    description: 'Upload minutes, bylaws, forms, financial reports, and other club files.',
    fields: [
      { label: 'Title', name: 'title', required: true, type: 'text' },
      {
        label: 'Category',
        name: 'category',
        options: [...DOCUMENT_CATEGORIES],
        required: true,
        type: 'select',
      },
      {
        label: 'File',
        name: 'file',
        accept:
          '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        required: true,
        type: 'upload',
      },
      { label: 'Description', name: 'description', type: 'textarea' },
      {
        label: 'Meeting Date',
        name: 'meetingDate',
        show: (values) => values.category === 'minutes',
        type: 'date',
      },
      { label: 'Members Only', name: 'membersOnly', type: 'checkbox' },
    ],
    filter: 'category',
    label: 'Documents',
    resource: 'documents',
    searchPlaceholder: 'Search documents...',
    singularLabel: 'document',
  },
  pages: {
    description: 'Create simple informational pages. Advanced layout pages stay in Payload admin.',
    draftable: true,
    fields: [
      { label: 'Title', name: 'title', required: true, type: 'text' },
      {
        label: 'Body',
        name: 'contentText',
        required: true,
        sourceName: 'content',
        type: 'richText',
      },
      { label: 'Featured Image', name: 'featuredImage', accept: 'image/*', type: 'upload' },
      { label: 'Members Only', name: 'membersOnly', type: 'checkbox' },
    ],
    filter: 'status',
    label: 'Simple Pages',
    resource: 'pages',
    searchPlaceholder: 'Search pages...',
    singularLabel: 'simple page',
  },
  forms: {
    description: 'Build contact, sponsor, signup, pledge, and donation-interest forms.',
    fields: [
      { label: 'Title', name: 'title', required: true, type: 'text' },
      { label: 'Fields', name: 'formFields', required: true, type: 'formBuilder' },
      { label: 'Submit Button Label', name: 'submitButtonLabel', type: 'text' },
      { label: 'Confirmation Message', name: 'confirmationMessageText', type: 'textarea' },
      { label: 'Notification Email', name: 'notificationEmail', type: 'email' },
      { label: 'Notification Subject', name: 'emailSubject', type: 'text' },
      { label: 'Notification Message', name: 'emailMessageText', type: 'textarea' },
    ],
    label: 'Forms',
    resource: 'forms',
    searchPlaceholder: 'Search forms...',
    singularLabel: 'form',
  },
  'form-submissions': {
    allowCreate: false,
    description: 'Review contact, signup, sponsor, and donation-interest responses.',
    fields: [],
    label: 'Form Submissions',
    readOnly: true,
    resource: 'form-submissions',
    searchPlaceholder: 'Search submissions...',
    singularLabel: 'submission',
  },
  users: {
    canDelete: (role) => role === 'admin',
    description: 'Add members, update directory information, and send setup emails.',
    fields: [
      { label: 'Full Name', name: 'fullName', required: true, type: 'text' },
      { label: 'Email', name: 'email', required: true, type: 'email' },
      { label: 'Role', name: 'role', options: roleOptions, type: 'select' },
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Phone', name: 'phone', type: 'text' },
      { label: 'Bio', name: 'bio', type: 'textarea' },
      { label: 'Photo', name: 'photo', accept: 'image/*', type: 'upload' },
      { label: 'Sponsor', name: 'sponsor', type: 'text' },
      { label: 'Member Since', name: 'memberSince', type: 'date' },
      { label: 'Show in Directory', name: 'showInDirectory', type: 'checkbox' },
      { label: 'Show Phone', name: 'showPhone', type: 'checkbox' },
      { label: 'Show Email', name: 'showEmail', type: 'checkbox' },
    ],
    filter: 'role',
    label: 'Members',
    resource: 'users',
    searchPlaceholder: 'Search members...',
    singularLabel: 'member',
  },
}

const defaultValues = (resource: ResourceName): FormValues => {
  const now = new Date()

  if (resource === 'announcements') {
    return {
      _status: 'draft',
      membersOnly: false,
      pinned: false,
      priority: 'normal',
      publishedDate: now.toISOString().slice(0, 10),
    }
  }

  if (resource === 'events') {
    return {
      _status: 'draft',
      enableRSVP: false,
      eventType: 'meeting',
      isRecurring: false,
      location: 'Poorman Gallery, 352 E. Water St., Lock Haven',
    }
  }

  if (resource === 'documents') {
    return {
      category: 'other',
      membersOnly: true,
    }
  }

  if (resource === 'pages') {
    return {
      _status: 'draft',
      membersOnly: false,
    }
  }

  if (resource === 'forms') {
    return {
      confirmationMessageText: 'Thanks for your submission.',
      emailMessageText: 'A new form submission has been received.',
      formFields: [
        {
          id: 'field-1',
          label: 'Full Name',
          name: 'full_name',
          required: true,
          type: 'text',
        },
        {
          id: 'field-2',
          label: 'Email',
          name: 'email',
          required: true,
          type: 'email',
        },
      ],
      submitButtonLabel: 'Submit',
    }
  }

  if (resource === 'form-submissions') {
    return {}
  }

  return {
    role: 'member',
    showEmail: true,
    showInDirectory: true,
    showPhone: false,
  }
}

const relationID = (value: unknown): string => {
  if (!value) return ''
  if (typeof value === 'object' && 'id' in value) return relationID((value as { id?: unknown }).id)
  return String(value)
}

const relationLabel = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const record = value as { alt?: string; filename?: string; fullName?: string; title?: string }
  return record.filename || record.alt || record.title || record.fullName || ''
}

const toFieldName = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'field'

const isManageFormFieldType = (value: unknown): value is ManageFormFieldType =>
  ['checkbox', 'email', 'number', 'select', 'state', 'text', 'textarea'].includes(String(value))

const normalizeFormBuilderFields = (value: unknown): ManageFormField[] => {
  if (!Array.isArray(value)) return []

  return value.reduce<ManageFormField[]>((fields, field, index) => {
    if (!field || typeof field !== 'object') return fields
    const record = field as {
      blockType?: unknown
      id?: string | null
      label?: string | null
      name?: string | null
      options?: { label?: string | null; value?: string | null }[] | null
      required?: boolean | null
    }
    const label = record.label || record.name || `Field ${index + 1}`
    const type = isManageFormFieldType(record.blockType) ? record.blockType : 'text'

    fields.push({
      id: record.id || `field-${index + 1}`,
      label,
      name: record.name || toFieldName(label),
      optionsText: (record.options || [])
        .map((option) => option.label || option.value)
        .filter(Boolean)
        .join('\n'),
      required: Boolean(record.required),
      type,
    })

    return fields
  }, [])
}

const dateValue = (value: unknown, withTime = false): string => {
  if (!value) return ''
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return String(value)
  return withTime ? date.toISOString().slice(0, 16) : date.toISOString().slice(0, 10)
}

const normalizeRecord = (resource: ResourceName, record: ManageRecord): FormValues => {
  const values: FormValues = { ...defaultValues(resource) }

  if (record._status === 'draft' || record._status === 'published') {
    values._status = record._status
  }

  if (resource === 'forms') {
    values.formFields = normalizeFormBuilderFields(record.fields)
    values.confirmationMessageText = lexicalToPlainText(record.confirmationMessage)

    const emails = Array.isArray(record.emails) ? record.emails : []
    const firstEmail = emails[0] as
      | {
          emailTo?: string | null
          message?: unknown
          subject?: string | null
        }
      | undefined

    values.notificationEmail = firstEmail?.emailTo || ''
    values.emailSubject = firstEmail?.subject || ''
    values.emailMessageText = lexicalToPlainText(firstEmail?.message)
  }

  for (const field of RESOURCE_CONFIG[resource].fields) {
    const rawValue = record[field.name]

    if (field.type === 'formBuilder') {
      values[field.name] = normalizeFormBuilderFields(record.fields)
      continue
    }

    if (
      typeof rawValue === 'string' ||
      typeof rawValue === 'number' ||
      typeof rawValue === 'boolean'
    ) {
      values[field.name] = rawValue
    }

    if (field.type === 'richText') {
      const sourceName = field.sourceName || field.name
      values[field.name] = lexicalToPlainText(record[sourceName])
    }

    if (field.type === 'date' || field.type === 'datetime') {
      values[field.name] = dateValue(record[field.name], field.type === 'datetime')
    }

    if (field.type === 'upload') {
      values[field.name] = relationID(record[field.name])
      values[`${field.name}Label`] = relationLabel(record[field.name])
    }
  }

  return values
}

const recordTitle = (record: ManageRecord): string =>
  String(
    record.title ||
      record.fullName ||
      record.alt ||
      record.filename ||
      relationLabel(record.form) ||
      `Submission #${record.id}` ||
      'Untitled',
  )

const recordMeta = (resource: ResourceName, record: ManageRecord): string => {
  if (resource === 'events' && record.date)
    return new Date(String(record.date)).toLocaleString('en-US')
  if (resource === 'documents' && record.category) return String(record.category)
  if (resource === 'forms' && Array.isArray(record.fields))
    return `${record.fields.length} field${record.fields.length === 1 ? '' : 's'}`
  if (resource === 'form-submissions' && record.createdAt)
    return `Submitted ${new Date(String(record.createdAt)).toLocaleString('en-US')}`
  if (resource === 'users') return [record.email, record.role].filter(Boolean).join(' - ')
  if (record.updatedAt)
    return `Updated ${new Date(String(record.updatedAt)).toLocaleDateString('en-US')}`
  return 'Saved'
}

const sentenceCase = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

const UploadField = ({
  accept,
  isDocument,
  label,
  onChange,
  value,
}: {
  accept?: string
  isDocument?: boolean
  label?: string
  onChange: (id: string, label: string) => void
  value?: string
}) => {
  const [alt, setAlt] = useState(label || '')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    setAlt(label || '')
  }, [label, value])

  const upload = async () => {
    if (!file) return
    setIsUploading(true)
    setError(null)
    setNotice(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', alt || file.name)
    formData.append('isPublic', isDocument ? 'false' : 'true')

    try {
      const response = await fetch('/manage/api/uploads', {
        body: formData,
        credentials: 'include',
        method: 'POST',
      })
      const body = (await response.json().catch(() => ({}))) as {
        doc?: { filename?: string; id?: string | number }
        error?: string
      }

      if (!response.ok || !body.doc?.id) {
        throw new Error(body.error || 'Upload failed.')
      }

      onChange(String(body.doc.id), body.doc.filename || file.name)
      setFile(null)
      setAlt(body.doc.filename || file.name)
      setNotice('Uploaded and attached. Save or Publish to finish.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid min-w-0 gap-2 rounded-md border bg-muted/30 p-3">
      {value ? (
        <p className="text-sm text-muted-foreground">Current file: {label || `#${value}`}</p>
      ) : null}
      <Input
        accept={accept}
        onChange={(event) => {
          setFile(event.target.files?.[0] || null)
          setError(null)
          setNotice(null)
        }}
        type="file"
      />
      <Input
        onChange={(event) => setAlt(event.target.value)}
        placeholder="Short description for the file"
        value={alt}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {notice ? (
        <p className="rounded-md border border-green-200 bg-green-50 p-2 text-sm text-green-800">
          {notice}
        </p>
      ) : null}
      <Button disabled={!file || isUploading} onClick={upload} type="button" variant="outline">
        <Upload className="h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  )
}

const FormBuilderField = ({
  onChange,
  value,
}: {
  onChange: (fields: ManageFormField[]) => void
  value?: ManageFormField[]
}) => {
  const fields = value && value.length > 0 ? value : []

  const updateField = (id: string, updates: Partial<ManageFormField>) => {
    onChange(
      fields.map((field) => {
        if (field.id !== id) return field
        const nextField = { ...field, ...updates }
        if (updates.label && (!field.name || field.name === toFieldName(field.label))) {
          nextField.name = toFieldName(updates.label)
        }
        return nextField
      }),
    )
  }

  const addField = () => {
    const nextIndex = fields.length + 1
    onChange([
      ...fields,
      {
        id: `field-${Date.now()}`,
        label: `Field ${nextIndex}`,
        name: `field_${nextIndex}`,
        required: false,
        type: 'text',
      },
    ])
  }

  const removeField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id))
  }

  return (
    <div className="grid gap-3 rounded-md border bg-muted/30 p-3">
      {fields.map((field, index) => (
        <div className="grid gap-3 rounded-md border bg-background p-3" key={field.id}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Field {index + 1}</p>
            <Button
              aria-label={`Remove ${field.label}`}
              onClick={() => removeField(field.id)}
              size="sm"
              type="button"
              variant="outline"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px]">
            <Input
              onChange={(event) => updateField(field.id, { label: event.target.value })}
              placeholder="Label"
              value={field.label}
            />
            <Select
              onValueChange={(nextType) =>
                updateField(field.id, { type: nextType as ManageFormFieldType })
              }
              value={field.type}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="textarea">Long Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="select">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="state">State</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <Input
              onChange={(event) => updateField(field.id, { name: toFieldName(event.target.value) })}
              placeholder="field_name"
              value={field.name}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={Boolean(field.required)}
                className="h-4 w-4 rounded border-input"
                onChange={(event) => updateField(field.id, { required: event.target.checked })}
                type="checkbox"
              />
              Required
            </label>
          </div>
          {field.type === 'select' ? (
            <Textarea
              className="min-h-24"
              onChange={(event) => updateField(field.id, { optionsText: event.target.value })}
              placeholder="Option"
              value={field.optionsText || ''}
            />
          ) : null}
        </div>
      ))}
      <Button onClick={addField} type="button" variant="outline">
        <Plus className="h-4 w-4" />
        Add Field
      </Button>
    </div>
  )
}

const SubmissionDetails = ({ record }: { record: ManageRecord | null }) => {
  if (!record) {
    return <p className="text-sm text-muted-foreground">Select a submission to review.</p>
  }

  const submissionData = Array.isArray(record.submissionData) ? record.submissionData : []

  return (
    <div className="grid gap-4">
      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        <p className="font-medium">{relationLabel(record.form) || 'Form submission'}</p>
        <p className="text-muted-foreground">
          {record.createdAt
            ? new Date(String(record.createdAt)).toLocaleString('en-US')
            : 'Submitted'}
        </p>
      </div>
      <div className="grid gap-3">
        {submissionData.length === 0 ? (
          <p className="text-sm text-muted-foreground">No submitted fields were recorded.</p>
        ) : null}
        {submissionData.map((entry, index) => {
          const item =
            entry && typeof entry === 'object'
              ? (entry as { field?: unknown; id?: string | null; value?: unknown })
              : {}

          return (
            <div className="rounded-md border p-3" key={item.id || `${item.field}-${index}`}>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {String(item.field || `Field ${index + 1}`)}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm">{String(item.value || '')}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Field = ({
  field,
  resource,
  setValue,
  values,
}: {
  field: FieldConfig
  resource: ResourceName
  setValue: (name: string, value: FormValue) => void
  values: FormValues
}) => {
  if (field.show && !field.show(values)) return null

  const value = values[field.name]

  return (
    <label
      className={cn(
        'grid min-w-0 gap-1 text-sm',
        field.type === 'checkbox' && 'flex items-center gap-3',
      )}
    >
      {field.type === 'checkbox' ? (
        <>
          <input
            checked={Boolean(value)}
            className="h-4 w-4 rounded border-input"
            onChange={(event) => setValue(field.name, event.target.checked)}
            type="checkbox"
          />
          <span>{field.label}</span>
        </>
      ) : (
        <>
          <span className="font-medium">
            {field.label}
            {field.required ? ' *' : ''}
          </span>
          {field.type === 'textarea' || field.type === 'richText' ? (
            <Textarea
              className={field.type === 'richText' ? 'min-h-[180px]' : undefined}
              onChange={(event) => setValue(field.name, event.target.value)}
              value={String(value || '')}
            />
          ) : null}
          {field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'number' ||
          field.type === 'date' ||
          field.type === 'datetime' ? (
            <Input
              onChange={(event) => setValue(field.name, event.target.value)}
              required={field.required}
              type={field.type === 'datetime' ? 'datetime-local' : field.type}
              value={String(value || '')}
            />
          ) : null}
          {field.type === 'select' ? (
            <Select
              onValueChange={(nextValue) => setValue(field.name, nextValue)}
              value={String(value || field.options?.[0]?.value || '')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(field.options || []).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
          {field.type === 'upload' ? (
            <UploadField
              accept={field.accept}
              isDocument={resource === 'documents' && field.name === 'file'}
              label={String(values[`${field.name}Label`] || '')}
              onChange={(id, uploadLabel) => {
                setValue(field.name, id)
                setValue(`${field.name}Label`, uploadLabel)
              }}
              value={String(value || '')}
            />
          ) : null}
          {field.type === 'formBuilder' ? (
            <FormBuilderField
              onChange={(fields) => setValue(field.name, fields)}
              value={Array.isArray(value) ? value : []}
            />
          ) : null}
          {field.helper ? (
            <span className="text-xs text-muted-foreground">{field.helper}</span>
          ) : null}
        </>
      )}
    </label>
  )
}

export const ManageResourcePage = ({
  resource,
  userRole,
}: {
  resource: ResourceName
  userRole?: Role
}) => {
  const config = RESOURCE_CONFIG[resource]
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLDivElement | null>(null)
  const handledIntentRef = useRef<string | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState<ManageRecord | null>(null)
  const [formValues, setFormValues] = useState<FormValues>(defaultValues(resource))
  const [initialFormValues, setInitialFormValues] = useState<FormValues>(defaultValues(resource))
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savingAction, setSavingAction] = useState<'draft' | 'publish' | 'save' | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoadingIntent, setIsLoadingIntent] = useState(false)
  const isSaving = Boolean(savingAction)
  const resourcePath = pathname || manageResourcePath(resource)

  const filters = useMemo(() => {
    const nextFilters = [{ field: 'search', operator: 'eq' as const, value: search }]
    if (config.filter && filter !== 'all') {
      nextFilters.push({ field: config.filter, operator: 'eq' as const, value: filter })
    }
    return nextFilters
  }, [config.filter, filter, search])

  const { query, result } = useList<ManageRecord>({
    filters,
    pagination: { currentPage: page, pageSize: 10 },
    resource,
  })
  const createMutation = useCreate()
  const updateMutation = useUpdate()
  const deleteMutation = useDelete()
  const rows = useMemo(() => result.data || [], [result.data])
  const canDelete = config.canDelete?.(userRole) ?? false

  const setValue = useCallback((name: string, value: FormValue) => {
    setFormValues((current) => ({ ...current, [name]: value }))
  }, [])

  const scrollToForm = useCallback(() => {
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      formRef.current?.focus({ preventScroll: true })
    })
  }, [])

  const resetCreateForm = useCallback(
    (readyMessage?: string | null) => {
      const defaults = defaultValues(resource)
      setEditing(null)
      setFormValues(defaults)
      setInitialFormValues(defaults)
      setError(null)
      setMessage(readyMessage ?? null)
    },
    [resource],
  )

  const loadEditRecord = useCallback(
    (record: ManageRecord, nextMessage?: string | null) => {
      const values = normalizeRecord(resource, record)
      setEditing(record)
      setFormValues(values)
      setInitialFormValues(values)
      setError(null)
      setMessage(nextMessage ?? null)
    },
    [resource],
  )

  const openCreate = useCallback(() => {
    setIsFormOpen(true)
    resetCreateForm(`Ready for a new ${config.singularLabel}.`)
    router.push(`${resourcePath}?new=1#${MANAGE_FORM_HASH}`, { scroll: false })
    scrollToForm()
  }, [config.singularLabel, resetCreateForm, resourcePath, router, scrollToForm])

  const openEdit = useCallback(
    (record: ManageRecord) => {
      setIsFormOpen(true)
      loadEditRecord(record)
      router.push(manageEditHref(resource, record.id), { scroll: false })
      scrollToForm()
    },
    [loadEditRecord, resource, router, scrollToForm],
  )

  useEffect(() => {
    const editID = searchParams.get('edit')
    const wantsNew = searchParams.get('new') === '1'
    const intentKey = editID ? `edit:${resource}:${editID}` : wantsNew ? `new:${resource}` : null

    if (!intentKey) {
      handledIntentRef.current = null
      setIsFormOpen(false)
      setIsLoadingIntent(false)
      return
    }

    if (handledIntentRef.current === intentKey) return
    handledIntentRef.current = intentKey

    if (!editID) {
      setIsFormOpen(true)
      setIsLoadingIntent(false)
      resetCreateForm(`Ready for a new ${config.singularLabel}.`)
      scrollToForm()
      return
    }

    if (editing && String(editing.id) === editID) {
      setIsFormOpen(true)
      setIsLoadingIntent(false)
      scrollToForm()
      return
    }

    const existingRecord = rows.find((record) => String(record.id) === editID)
    if (existingRecord) {
      setIsFormOpen(true)
      setIsLoadingIntent(false)
      loadEditRecord(existingRecord)
      scrollToForm()
      return
    }

    const controller = new AbortController()
    setIsFormOpen(true)
    setIsLoadingIntent(true)
    setError(null)
    setMessage(null)

    const loadRecord = async () => {
      try {
        const response = await fetch(`/manage/api/${resource}/${encodeURIComponent(editID)}`, {
          credentials: 'include',
          signal: controller.signal,
        })
        const body = (await response.json().catch(() => ({}))) as {
          doc?: ManageRecord
          error?: string
        }

        if (!response.ok || !body.doc) {
          throw new Error(body.error || 'Unable to load that item.')
        }

        loadEditRecord(body.doc)
        scrollToForm()
      } catch (loadError) {
        if (controller.signal.aborted) return
        setError(loadError instanceof Error ? loadError.message : 'Unable to load that item.')
        scrollToForm()
      } finally {
        if (!controller.signal.aborted) setIsLoadingIntent(false)
      }
    }

    void loadRecord()

    return () => {
      controller.abort()
    }
  }, [
    config.singularLabel,
    editing,
    loadEditRecord,
    resetCreateForm,
    resource,
    rows,
    scrollToForm,
    searchParams,
  ])

  const save = async (status?: 'draft' | 'published') => {
    setError(null)
    setMessage(null)
    const values: FormValues = { ...formValues, ...(status ? { _status: status } : {}) }
    const nextSavingAction = config.draftable
      ? status === 'published'
        ? 'publish'
        : 'draft'
      : 'save'

    if (editing) {
      for (const field of config.fields) {
        if (field.type === 'richText' && values[field.name] === initialFormValues[field.name]) {
          delete values[field.name]
        }
      }
    }

    setSavingAction(nextSavingAction)

    try {
      if (editing) {
        const updateResult = (await updateMutation.mutateAsync({
          id: editing.id,
          resource,
          values,
        })) as { data?: ManageRecord }
        if (updateResult.data?.id) {
          loadEditRecord(updateResult.data, 'Saved changes.')
        } else {
          setMessage('Saved changes.')
        }
      } else {
        const createResult = (await createMutation.mutateAsync({ resource, values })) as {
          data?: ManageRecord
        }
        const successMessage =
          resource === 'users'
            ? 'Member saved. Invite email was attempted automatically.'
            : 'Created successfully.'

        if (createResult.data?.id) {
          loadEditRecord(createResult.data, successMessage)
          router.replace(manageEditHref(resource, createResult.data.id), { scroll: false })
        } else {
          setMessage(successMessage)
        }
      }

      await query.refetch()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save.')
    } finally {
      setSavingAction(null)
    }
  }

  const remove = async (record: ManageRecord) => {
    if (!window.confirm(`Delete "${recordTitle(record)}"?`)) return

    try {
      await deleteMutation.mutateAsync({ id: record.id, resource })
      await query.refetch()
      setMessage('Deleted.')
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete.')
    }
  }

  const sendInvite = async (record: ManageRecord) => {
    setError(null)
    setMessage(null)

    try {
      const response = await fetch(`/manage/api/users/${record.id}/invite`, {
        credentials: 'include',
        method: 'POST',
      })
      const body = (await response.json().catch(() => ({}))) as {
        error?: string
        invite?: { sent?: boolean; warning?: string }
      }
      if (!response.ok) throw new Error(body.error || 'Unable to send invite.')
      setMessage(body.invite?.warning || 'Invite email sent.')
    } catch (inviteError) {
      setError(inviteError instanceof Error ? inviteError.message : 'Unable to send invite.')
    }
  }

  return (
    <div className="grid items-start gap-6">
      <div className="grid min-w-0 content-start gap-4">
        <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold leading-tight">{config.label}</h1>
            <p className="mt-1 text-muted-foreground">{config.description}</p>
          </div>
          {config.allowCreate !== false ? (
            <Button asChild>
              <Link href={manageCreateHref(resource)} onClick={() => openCreate()}>
                <Plus className="h-4 w-4" />
                New
              </Link>
            </Button>
          ) : null}
        </div>

        {!isFormOpen ? (
          <Card className="min-w-0">
            <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <CardTitle className="text-base">Saved Items</CardTitle>
                <CardDescription>
                  Search, edit, publish, or delete where your role allows it.
                </CardDescription>
              </div>
              <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row">
                <div className="relative min-w-0 sm:w-56">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    onChange={(event) => {
                      setPage(1)
                      setSearch(event.target.value)
                    }}
                    placeholder={config.searchPlaceholder}
                    value={search}
                  />
                </div>
                {config.filter ? (
                  <Select
                    onValueChange={(value) => {
                      setPage(1)
                      setFilter(value)
                    }}
                    value={filter}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {config.filter === 'status' ? (
                        <>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </>
                      ) : null}
                      {config.filter === 'category'
                        ? DOCUMENT_CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))
                        : null}
                      {config.filter === 'role'
                        ? roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))
                        : null}
                    </SelectContent>
                  </Select>
                ) : null}
                <Button
                  aria-label="Refresh saved items"
                  className="w-full sm:w-10 sm:px-0"
                  disabled={query.isFetching}
                  onClick={() => query.refetch()}
                  title="Refresh saved items"
                  type="button"
                  variant="outline"
                >
                  <RefreshCw className={cn('h-4 w-4', query.isFetching && 'animate-spin')} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="min-w-0">
              {query.isLoading ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
              ) : null}
              {!query.isLoading && rows.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No matching items yet.
                </p>
              ) : null}
              {rows.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[190px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          <Link
                            className="min-w-0 text-left text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            href={manageEditHref(resource, record.id)}
                            onClick={() => openEdit(record)}
                          >
                            {recordTitle(record)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {recordMeta(resource, record)}
                        </TableCell>
                        <TableCell>
                          {record._status ? (
                            <Badge
                              className="cursor-default"
                              variant={record._status === 'published' ? 'default' : 'secondary'}
                            >
                              {String(record._status)}
                            </Badge>
                          ) : resource === 'users' ? (
                            <Badge className="cursor-default" variant="secondary">
                              {String(record.role || 'member')}
                            </Badge>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {resource === 'users' ? (
                              <Button
                                onClick={() => sendInvite(record)}
                                size="sm"
                                title="Send invite"
                                variant="outline"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            ) : null}
                            <Button asChild size="sm" variant="outline">
                              <Link
                                href={manageEditHref(resource, record.id)}
                                onClick={() => openEdit(record)}
                              >
                                {config.readOnly ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <Edit className="h-4 w-4" />
                                )}
                              </Link>
                            </Button>
                            {canDelete ? (
                              <Button onClick={() => remove(record)} size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : null}
              <div className="mt-4 flex items-center justify-between">
                <Button
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {page}</span>
                <Button
                  disabled={(result.total || 0) <= page * 10}
                  onClick={() => setPage((current) => current + 1)}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card
            className="mx-auto min-w-0 w-full max-w-3xl scroll-mt-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id={MANAGE_FORM_HASH}
            ref={formRef}
            tabIndex={-1}
          >
            <CardHeader className="gap-4 space-y-0 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle className="text-lg">
                  {config.readOnly
                    ? `View ${sentenceCase(config.singularLabel)}`
                    : editing
                      ? `Edit ${sentenceCase(config.singularLabel)}`
                      : `New ${sentenceCase(config.singularLabel)}`}
                </CardTitle>
                <CardDescription className="mt-2">
                  {config.readOnly
                    ? 'Review the submitted information.'
                    : editing
                      ? 'Update details and save changes.'
                      : 'Fill in the essentials and save.'}
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href={manageResourcePath(resource)}>Back to list</Link>
              </Button>
            </CardHeader>
            <CardContent className="min-w-0">
              {config.readOnly ? (
                <SubmissionDetails record={editing} />
              ) : (
                <form
                  className="grid min-w-0 gap-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    void save(config.draftable ? 'draft' : undefined)
                  }}
                >
                  {isLoadingIntent ? (
                    <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                      Loading selected item...
                    </p>
                  ) : null}
                  {config.fields.map((field) => (
                    <Field
                      field={field}
                      key={field.name}
                      resource={resource}
                      setValue={setValue}
                      values={formValues}
                    />
                  ))}
                  {message ? (
                    <p className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                      {message}
                    </p>
                  ) : null}
                  {error ? (
                    <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                      {error}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    {config.draftable ? (
                      <>
                        <Button disabled={isSaving} type="submit" variant="outline">
                          {savingAction === 'draft' ? 'Saving draft...' : 'Save Draft'}
                        </Button>
                        <Button
                          disabled={isSaving}
                          onClick={() => void save('published')}
                          type="button"
                        >
                          {savingAction === 'publish' ? 'Publishing...' : 'Publish'}
                        </Button>
                      </>
                    ) : (
                      <Button disabled={isSaving} type="submit">
                        {savingAction === 'save' ? 'Saving...' : 'Save'}
                      </Button>
                    )}
                    {editing ? (
                      <Button asChild variant="ghost">
                        <Link href={manageResourcePath(resource)}>Cancel</Link>
                      </Button>
                    ) : null}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

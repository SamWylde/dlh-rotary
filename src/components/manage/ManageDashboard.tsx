'use client'

import { useList } from '@refinedev/core'
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Megaphone,
  Newspaper,
  Plus,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SessionUser } from '@/lib/auth'
import { manageCreateHref, manageEditHref, type ManageUIResource } from '@/lib/manage/navigation'

type RecentRecord = {
  _status?: string
  alt?: string
  fullName?: string
  id: number | string
  title?: string
  updatedAt?: string
}

const quickActions = [
  { icon: Megaphone, label: 'New Announcement', resource: 'announcements' },
  { icon: Newspaper, label: 'New Simple Page', resource: 'pages' },
  { icon: CalendarDays, label: 'New Event', resource: 'events' },
  { icon: FileText, label: 'Upload Document', resource: 'documents' },
  { icon: ClipboardList, label: 'New Form', resource: 'forms' },
  { adminOnly: true, icon: Users, label: 'Add Member', resource: 'users' },
] satisfies {
  adminOnly?: boolean
  icon: typeof Megaphone
  label: string
  resource: ManageUIResource
}[]

const RecentList = ({ resource, title }: { resource: ManageUIResource; title: string }) => {
  const { query, result } = useList<RecentRecord>({
    resource,
    pagination: { currentPage: 1, pageSize: 5 },
  })
  const items = result.data || []

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>Latest saved items</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {query.isLoading ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
        {!query.isLoading && items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing here yet.</p>
        ) : null}
        {items.map((item) => (
          <Link
            className="group flex min-w-0 items-center justify-between gap-3 rounded-md border p-3 transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={manageEditHref(resource, item.id)}
            key={item.id}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                {String(item.title || item.fullName || item.alt || 'Untitled')}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.updatedAt
                  ? new Date(String(item.updatedAt)).toLocaleDateString('en-US')
                  : 'Recently'}
              </p>
            </div>
            {item._status ? (
              <Badge
                className="shrink-0 cursor-default"
                variant={item._status === 'published' ? 'default' : 'secondary'}
              >
                {String(item._status)}
              </Badge>
            ) : null}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export const ManageDashboard = ({ user }: { user: SessionUser }) => {
  const visibleActions = quickActions.filter((action) => !action.adminOnly || user.role === 'admin')

  return (
    <div className="grid min-w-0 gap-6">
      <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary">Club Admin</p>
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
            What would you like to update?
          </h1>
          <p className="mt-1 text-muted-foreground">
            Create posts, events, documents, and member updates from one place.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">View Site</Link>
        </Button>
      </div>

      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {visibleActions.map((action) => {
          const Icon = action.icon

          return (
            <Button
              asChild
              className="h-auto min-w-0 justify-start border-foreground/40 p-4 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
              key={action.resource}
              variant="outline"
            >
              <Link href={manageCreateHref(action.resource)}>
                <Icon className="h-5 w-5 text-primary" />
                <span className="min-w-0 truncate">{action.label}</span>
                <Plus className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          )
        })}
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <RecentList resource="announcements" title="Recent Announcements" />
        <RecentList resource="events" title="Recent Events" />
        <RecentList resource="documents" title="Recent Documents" />
        <RecentList resource="forms" title="Recent Forms" />
        {user.role === 'admin' ? <RecentList resource="users" title="Recent Members" /> : null}
      </div>
    </div>
  )
}

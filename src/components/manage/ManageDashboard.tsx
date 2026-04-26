'use client'

import { useList } from '@refinedev/core'
import { CalendarDays, FileText, Megaphone, Newspaper, Plus, Users } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SessionUser } from '@/lib/auth'

const quickActions = [
  { href: '/manage/announcements', icon: Megaphone, label: 'New Announcement' },
  { href: '/manage/pages', icon: Newspaper, label: 'New Simple Page' },
  { href: '/manage/events', icon: CalendarDays, label: 'New Event' },
  { href: '/manage/documents', icon: FileText, label: 'Upload Document' },
  { href: '/manage/members', icon: Users, label: 'Add Member', adminOnly: true },
]

const RecentList = ({ resource, title }: { resource: string; title: string }) => {
  const { query, result } = useList({
    resource,
    pagination: { currentPage: 1, pageSize: 5 },
  })
  const items = result.data || []

  return (
    <Card>
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
          <div className="flex items-center justify-between gap-3 rounded-md border p-3" key={item.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{String(item.title || item.fullName || item.alt || 'Untitled')}</p>
              <p className="text-xs text-muted-foreground">
                {item.updatedAt ? new Date(String(item.updatedAt)).toLocaleDateString('en-US') : 'Recently'}
              </p>
            </div>
            {item._status ? (
              <Badge variant={item._status === 'published' ? 'default' : 'secondary'}>{String(item._status)}</Badge>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export const ManageDashboard = ({ user }: { user: SessionUser }) => {
  const visibleActions = quickActions.filter((action) => !action.adminOnly || user.role === 'admin')

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Club Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight">What would you like to update?</h1>
          <p className="mt-1 text-muted-foreground">Create posts, events, documents, and member updates from one place.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">View Site</Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {visibleActions.map((action) => {
          const Icon = action.icon

          return (
            <Button asChild className="h-auto justify-start p-4" key={action.href} variant="outline">
              <Link href={action.href}>
                <Icon className="h-5 w-5 text-primary" />
                <span>{action.label}</span>
                <Plus className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentList resource="announcements" title="Recent Announcements" />
        <RecentList resource="events" title="Recent Events" />
        <RecentList resource="documents" title="Recent Documents" />
        {user.role === 'admin' ? <RecentList resource="users" title="Recent Members" /> : null}
      </div>
    </div>
  )
}

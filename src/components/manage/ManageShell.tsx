'use client'

import {
  CalendarDays,
  FileText,
  Home,
  LogOut,
  Megaphone,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import type { SessionUser } from '@/lib/auth'
import { cn } from '@/utilities/ui'

const navItems = [
  { href: '/manage', icon: Home, label: 'Dashboard' },
  { href: '/manage/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/manage/events', icon: CalendarDays, label: 'Events' },
  { href: '/manage/documents', icon: FileText, label: 'Documents' },
  { href: '/manage/pages', icon: Newspaper, label: 'Pages' },
  { href: '/manage/members', icon: Users, label: 'Members', adminOnly: true },
]

export const ManageShell = ({ children, user }: { children: React.ReactNode; user: SessionUser }) => {
  const pathname = usePathname()
  const router = useRouter()
  const visibleItems = navItems.filter((item) => !item.adminOnly || user.role === 'admin')

  const logout = async () => {
    await fetch('/api/users/logout', { method: 'POST' }).catch(() => null)
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="manage-ui min-h-screen bg-muted/30 text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-5 py-4">
            <Link className="flex items-center gap-2 font-semibold" href="/manage">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Club Admin
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">Downtown Lock Haven Rotary</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {visibleItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                    active &&
                      'bg-primary !text-primary-foreground shadow-sm hover:bg-primary hover:!text-primary-foreground',
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className={cn('h-4 w-4', active && '!text-primary-foreground')} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="border-t p-3">
            <p className="px-2 text-sm font-medium">{user.fullName || user.email}</p>
            <p className="px-2 text-xs capitalize text-muted-foreground">{user.role}</p>
            <div className="mt-3 grid gap-2">
              <Button asChild className="justify-start" size="sm" variant="outline">
                <Link href="/">View Site</Link>
              </Button>
              <Button className="justify-start" onClick={logout} size="sm" variant="ghost">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-64">
        <header className="sticky top-0 z-20 border-b bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <Link className="font-semibold" href="/manage">
              Club Admin
            </Link>
            <Button onClick={logout} size="sm" variant="outline">
              Sign Out
            </Button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {visibleItems.map((item) => (
              <Button asChild key={item.href} size="sm" variant={pathname === item.href ? 'default' : 'outline'}>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { CalendarDays, FileText, LayoutDashboard, Megaphone, ShieldCheck, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROLE_LABELS, isPrivilegedRole } from '@/constants/roles'
import { requireUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'

export default async function AccountPage() {
  const user = await requireUser()
  const payload = await getPayloadClient()

  const me = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 1,
    overrideAccess: false,
    user,
  })

  const canManage = isPrivilegedRole(me.role)
  const roleLabel = me.role ? ROLE_LABELS[me.role] : 'Member'

  return (
    <section className="mx-auto grid max-w-5xl gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold">My Account</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage your member profile and open the website tools available to your role.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{me.fullName}</CardTitle>
                <CardDescription>{roleLabel}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{me.email}</p>
            </div>
            {me.title ? (
              <div>
                <p className="font-medium">Title</p>
                <p className="text-muted-foreground">{me.title}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {canManage ? (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Manage CMS</CardTitle>
                  <CardDescription>Edit announcements, events, pages, documents, and member records.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/manage">Open Manage CMS</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/payload-admin">Advanced Admin</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-muted text-muted-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Member Access</CardTitle>
                  <CardDescription>CMS editing is available to club admins and officers.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Links</CardTitle>
          <CardDescription>Jump back to common club resources.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline">
            <Link href="/events">
              <CalendarDays className="h-4 w-4" />
              Events
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/announcements">
              <Megaphone className="h-4 w-4" />
              Announcements
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/documents">
              <FileText className="h-4 w-4" />
              Documents
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

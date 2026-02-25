import { getPayloadClient } from '@/lib/payload'

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: false })

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p>Email: {(siteSettings as { email?: string }).email || 'dlhrotary@gmail.com'}</p>
      <p>
        Meeting: {(siteSettings as { meetingInfo?: { day?: string; time?: string } }).meetingInfo?.day}{' '}
        {(siteSettings as { meetingInfo?: { day?: string; time?: string } }).meetingInfo?.time}
      </p>
      <p className="text-sm text-muted-foreground">
        Publish a contact form through Payload Form Builder and embed or link it on this page.
      </p>
    </section>
  )
}
import { getPayloadClient } from '@/lib/payload'

export default async function DonatePage() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: false })

  const links = (siteSettings as { donationLinks?: Record<string, string | undefined> }).donationLinks || {}

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Donate</h1>
      <p>Support local scholarships and service projects.</p>
      <ul className="list-disc space-y-1 pl-5">
        {Object.entries(links)
          .filter(([, value]) => Boolean(value))
          .map(([provider, value]) => (
            <li key={provider}>
              <a className="underline" href={value} rel="noreferrer" target="_blank">
                {provider.toUpperCase()}
              </a>
            </li>
          ))}
      </ul>
    </section>
  )
}
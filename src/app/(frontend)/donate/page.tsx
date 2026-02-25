import { getSiteSettings } from '@/lib/content'

export default async function DonatePage() {
  const siteSettings = await getSiteSettings()
  const links = siteSettings.donationLinks || {}

  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Donate</h1>
      <p>Support local scholarships and service projects.</p>
      <ul className="list-disc space-y-1 pl-5">
        {Object.entries(links)
          .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].length > 0)
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

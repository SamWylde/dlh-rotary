import Link from 'next/link'

export default function ScholarshipsPage() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-semibold">Scholarships</h1>
      <p>
        The club awards three named scholarships annually for Central Mountain High School seniors.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Eleanor E. J. Kodish Memorial Scholarship ($2,000)</li>
        <li>Dr. Betty Baird Schantz Memorial Scholarship ($2,000)</li>
        <li>Roberta M. Way Memorial Scholarship ($1,500)</li>
      </ul>
      <p>
        Interested in supporting scholarship funding? Visit the <Link className="underline" href="/donate">Donate page</Link>.
      </p>
    </section>
  )
}
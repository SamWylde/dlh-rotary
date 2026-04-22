import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const FlagsOfHonorDonateCTA = () => (
  <section className="grid gap-4 rounded-[24px] border border-border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
    <div className="grid gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-primary)]">
        Support Flags of Honor
      </p>
      <h2 className="text-3xl font-semibold leading-tight">Donate or become a corporate sponsor</h2>
      <p className="max-w-3xl text-base leading-7 text-muted-foreground">
        Visit the dedicated Flags of Honor support page for corporate sponsorship details, flyer
        downloads, and contact information.
      </p>
    </div>
    <div className="flex md:justify-end">
      <Button asChild className="h-auto px-8 py-4 text-base text-white">
        <Link href="/projects/flags-of-honor/donate" style={{ color: '#ffffff' }}>
          Donate to Flags of Honor
        </Link>
      </Button>
    </div>
  </section>
)

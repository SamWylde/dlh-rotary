import type { Payload } from 'payload'

import { seedAnnouncements } from '@/seed/steps/seedAnnouncements'
import { seedEvents } from '@/seed/steps/seedEvents'
import { markSeedCompleted, seedGlobals } from '@/seed/steps/seedGlobals'
import { seedPages } from '@/seed/steps/seedPages'
import { seedProjects } from '@/seed/steps/seedProjects'
import { seedUsers } from '@/seed/steps/seedUsers'

export const seed = async (
  payload: Payload,
  options?: { force?: boolean },
): Promise<{ ran: boolean; message: string }> => {
  const force = Boolean(options?.force)

  const defaultPassword = process.env.SEED_DEFAULT_PASSWORD
  if (!defaultPassword) {
    throw new Error('SEED_DEFAULT_PASSWORD is required for seed execution.')
  }

  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })

  if (!force && siteSettings?.seedCompletedAt) {
    return { ran: false, message: 'Seed skipped because site-settings.seedCompletedAt is already set.' }
  }

  await seedUsers(payload, defaultPassword)
  await seedGlobals(payload)
  await seedPages(payload)
  await seedProjects(payload)
  await seedEvents(payload)
  await seedAnnouncements(payload)
  await markSeedCompleted(payload)

  return { ran: true, message: 'Seed completed successfully.' }
}


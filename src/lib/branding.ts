import { getMediaURL } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload-types'

export type BrandingAssets = {
  logoURL: string | null
  iconURL: string | null
}

const getSiteSettings = async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()

  return (await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    overrideAccess: false,
  })) as SiteSetting
}

export const getBrandingAssets = async (): Promise<BrandingAssets> => {
  const siteSettings = await getSiteSettings()

  return {
    logoURL: getMediaURL(siteSettings.logo) || getMediaURL(siteSettings.logoSimplified),
    iconURL: getMediaURL(siteSettings.logoSimplified) || getMediaURL(siteSettings.logo),
  }
}


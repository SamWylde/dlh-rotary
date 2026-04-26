import type { Metadata } from 'next'
import Script from 'next/script'
import React from 'react'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { ThemeLoader } from '@/components/layout/ThemeLoader'
import { getCurrentUser } from '@/lib/auth'
import { fontVariables } from '@/lib/fonts'
import type { FooterNavEntry, MainNavEntry } from '@/lib/nav'
import { getPayloadClient } from '@/lib/payload'

import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rotary Club of Downtown Lock Haven',
  description: 'Service Above Self',
}

const GOOGLE_ANALYTICS_ID = 'G-Z5JENXY6S6'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let email: string | undefined
  let phone: string | undefined
  let address: string | undefined
  let facebookUrl: string | undefined
  let mainNav: MainNavEntry[] = []
  let footerNav: FooterNavEntry[] = []
  let activeTheme: string | undefined
  let customAccentColor: string | undefined
  let auth: Awaited<ReturnType<typeof getCurrentUser>> = { token: null, user: null }

  try {
    const payload = await getPayloadClient()

    const [siteSettings, navigation, theme, authResult] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', overrideAccess: false }),
      payload.findGlobal({ slug: 'navigation', depth: 1, overrideAccess: false }),
      payload.findGlobal({ slug: 'theme', overrideAccess: false }),
      getCurrentUser(),
    ])

    email = siteSettings.email ?? undefined
    phone = siteSettings.phone ?? undefined
    address = siteSettings.address ?? undefined
    facebookUrl = siteSettings.socialMedia?.facebook ?? undefined
    mainNav = navigation.mainNav ?? []
    footerNav = navigation.footerNav ?? []
    activeTheme = theme.activeTheme ?? undefined
    customAccentColor = theme.customAccentColor ?? undefined
    auth = authResult
  } catch (error) {
    // Degrade gracefully if DB is unavailable (e.g. Neon cold start timeout)
    console.error('Failed to load layout data:', error)
  }

  return (
    <html className={fontVariables} lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <ThemeLoader activeTheme={activeTheme} customAccentColor={customAccentColor} />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="flex flex-col">
        <SiteHeader nav={mainNav} user={auth.user} />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        <SiteFooter
          contactEmail={email}
          contactPhone={phone}
          address={address}
          facebookUrl={facebookUrl}
          nav={footerNav}
        />
      </body>
    </html>
  )
}

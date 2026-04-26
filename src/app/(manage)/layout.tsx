import type { Metadata } from 'next'
import React from 'react'

import { fontVariables } from '@/lib/fonts'

import '../(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'Manage - Rotary Club of Downtown Lock Haven',
}

export default function ManageRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={fontVariables} lang="en">
      <body>{children}</body>
    </html>
  )
}

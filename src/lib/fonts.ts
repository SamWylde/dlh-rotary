import { DM_Sans, Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-heading-font',
  weight: ['400', '700'],
})

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body-font',
  weight: ['400', '500', '600', '700'],
})

export const fontVariables = `${libreBaskerville.variable} ${dmSans.variable}`

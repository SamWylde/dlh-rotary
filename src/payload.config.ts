import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { isAdminOrOfficer } from '@/access'
import { Announcements } from '@/collections/Announcements'
import { Documents } from '@/collections/Documents'
import { Events } from '@/collections/Events'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Projects } from '@/collections/Projects'
import { RSVPs } from '@/collections/RSVPs'
import { Users } from '@/collections/Users'
import { Navigation } from '@/globals/Navigation'
import { SiteSettings } from '@/globals/SiteSettings'
import { Theme } from '@/globals/Theme'
import {
  BLOB_READ_WRITE_TOKEN,
  DATABASE_URL,
  DEFAULT_FROM_EMAIL,
  DEFAULT_FROM_NAME,
  PAYLOAD_SECRET,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from '@/lib/env'
import { seed } from '@/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Icon: '/components/payload/Icon',
        Logo: '/components/payload/Logo',
      },
    },
  },
  collections: [Users, Pages, Events, RSVPs, Announcements, Projects, Documents, Media],
  globals: [SiteSettings, Theme, Navigation],
  db: postgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: DATABASE_URL,
    },
  }),
  editor: lexicalEditor(),
  email: nodemailerAdapter({
    defaultFromAddress: DEFAULT_FROM_EMAIL,
    defaultFromName: DEFAULT_FROM_NAME,
    transportOptions: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: BLOB_READ_WRITE_TOKEN,
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      formOverrides: {
        access: {
          read: () => true,
          create: isAdminOrOfficer,
          update: isAdminOrOfficer,
        },
      },
      formSubmissionOverrides: {
        access: {
          read: isAdminOrOfficer,
          create: () => true,
        },
      },
    }),
    seoPlugin({
      collections: ['pages', 'events', 'projects', 'announcements'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || 'Rotary'} - Rotary Club of Downtown Lock Haven`,
      generateDescription: ({ doc }) => {
        const description = (doc as { description?: unknown })?.description
        return typeof description === 'string' ? description : ''
      },
      generateURL: ({ doc, collectionSlug }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        if (collectionSlug === 'pages') return `${base}/${doc?.slug || ''}`
        return `${base}/${collectionSlug}/${doc?.slug || ''}`
      },
    }),
  ],
  secret: PAYLOAD_SECRET,
  sharp,
  onInit: async (payload) => {
    if (process.env.RUN_SEED_ON_INIT !== 'true') return

    try {
      const result = await seed(payload, {
        force: process.env.SEED_FORCE === 'true',
      })
      payload.logger.info(result.message)
    } catch (error) {
      payload.logger.error(`Seed failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

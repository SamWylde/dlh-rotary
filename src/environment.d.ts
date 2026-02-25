declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URI?: string
    BLOB_READ_WRITE_TOKEN?: string
    PAYLOAD_SECRET?: string
    NEXT_PUBLIC_SERVER_URL?: string
    RESEND_API_KEY?: string
    DEFAULT_FROM_EMAIL?: string
    RUN_SEED_ON_INIT?: 'true' | 'false'
    SEED_FORCE?: 'true' | 'false'
    SEED_SECRET?: string
    SEED_DEFAULT_PASSWORD?: string
    SEED_ADMIN_EMAIL?: string
    SEED_ADMIN_NAME?: string
  }
}
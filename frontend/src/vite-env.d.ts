interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_SCHEDULE_URL: string
  readonly VITE_API_TEAMS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

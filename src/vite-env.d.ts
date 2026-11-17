/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Address of the SuiLa backend. Leave empty to run on sample data. */
  readonly VITE_API_URL?: string
}

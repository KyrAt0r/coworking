// <reference interfaces="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_COWORKING_SERVICE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

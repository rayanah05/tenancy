import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Inside Figma (FIGMA is set), serve on the port/host Figma provides and use its public base path.
const figmaBase = process.env.FIGMA && process.env.FIGMA_PUBLIC_URL ? new URL(process.env.FIGMA_PUBLIC_URL).pathname : '/'

export default defineConfig({
  plugins: [react()],
  base: figmaBase.endsWith('/') ? figmaBase : figmaBase + '/',
  server: {
    port: process.env.FIGMA ? Number(process.env.PORT) : 5173,
    host: process.env.FIGMA ? (process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0') : undefined,
    strictPort: Boolean(process.env.FIGMA),
  },
})

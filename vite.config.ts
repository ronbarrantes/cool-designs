/// <reference types="vite/client" />

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Assets are copied as files; prerendering would decode binary images as text.
        filter: ({ path }) => !path.startsWith('/assets/'),
      },
    }),
    nitro(),
    viteReact(),
  ],
})

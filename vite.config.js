import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'ecommerce-frontend',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./ecommerce-frontend/src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
})

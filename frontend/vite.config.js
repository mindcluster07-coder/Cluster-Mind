import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
    },
    proxy: {
      '/api': 'http://localhost:4000',
      '/ml': {
        target: 'http://localhost:8000',
        rewrite: (path) => path.replace(/^\/ml/, ''),
      },
    },
  },
})

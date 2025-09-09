import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: [
      // Add other aliases as needed
    ],
  },

  define: {
    global: {},
  },

  server: {
    port: 5173, // Set your desired port here
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
})

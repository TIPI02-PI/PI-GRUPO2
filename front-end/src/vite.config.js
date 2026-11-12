import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Porta onde o seu servidor backend está a correr
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    restoreMocks: true,
    globals: true,
    setupFiles: ['./candywrappa/setup.js'],
  },
})

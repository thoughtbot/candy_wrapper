import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    restoreMocks: true,
    globals: true,
    setupFiles: ['./setup.js'],
    server: {
      deps: {
        inline: [
          /@adobe\/react-spectrum/,
          /@react-spectrum/,
          /@spectrum-icons/,
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@thoughtbot/candy_wrapper': path.resolve(__dirname, './src/index'),
    },
  },
})

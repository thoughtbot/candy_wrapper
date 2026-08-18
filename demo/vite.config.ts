import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('@tailwindcss/postcss')],
    },
  },
  root: __dirname,
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../demo-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        vanilla: path.resolve(__dirname, 'frames/vanilla.html'),
        ark: path.resolve(__dirname, 'frames/ark.html'),
        chakra: path.resolve(__dirname, 'frames/chakra.html'),
        mantine: path.resolve(__dirname, 'frames/mantine.html'),
        heroui: path.resolve(__dirname, 'frames/heroui.html'),
        mui: path.resolve(__dirname, 'frames/mui.html'),
        'react-aria': path.resolve(__dirname, 'frames/react-aria.html'),
        'react-spectrum': path.resolve(__dirname, 'frames/react-spectrum.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@thoughtbot/candy_wrapper': path.resolve(__dirname, '../src/index'),
    },
  },
  optimizeDeps: {
    include: [
      '@adobe/react-spectrum',
      '@react-spectrum/provider',
      '@react-spectrum/theme-default',
    ],
  },
})

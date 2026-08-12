import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../demo-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        vanilla: path.resolve(__dirname, 'frames/vanilla.html'),
        shadcn: path.resolve(__dirname, 'frames/shadcn.html'),
        chakra: path.resolve(__dirname, 'frames/chakra.html'),
        mantine: path.resolve(__dirname, 'frames/mantine.html'),
        mui: path.resolve(__dirname, 'frames/mui.html'),
        primereact: path.resolve(__dirname, 'frames/primereact.html'),
        'react-aria': path.resolve(__dirname, 'frames/react-aria.html'),
        'react-spectrum': path.resolve(__dirname, 'frames/react-spectrum.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@thoughtbot/candy_wrapper': path.resolve(__dirname, '../src/index'),
      '@/components/ui': path.resolve(
        __dirname,
        '../wrappers/ts/shadcn/v4/components/ui'
      ),
      '@/registry/bases/radix/lib': path.resolve(
        __dirname,
        '../wrappers/ts/shadcn/v4/registry/bases/radix/lib'
      ),
      '@/app/(create)/components': path.resolve(
        __dirname,
        '../wrappers/ts/shadcn/v4/app/(create)/components'
      ),
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

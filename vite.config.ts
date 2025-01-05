import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [
    reactPlugin({
      jsxImportSource: '@emotion/react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 
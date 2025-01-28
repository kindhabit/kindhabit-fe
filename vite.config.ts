import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['@/components/chat', '@/core/components/common']
  },
  server: {
    watch: {
      ignored: ['**/src/components/chat/**', '**/src/core/components/common/**']
    }
  }
}); 
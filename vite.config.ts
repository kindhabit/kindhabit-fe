import { defineConfig, loadEnv } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
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
    },
    define: {
      'process.env': env
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', '@mui/material'],
          }
        }
      },
      chunkSizeWarningLimit: 800
    },
    publicDir: 'public',
    server: {
      hmr: {
        overlay: true,
        // 필요한 경우 host와 port 설정 추가
        // host: 'localhost',
        // port: 3000
      }
    },
    base: '/',
  };
}); 
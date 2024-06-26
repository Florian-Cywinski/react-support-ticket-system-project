import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslintPlugin({
    //   cache: false,
    //   include: ['./src/**/*.js', './src/**/*.jsx'],
    //   exclude: [],
    // }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    // Another way - to have it separately
    // '/api/users': {
    // target: 'http://localhost:5000',
    // changeOrigin: true,
    //   },
    // '/api/tickets': {
    //   target: 'http://localhost:5000',
    //   changeOrigin: true,
    //   },
    },
  },
})
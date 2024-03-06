import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    //port: 3000,
    open: true,//服务启动时自动在浏览器中打开应用
    // http://localhost:3030/api/user的请求都会变成 http://localhost:8080/user
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
})

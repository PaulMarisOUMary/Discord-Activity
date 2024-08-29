import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'http://server:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/\.proxy/, '')
      },
    },
    // hmr: {
    //   clientPort: 443,
    // },
  },
})
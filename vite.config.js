import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', 
    treeShaking: true, 
    outDir: 'dist', 
    rollupOptions: {
      output: {
        
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    }}
})

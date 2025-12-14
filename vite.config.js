import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@lottiefiles/lottie-player']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    devSourcemap: true
  }
});

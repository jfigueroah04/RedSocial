import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: './dist',
  },
  server: {
    port: 5173,
    open: true,
  },
});


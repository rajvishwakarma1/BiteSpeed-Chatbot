import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Read base path from env for deployments (e.g., \/ if at root)
const BASE = process.env.VITE_BASE || '/';
const ENABLE_SOURCEMAP = process.env.VITE_SOURCEMAP === 'true';

export default defineConfig({
  base: BASE,
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: ENABLE_SOURCEMAP,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactflow: ['@xyflow/react'],
        },
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (ext === 'css') return 'assets/css/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    minify: 'esbuild',
    target: 'es2018',
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
});

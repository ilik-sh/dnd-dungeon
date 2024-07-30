import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const plugins = [react(), tsconfigPaths()];

export default defineConfig({
  plugins: plugins,
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});

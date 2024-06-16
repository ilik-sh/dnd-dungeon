import MillionLint from '@million/lint';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const plugins = [react(), tsconfigPaths()];

export default defineConfig({
  plugins: plugins,
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

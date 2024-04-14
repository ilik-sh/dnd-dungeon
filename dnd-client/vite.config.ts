import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import MillionLint from '@million/lint';

const plugins = [react(), MillionLint.vite(), tsconfigPaths()];

export default defineConfig({
  plugins: plugins,
});

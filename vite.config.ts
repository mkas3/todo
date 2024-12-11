import react from '@vitejs/plugin-react';

import path from 'node:path';

import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});

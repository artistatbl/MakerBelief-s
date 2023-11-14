import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

// Import additional modules
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite'; // Import defineConfig from 'vite' package

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/tokens': path.resolve(__dirname, 'src/tokens/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

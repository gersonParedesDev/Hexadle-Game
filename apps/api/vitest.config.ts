import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    alias: {
      '@domain': path.resolve(__dirname, '../../domain/src'),
    },
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
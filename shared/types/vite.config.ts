import { defineConfig } from 'vite';
import { resolve } from 'path';
import { BASIC_CONF } from '../../vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  ...BASIC_CONF,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue_nestjs_test_types',
    },
    // Rollup conf
    rollupOptions: {
      input: {
        main: './src/index.ts',
      },
      output: {
        exports: 'named',
      },
    },
  },
});

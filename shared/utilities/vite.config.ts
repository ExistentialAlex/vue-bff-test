import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import { BASIC_CONF } from '../../vite.config';

// https://vitejs.dev/config/
export default mergeConfig(
  BASIC_CONF,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'vue_nestjs_test_utilities',
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
  })
);

import { fileURLToPath, URL } from 'node:url';

import { defineConfig, mergeConfig } from 'vite';
import vueRouter from 'unplugin-vue-router/vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import ui from '@nuxt/ui/vite';
import Layouts from 'vite-plugin-vue-layouts';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { BASIC_CONF } from '../vite.config';
import path from 'path';

const PROXY_CONF = {
  target: 'http://localhost:3000',
  secure: false,
  changeOrigin: true,
};

const BASIC_PROXY_OBJ = {
  '^/api/.*': PROXY_CONF,
};

// https://vite.dev/config/
export default mergeConfig(
  BASIC_CONF,
  defineConfig({
    plugins: [
      vueRouter(),
      vue(),
      vueDevTools(),
      Layouts(),
      ui(),
      VueI18nPlugin({
        include: [path.resolve(__dirname, './src/i18n/locales/**')],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: BASIC_PROXY_OBJ,
    },
  })
);

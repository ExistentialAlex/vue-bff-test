import { fileURLToPath, URL } from 'node:url'

import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { BASIC_CONF } from '../vite.config'

const PROXY_CONF = {
  target: 'http://localhost:3000',
  secure: false,
  changeOrigin: true,
}

const BASIC_PROXY_OBJ = {
  '^/api/.*': PROXY_CONF,
}

// https://vite.dev/config/
export default mergeConfig(
  BASIC_CONF,
  defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: BASIC_PROXY_OBJ,
    },
  }),
)

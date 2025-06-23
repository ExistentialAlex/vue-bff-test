import { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

export const BASIC_CONF: UserConfig = {
  plugins: [
    // save types
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    // set an alias for easy development
    alias: {
      '@': './src',
    },
  },
};

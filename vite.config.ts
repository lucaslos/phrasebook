import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{ find: '@src', replacement: '/src' }],
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import {jsx} from '@emotion/react'`,
  },
});

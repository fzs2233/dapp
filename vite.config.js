import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// node-polyfill-webpack-plugins

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // define: {
  //   global: 'window',
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     define: {
  //       global: 'globalThis',
  //     },
  //   },
  // },
})

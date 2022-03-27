import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // copy({
    //   targets: [
    //     { src: './node_modules/@fortawesome/fontawesome-free/webfonts/*', dest: 'public/webfonts' },
    //   ]
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // css: {
  //   postcss: {
  //
  //   },
  // }
})

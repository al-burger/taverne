import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    global: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
  },
})

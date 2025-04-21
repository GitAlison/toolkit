import { defineConfig } from 'vite'

export default defineConfig({
  base: '',
  build: {
    outDir: 'extension',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});

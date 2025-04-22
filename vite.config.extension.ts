import { defineConfig } from 'vite'

export default defineConfig({
  base: '',
  build: {
    outDir: 'extension',
    rollupOptions:{
      input:{
        popup: "index.html",
      },
      output:{
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      }
    },
  },
});

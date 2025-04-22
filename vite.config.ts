import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


export const viteConfig = {
  base: 'https://gitalison.github.io/toolkit',
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
}

export default defineConfig(viteConfig);

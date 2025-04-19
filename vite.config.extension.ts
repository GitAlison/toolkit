import { viteConfig } from './vite.config';
import { defineConfig } from 'vite'


export default () => {

  return defineConfig({
    ...viteConfig,
    base: '',
  });

} 
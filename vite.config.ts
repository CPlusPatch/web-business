import { defineConfig } from 'vite';
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), ViteImageOptimizer()],
})

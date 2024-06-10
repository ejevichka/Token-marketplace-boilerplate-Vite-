import { defineConfig } from "vite";
import autoprefixer from 'autoprefixer';
import fixReactVirtualized from "esbuild-plugin-react-virtualized";
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss(),
      ],
    },
  },
});

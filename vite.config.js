import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ styles: 'none', autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: false,
    // Use Vite lib mode https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: path.resolve(__dirname, './src/plugin.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        // Overwrite default Vite output fileName
        entryFileNames: 'main.js',
        assetFileNames: 'styles.css',
      },
      external: ['obsidian'],
    },
    emptyOutDir: false, // otherwise data.json that obsidian creates will get deleted on every change
    outDir: './dist',
  },
  define: {
    document: 'activeDocument',
    // window: 'activeWindow',
    setTimeout: 'activeWindow.setTimeout',
    setInterval: 'activeWindow.setInterval',
    requestAnimationFrame: 'activeWindow.requestAnimationFrame',
  }
})

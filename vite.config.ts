
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Assicura che i percorsi siano relativi per GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});

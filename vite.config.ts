import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Указывает имя для файлов CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) return 'style.css';
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'index.js', // Устанавливает имя для чанков JS (например, для ленивой загрузки)
        entryFileNames: 'index.js', // Устанавливает имя для входного JS файла
      },
    },
  },
  base: './',
  plugins: [react(), svgr()],
});

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Bemærk: Ingen `define`-blok med API-nøgler her — alt hvad der står i
// define ender i klart tekst i den offentlige JS-bundle. Gemini-kald
// sker server-side via /api/ai med GEMINI_API_KEY fra Vercel env.
export default defineConfig(() => {
    return {
      base: '/',
      build: {
        outDir: 'dist',
        emptyOutDir: true,
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

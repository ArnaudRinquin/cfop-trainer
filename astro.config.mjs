import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cfop-trainer.netlify.app',
  integrations: [react(), mdx()],
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // cubing.js relies on dynamic chunk loading (puzzles-dynamic-3x3x3, etc.)
      // that Vite's dep pre-bundler breaks. Exclude so Vite serves it directly.
      exclude: ['cubing', 'cubing/twisty', 'cubing/alg', 'cubing/puzzles', 'cubing/kpuzzle'],
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});

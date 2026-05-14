import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://virge-creator.github.io',
  base: '/blog-rene-dohmen-site/',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
});

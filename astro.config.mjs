// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL pública de la landing (ej: https://fixtra.jglabs.tech). Habilita sitemap,
// canonical y og:url. Sin SITE_URL el build funciona igual, pero sin esas etiquetas.
const site = process.env.SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});

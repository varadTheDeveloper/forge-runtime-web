// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site is served from: https://forge.js.org/ (custom domain, site at the root).
// SITE_URL and BASE_PATH can override this, e.g. SITE_URL=https://varadthedeveloper.github.io
// BASE_PATH=/forge-runtime-web to build for the plain GitHub Pages address.
const site = process.env.SITE_URL || 'https://forge.js.org';
// An empty or missing BASE_PATH means the site lives at the root.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

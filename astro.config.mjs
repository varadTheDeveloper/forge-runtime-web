// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site is served from.
// - GitHub Pages (default): https://varadthedeveloper.github.io/forge-runtime-web/
// - Custom domain later: set SITE_URL=https://your-domain.com and BASE_PATH=/
//   (the deploy workflow passes these in automatically from GitHub Pages settings).
const site = process.env.SITE_URL || 'https://varadthedeveloper.github.io';
// An empty BASE_PATH (custom domain) means the site lives at the root.
const base = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH || '/' : '/forge-runtime-web';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

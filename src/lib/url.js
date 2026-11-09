// Builds links that respect the site's base path (/ on forge.js.org).
const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';

/** Relative-to-site path, e.g. url('blog/') -> /blog/ */
export function url(path = '') {
  return BASE + String(path).replace(/^\/+/, '');
}

/** Absolute URL for canonical links, Open Graph, sitemaps, feeds. */
export function absoluteUrl(path, site) {
  return new URL(url(path), site).href;
}

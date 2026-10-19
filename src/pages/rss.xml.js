import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts.js';
import { SITE } from '../consts.js';
import { url, absoluteUrl } from '../lib/url.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Forge blog',
    description: SITE.description,
    site: absoluteUrl('', context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: url(`blog/${p.id}/`),
      categories: p.data.tags,
      author: p.data.author,
      content: p.rendered?.html,
    })),
    customData: '<language>en-us</language>',
  });
}

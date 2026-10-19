import { getPosts } from '../../lib/posts.js';
import { ogImage } from '../../lib/og.js';
import { SITE } from '../../consts.js';

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    { params: { slug: 'home' }, props: { title: 'JavaScript, armored.', subtitle: 'An experimental JavaScript runtime built from scratch on SpiderMonkey, designed so every package runs with only the permissions it declares.' } },
    { params: { slug: 'blog' }, props: { title: 'The Forge blog', subtitle: 'Notes from building a JavaScript runtime from scratch on SpiderMonkey.' } },
    { params: { slug: 'manifesto' }, props: { title: 'The Forge Manifesto', subtitle: 'Why Forge exists, and why it is built from scratch.' } },
    ...posts.map((p) => ({ params: { slug: `blog/${p.id}` }, props: { title: p.data.title, subtitle: p.data.description, footer: 'The Forge Project / Blog' } })),
  ];
}

export async function GET({ props }) {
  const png = await ogImage(props);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}

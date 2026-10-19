// Every page and post in one plain-text file, for AI agents that want it all at once.
import { getPosts } from '../lib/posts.js';
import { homeMarkdown, manifestoMarkdown, postMarkdown } from '../lib/markdown.js';

export async function GET({ site }) {
  const posts = await getPosts();
  const parts = [await homeMarkdown(site), await manifestoMarkdown(), ...posts.map((p) => postMarkdown(p, site))];
  return new Response(parts.join('\n\n---\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

import { getPosts } from '../../lib/posts.js';
import { postMarkdown, mdResponse } from '../../lib/markdown.js';
export async function getStaticPaths() {
  return (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}
export function GET({ props, site }) { return mdResponse(postMarkdown(props.post, site)); }

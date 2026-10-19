import { blogIndexMarkdown, mdResponse } from '../../lib/markdown.js';
export async function GET({ site }) { return mdResponse(await blogIndexMarkdown(site)); }

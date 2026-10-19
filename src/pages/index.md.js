import { homeMarkdown, mdResponse } from '../lib/markdown.js';
export async function GET({ site }) { return mdResponse(await homeMarkdown(site)); }

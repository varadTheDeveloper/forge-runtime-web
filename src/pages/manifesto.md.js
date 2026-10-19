import { manifestoMarkdown, mdResponse } from '../lib/markdown.js';
export async function GET() { return mdResponse(await manifestoMarkdown()); }

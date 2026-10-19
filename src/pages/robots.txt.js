import { absoluteUrl } from '../lib/url.js';

// Search engines and AI agents are all welcome. The named AI crawlers are listed
// explicitly so the intent is unambiguous.
const aiAgents = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot',
];

export function GET({ site }) {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiAgents.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${absoluteUrl('sitemap-index.xml', site)}`,
    '',
    `# Summary for AI agents: ${absoluteUrl('llms.txt', site)}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

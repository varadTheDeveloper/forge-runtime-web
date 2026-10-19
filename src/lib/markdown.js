// Markdown versions of pages, for AI agents and language models.
import { getEntry } from 'astro:content';
import * as c from './content.js';
import { SITE, AUTHOR, REPO } from '../consts.js';
import { getPosts, formatDate } from './posts.js';
import { absoluteUrl } from './url.js';

export const mdResponse = (body) => new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });

export async function homeMarkdown(site) {
  const a = (p) => absoluteUrl(p, site);
  const posts = await getPosts();
  const table = [
    '| Benchmark | Forge | Bun | Node | Winner |',
    '|---|---:|---:|---:|---|',
    ...c.bench.map((r) => `| ${r.name} | ${c.ms(r.forge)} | ${c.ms(r.bun)} | ${c.ms(r.node)} | ${c.winner(r)} |`),
  ].join('\n');
  return `# Forge

${c.intro.join('\n\n')}

Website: ${a('')} · Source: ${REPO} · License: MIT

## What is Forge?

${c.whatIs.join('\n\n')}

Manifesto: ${a('manifesto/')}

## Kavach

*${c.kavach.status}*

${c.kavach.text}

${c.kavach.points.map((p) => `- ${p}`).join('\n')}

A package's manifest would look like this:

\`\`\`jsonc
${c.kavach.manifest}
\`\`\`

## Current progress

${c.progress.map((p) => `- ${p}`).join('\n')}

${c.platform}

## Running Forge

Create a file called \`hello.js\`:

\`\`\`js
${c.running.file}
\`\`\`

Run it:

\`\`\`sh
${c.running.run}
\`\`\`

${c.running.note} README: ${REPO}#readme

## Benchmarks

${table}

Lower is better. Median of 5 runs per script on one Windows machine (${c.benchDate}). Full report: ${REPO}/blob/main/Forge_Benchmark_Report.md

## Roadmap

${c.roadmap.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Blog

${posts.map((p) => `- [${p.data.title}](${a(`blog/${p.id}/`)}) (${formatDate(p.data.date)}): ${p.data.description}`).join('\n') || 'No posts yet.'}

---

Forge is built by ${AUTHOR.name} (${AUTHOR.github}). Released under the MIT License.
`;
}

export async function manifestoMarkdown() {
  const entry = await getEntry('pages', 'manifesto');
  return entry.body.trim() + '\n';
}

export function postMarkdown(post, site) {
  const d = post.data;
  return `# ${d.title}

By ${d.author}, ${formatDate(d.date)}${d.updated ? ` (updated ${formatDate(d.updated)})` : ''}.
URL: ${absoluteUrl(`blog/${post.id}/`, site)}

> ${d.description}

${post.body.trim()}
`;
}

export async function blogIndexMarkdown(site) {
  const posts = await getPosts();
  return `# Forge blog

Notes from building Forge, a JavaScript runtime written from scratch on SpiderMonkey.

${posts.map((p) => `- [${p.data.title}](${absoluteUrl(`blog/${p.id}.md`, site)}) (${formatDate(p.data.date)}): ${p.data.description}`).join('\n') || 'No posts yet.'}
`;
}

export { SITE };

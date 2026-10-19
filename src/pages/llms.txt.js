// The index for AI agents and language models (format: https://llmstxt.org).
import { getPosts } from '../lib/posts.js';
import { SITE, REPO } from '../consts.js';
import { absoluteUrl } from '../lib/url.js';

export async function GET({ site }) {
  const posts = await getPosts();
  const a = (p) => absoluteUrl(p, site);
  const body = `# Forge

> ${SITE.description}

Important notes for agents writing or explaining Forge code:

- Forge is in early development. It runs on Windows x64 and is built from source.
- Forge is not Node.js and is not Node-compatible by design. There is no \`require()\`, no \`process\`, no \`Buffer\`, and no npm packages.
- There is no module system yet: write plain scripts, without \`import\` or top-level \`await\`.
- Output: \`print(value)\`. Timers: \`setTimeout\`, \`setInterval\`, \`clearTimeout\`. Microtasks: \`queueMicrotask\`.
- Files: a global \`fs\` object. Blocking: \`fs.readFileSync(path, "utf8")\`, \`fs.writeFileSync\`, \`fs.appendFileSync\`, \`fs.existsSync\`, \`fs.mkdirSync(path, { recursive: true })\`, \`fs.rmSync\`, \`fs.statSync(path).size\`. Promise-based: \`fs.readFile\`, \`fs.writeFile\`, \`fs.appendFile\`, \`fs.exists\`, \`fs.mkdir\`, \`fs.rm\`, \`fs.stat\`.
- Errors thrown by \`fs\` carry \`.code\` (for example \`"NotFound"\`, \`"AlreadyExists"\`), \`.syscall\`, and \`.path\`.
- Kavach (per-package permissions) and the Forge package registry are planned, not built.

## Docs

- [Home](${a('index.md')}): what Forge is, Kavach, current progress, running Forge, benchmarks, roadmap
- [Manifesto](${a('manifesto.md')}): why Forge exists
- [Everything in one file](${a('llms-full.txt')}): all pages and blog posts

## Blog

${posts.map((p) => `- [${p.data.title}](${a(`blog/${p.id}.md`)}): ${p.data.description}`).join('\n') || '- No posts yet.'}

## Optional

- [Source code](${REPO}): MIT licensed
- [Benchmark report](${REPO}/blob/main/Forge_Benchmark_Report.md)
- [Roadmap](${REPO}/blob/main/ROADMAP.md)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

// The facts on the home page, written once. Both the HTML page (index.astro)
// and the Markdown version for AI agents (index.md.js) are generated from this,
// so they can never disagree. Inline `code` and **bold** use Markdown syntax.

export const intro = [
  "Forge is an experimental **JavaScript runtime** built on Mozilla's SpiderMonkey engine. Everything beneath the engine (memory management, containers, the event loop, the filesystem layer) is custom C++17 with zero external dependencies.",
  'JavaScript, armored: Forge is designed so every package runs with only the permissions it declares.',
  'The project is in *early development*. Everything there is to know about it is linked, directly or indirectly, from this page.',
];

export const whatIs = [
  'The industry keeps layering faster APIs and better tooling on top of the same shared foundation. Forge starts from a different question: what if the runtime were built from scratch for this era, instead of inherited from one?',
  'That is why Forge runs on SpiderMonkey instead of V8, and why its core is written from the ground up.',
  'And this era has a new problem. Any package you install can read your files, steal your keys, and send them anywhere, and AI agents now install packages nobody has read. Forge is being built so that cannot happen. It is its own ecosystem, not another Node: its own runtime, standard library, and package registry.',
];

export const kavach = {
  status: 'Planned. In design.',
  text: 'Kavach (कवच, "armor") is the security layer Forge is designed around. Every package declares the access it needs, and the runtime enforces it, per package, on by default.',
  points: [
    'Per-package permissions for files, network, and environment',
    'New permissions in an update need your approval',
    'No install scripts. Nothing runs when you install.',
    'A package registry built for this from the start',
  ],
  manifest: `// forge.json (planned design)
{
  "name": "@varad/weather",
  "permissions": {
    "net": ["api.weather.example"],
    "fs": false,
    "env": false
  }
}`,
};

export const progress = [
  'SpiderMonkey integration',
  'Forge Core foundation: Types, Error, Result, Assert, Allocator, UniquePtr, Vector, String, StringView, Span, Array, Queue, Stack, HashMap, HashSet',
  'Native Windows IOCP event loop',
  'Thread pool',
  'Timers: `setTimeout()`, `setInterval()`, `clearTimeout()`',
  'Microtask queue: `queueMicrotask()`',
  'Filesystem API: `fs.readFileSync()`, `fs.writeFileSync()`, `fs.appendFileSync()`, `fs.existsSync()`, `fs.mkdirSync()`, `fs.rmSync()`, `fs.statSync()`',
  'Async filesystem API, returning Promises: `fs.readFile()`, `fs.writeFile()`, `fs.appendFile()`, `fs.exists()`, `fs.mkdir()`, `fs.rm()`, `fs.stat()`',
  'Runtime self-tests (`forge --self-test`), including async tests that drive the real event loop',
  'Benchmark suite',
];

export const platform = 'Platform: Windows x64. Linux and macOS support are planned.';

export const running = {
  file: `print("Hello Forge!");`,
  run: 'forge.exe hello.js',
  note: 'Forge is currently built from source on Windows. See the README for build instructions.',
};

// Medians in ms, 2026-08-02 run of bench/run-benchmarks.ps1, one Windows machine. Lower is better.
export const benchDate = '2026-08-02';
export const bench = [
  { name: 'Startup', forge: 21.58, bun: 40.02, node: 47.0 },
  { name: 'JSON', forge: 378.19, bun: 256.88, node: 558.21 },
  { name: 'Loop', forge: 83.85, bun: 73.92, node: 97.29 },
  { name: 'Timers', forge: 23.12, bun: 54.18, node: 61.28 },
  { name: 'Microtasks', forge: 57.04, bun: 55.2, node: 108.92 },
  { name: 'Promise chains', forge: 87.39, bun: 45.69, node: 48.59 },
  { name: 'Filesystem', forge: 802.58, bun: 1054.32, node: 938.36 },
  { name: 'Async filesystem', forge: 935.39, bun: 1239.99, node: 1413.65 },
];
export const winner = (r) => ({ forge: 'Forge', bun: 'Bun', node: 'Node' })[['forge', 'bun', 'node'].reduce((a, b) => (r[a] <= r[b] ? a : b))];
export const ms = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ms';

export const roadmap = [
  'Module system (`import` / `export`)',
  'Web-standard APIs: `fetch`, `URL`, streams',
  'Networking API and HTTP server',
  'Kavach: per-package permissions',
  'The Forge package registry',
  'One-binary toolchain: run, test, format, publish',
  'Worker threads',
  'Linux support',
  'macOS support',
];

// --- tiny Markdown-inline to HTML helper (only `code`, **bold**, *italic*) ---
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function inline(md) {
  return escapeHtml(md)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\*([^*]+)\*/g, '<i>$1</i>');
}

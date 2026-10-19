---
title: "Hello, Forge"
description: "Why I'm building a JavaScript runtime from scratch on SpiderMonkey, what works today, and where Forge is going next."
date: 2026-10-19
tags: ["forge", "javascript", "spidermonkey", "security"]
---

A couple of months ago I looked at libuv and Tokio and thought: I want to understand this deeply enough to build my own. So I did. Forge started as an event loop, a thread pool, a file system layer, and sockets, all written from scratch in C++, running Mozilla's SpiderMonkey engine instead of V8.

## What works today

- A native event loop built directly on Windows I/O completion ports
- A thread pool, so real file I/O runs off the main thread
- Timers and a microtask queue
- Seven `fs` methods, each in a blocking and a Promise-based version
- A built-in `forge --self-test` suite

Forge starts faster than both Node and Bun in my benchmarks, and it loses some too. Promise chains are the biggest gap. The full numbers are on the [home page](../../) and in the [benchmark report](https://github.com/varadTheDeveloper/forge-runtime/blob/main/Forge_Benchmark_Report.md).

## Where it's going

Any package you install today can read your files, steal your keys, and send them anywhere, and AI agents now install packages nobody has read. Forge is being built so that can't happen. With **Kavach**, every package will declare what it needs and run with only those permissions, on by default.

Next up: an ES module system, then web-standard APIs, and then Kavach itself.

I'll write here as I build. Follow along on [GitHub](https://github.com/varadTheDeveloper/forge-runtime) or [X](https://x.com/opentestudox).

— Varad

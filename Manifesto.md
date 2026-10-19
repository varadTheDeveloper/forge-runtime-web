# Manifesto

## Why Forge exists

Any package you install today can read your files, steal your keys, and send them anywhere. That has always been true in JavaScript. It mattered less when people read what they installed. Now AI agents install packages nobody has read, faster than anyone can check them.

Forge is being built so that can't happen. With **Kavach** (कवच, "armor"), every package will declare what it needs (which files, which hosts, which environment variables), and the runtime will enforce it, per package, on by default. A package that asks for nothing gets nothing. An update that asks for more has to ask you first.

## Why a new ecosystem

Node can't do this by default. Millions of npm packages assume they can touch anything, so turning on per-package limits would break the ecosystem overnight. Forge starts fresh instead.

Forge is not another Node, and it isn't Node-compatible. It has its own runtime, its own standard library, and its own package registry, where every package shows its permissions before you install it.

And it's for people who love JavaScript as it is. Plain JavaScript, no TypeScript by default.

## Why it's built from scratch

The industry keeps layering faster APIs and better tooling on top of the same shared foundation, but almost nobody questions whether the foundation itself is still the right choice.

Forge starts from a different question: what if the runtime were built from scratch for this era, instead of inherited from one?

That's why Forge runs on SpiderMonkey instead of V8, and why everything beneath it (memory management, containers, the event loop, the filesystem layer) is custom C++17 with zero external dependencies outside the engine itself. Not because existing tools are bad, but because inherited constraints become inherited ceilings. And a security model like Kavach has to be designed into the foundation. It can't be bolted on later.

## Why I'm building it this way

Forge is an open-source project, not a product. It belongs to the people who use it and build on it. The code is MIT-licensed, and the registry will be run for the community, never sold to it.

I'm building Forge to last. I want to be writing this code years from now, and to see it used by people I'll never meet.

A runtime and a registry that developers can trust cost real money to run: servers, security reviews, and one day more people. Forge will be supported the way open-source projects are, by sponsors, donations, and the organizations that depend on it. Every bit of it goes back into the project.

## What I'm afraid of

Not failing technically. I'm afraid of building something genuinely good and it just sitting there, unused, because it never reached the people who'd actually use it. The gap between "this works" and "this is adopted" is the part I have the least control over, and it's the part that matters most.

## What I'm working toward

One real company running Forge in production. Not a toy project, not a benchmark demo: an actual team choosing Forge to run something that matters to their business, at real load, with real users behind it. That's the moment I'd know this isn't just a fast runtime on paper. Everything else is downstream of that one thing happening.

## Is Forge sustainable?

If you're wondering whether Forge will still be around in a few years: it isn't backed by a funding runway with a clock on it, and it isn't a side project I'll abandon when it gets hard. I'm building this as a lifetime commitment. The code is MIT-licensed, so even in the worst case, nothing about Forge disappears. Anyone can fork it and keep building independently of me.

Is it proven at scale yet? No. It's early, and I'll say that plainly rather than oversell it. But the intent, the license, and the roadmap all point toward permanence, not abandonment.

## Where it's headed

Module system · Web-standard APIs · Networking + HTTP server · Kavach per-package permissions · The Forge package registry · Linux & macOS support.

---

*The Forge Project, started by [Varad Modhekar](https://github.com/varadTheDeveloper). MIT licensed.*

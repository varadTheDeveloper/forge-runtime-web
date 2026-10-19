# forge-runtime-web

The website and blog of [Forge](https://github.com/varadTheDeveloper/forge-runtime), a JavaScript runtime built from scratch on SpiderMonkey. JavaScript, armored.

**Live:** https://varadthedeveloper.github.io/forge-runtime-web/

The site is plain HTML in the style of the first website (1991): no stylesheet, no JavaScript. It is built with [Astro](https://astro.build) only so the pages, SEO tags, and agent files are generated from one source.

## Publishing a blog post

1. Copy `blog/_template.md` to `blog/your-post-title.md`. The file name becomes the URL: `/blog/your-post-title/`.
2. Fill in the frontmatter (`title`, `description`, `date`) and write the post in Markdown.
3. Push to `main`. GitHub Actions builds and deploys the site in about a minute.

Set `draft: true` to keep a post off the site. Files starting with `_` are never published.

## What gets generated

- Plain HTML pages: home, blog, each post, Manifesto, 404
- SEO: canonical URLs, Open Graph and Twitter cards, JSON-LD, `sitemap-index.xml`, `rss.xml`
- A social-preview image for every page (`og/*.png`)
- For AI agents: `llms.txt`, `llms-full.txt`, a Markdown version of every page (`index.md`, `blog/<post>.md`, …), and a `robots.txt` that welcomes AI crawlers

## Local development

```bash
npm ci --ignore-scripts
npm run dev       # http://localhost:4321/forge-runtime-web/
npm run build     # output in dist/
```

Home-page facts (progress, benchmarks, roadmap) live in `src/lib/content.js`, so the HTML page and its Markdown twin always agree.

## License

[MIT](LICENSE) © Varad Modhekar

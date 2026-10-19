import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts live in the `blog/` folder, so publishing a post is just:
//   add blog/my-post.md  ->  push to main  ->  the site rebuilds and deploys.
// Files starting with "_" (like _template.md) are ignored.
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './blog' }),
  schema: z.object({
    title: z.string().max(100),
    description: z.string().max(200),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Varad Modhekar'),
  }),
});

// The Manifesto page is rendered from Manifesto.md in this repo.
const pages = defineCollection({
  loader: glob({ pattern: 'Manifesto.md', base: '.' }),
});

export const collections = { blog, pages };

# ramawat.fyi

The source for [ramawat.fyi](https://ramawat.fyi), Udit Ramawat's personal
website and blog.

It is built with [Astro](https://astro.build), supports Markdown and MDX posts,
and is deployed on [Vercel](https://vercel.com).

## What is here

- A paginated blog with tag pages
- Project posts collected on a dedicated `/projects` page
- A professional and personal timeline
- Draft posts that stay out of the published site
- Light and dark themes
- Generated sitemap and Vercel Analytics

## Local development

The project uses Node.js 22 in CI.

```sh
npm install
npm run dev
```

The development server runs at [localhost:4321](http://localhost:4321).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Type-check and validate the Astro project |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Writing

Posts live in `src/content/blog` as Markdown or MDX files. Their frontmatter is
validated by the schema in `src/content.config.ts`.

A basic post looks like this:

```yaml
---
title: Post title
description: A short summary of the post.
pubDate: 2026-06-06
tags:
  - example
draft: true
---
```

Set `draft: true` to keep a post out of the published blog. Set
`isProject: true` and add the relevant project metadata to include a post on
the projects page.

## Project structure

```text
/
├── public/               # Static assets
├── src/
│   ├── components/       # Shared UI components
│   ├── content/blog/     # Markdown and MDX posts
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routes
│   └── styles/           # Global styles
├── astro.config.mjs
└── package.json
```

## Validation and deployment

Pull requests and pushes to `main` run Astro checks, a production build, and a
production dependency audit through GitHub Actions.

Vercel deploys the site from the `main` branch.

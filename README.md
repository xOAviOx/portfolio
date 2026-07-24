# Personal portfolio

A single-page portfolio built from scratch with the **Next.js App Router**,
**TypeScript**, and **Tailwind CSS v4**. Design system: _Nocturne_ — a cool
blue-black paper with one warm amber signal ("cold night, warm light"), with the
signature moment being the oversized Fraunces-italic banner quote.

No component library, no template. Every component here was written for this
project.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
npm run typecheck                # tsc --noEmit
```

## Editing content — start here

**All copy, links, and data live in one typed file: [`src/content/site.config.ts`](src/content/site.config.ts).**
Every section reads from it; no component hardcodes a string. To make the site
yours, edit that file — you never need to touch JSX. Placeholder values are
wrapped in `[square brackets]` so they're easy to find.

Sections self-hide when their data is empty (e.g. empty `sponsors.items`, or no
blog posts), so the page never shows an empty shell.

## Blog

Posts are MDX files in [`content/posts/`](content/posts). Frontmatter:

```mdx
---
title: "Post title"
description: "One-line summary for cards + social."
date: "2026-06-18"
tags: ["design"]
published: true
---

Your **MDX** content…
```

They appear in the home "Writing" section and at `/blog`, with detail pages at
`/blog/[slug]`. Set `published: false` to hide a draft. Delete all posts and the
Writing section disappears.

## GitHub contributions

The graph pulls the real contribution calendar from the GitHub GraphQL API,
cached (revalidated every 6h — configurable in `site.config.ts`). To enable it:

1. Set `github.username` in `src/content/site.config.ts`.
2. Add a token to `.env.local` (see [`.env.example`](.env.example)):
   ```
   GITHUB_TOKEN=ghp_...
   ```

Without a token (or on any API failure) it renders a **deterministic offline
sample**, clearly labelled — never random fake data.

## Images

Placeholder images in `public/` are generated on-brand so the site looks
complete before you add real assets. Replace `public/avatar.jpg`,
`public/hero-banner.jpg`, and `public/projects/*.jpg` with your own. To
regenerate the placeholders and their blur data:

```bash
node scripts/gen-placeholders.mjs
```

## Fonts

Self-hosted via `next/font` (no CDN request, no layout shift):

- **Fraunces** (display serif) — headings + the signature italic quotes.
- **Geist Sans** — body and UI.
- System monospace stack — small metadata labels.

## Theming

Dark/light with a pre-paint inline script (no flash). Tokens are CSS custom
properties in [`src/app/globals.css`](src/app/globals.css); `[data-theme]`
flips them and Tailwind utilities (`bg-background`, `text-ink`, `text-accent`…)
map onto them.

## Deploy

Static/RSC-friendly — deploy to **Vercel** with zero config. Set
`meta.url` in the config and add `GITHUB_TOKEN` in the Vercel project's
environment variables.

## Quality

- Responsive from 320px, `prefers-reduced-motion` respected, visible keyboard
  focus, semantic landmarks, real alt text.
- Full metadata: OG tags, dynamic `opengraph-image`, sitemap, robots.
- Lighthouse (local `next start`, mobile-throttled): **Performance 94,
  Accessibility 100, Best Practices 100, SEO 100**. Performance is higher on
  Vercel, where HTTP/2 + Brotli + edge-cached images remove the connection
  overhead the local HTTP/1.1 server is penalised for.

## Dev tooling

`scripts/shoot.mjs` (CDP full-page screenshots at emulated viewports) and
`scripts/measure-overflow.mjs` (horizontal-overflow finder) were used during
development. They need a Chrome running with `--remote-debugging-port=9222`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog for René Dohmen (renedohmen.nl), migrated from Gatsby/MDX to Astro. ~168 Markdown posts spanning code, Linux, music, motorcycles, and life. Static site, deployed to GitHub Pages.

## Commands

```bash
npm install          # install deps (CI uses `npm ci --legacy-peer-deps`)
npm run dev          # dev server at localhost:4321
npm run build        # `astro check` (type/content validation) + `astro build` → dist/
npm run preview      # serve the production build locally
```

There is no test suite or linter. `astro check` (run as part of `build`) is the validation gate — it type-checks `.astro` files and validates post frontmatter against the content collection schema. Run `npm run build` before committing to catch broken frontmatter.

## Architecture

Astro static site (`output: 'static'`), Tailwind CSS (base styles disabled — global styles live in `src/styles/global.css`), TypeScript strict mode with `@/*` → `src/*` path alias.

**Content collection is the data model.** All posts are Markdown files in `src/content/blog/`. The schema in `src/content/config.ts` (Zod) defines required frontmatter: `title`, `date`, `category`, `tags[]`, plus optional `thumbnail` and defaulted `author`/`status`. Adding a post = dropping a `.md` file here with valid frontmatter; build fails if it doesn't match the schema.

**Routing — the filename slug IS the URL.** `src/pages/[slug].astro` generates one page per published post at the site root (e.g. `working-with-git-submodules.md` → `/working-with-git-submodules/`). This is deliberate: original URLs from the old Gatsby site are preserved for SEO. Don't rename existing post files. `getStaticPaths` everywhere filters on `data.status === 'published'`.

Pages: `index.astro` (homepage: hero + recent posts), `blog/index.astro` (all posts), `category/[category].astro` (slugified category, e.g. category "Computerz" → `/category/computerz/`), `about.astro`.

Layouts: `BaseLayout.astro` (shell/nav/footer) → `BlogPost.astro` (post chrome: hero image, meta, reading time computed from rendered slot, tags). Components: `PostCard.astro`, `Icon.astro`.

**Base path handling.** Always build internal links with `import.meta.env.BASE_URL` (the layouts assign it to `base`) rather than hardcoding `/`. Thumbnails may be external URLs (Unsplash fallbacks) or local `/images/...` paths — see the `startsWith("http")` branching in `BlogPost.astro` before changing image rendering.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages. Custom domain is `renedohmen.nl` (set via `public/CNAME` and `site` in `astro.config.mjs`). `base` is `/` (apex domain), so the BASE_URL plumbing is currently a no-op but keep using it.

## convert-posts.js

One-time migration script (MDX → Markdown) referencing hardcoded `/tmp/blog-rene-dohmen/...` source paths that no longer exist. It is historical/reference only — generated the current posts, tags, and thumbnail fallbacks. Not part of the build; don't run it.

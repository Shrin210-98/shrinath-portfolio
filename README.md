# shrinath-portfolio

One-page developer portfolio for **Shrinath Poojary**, live at **https://shrinath.pages.dev**.

It's a static site: Vite builds it, it's prerendered to HTML at build time and hydrated by React,
and Cloudflare Pages hosts it. Monospace throughout (JetBrains Mono), warm stone greys with an amber accent,
light/dark themes.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`: CSS-first config in [`src/index.css`](src/index.css), no `tailwind.config.js`
- [shadcn/ui](https://ui.shadcn.com) (Radix): only Button, Badge, Card, Separator, Tooltip, in `src/components/ui`
- [motion](https://motion.dev): fade/slide-in on scroll (off when the visitor prefers reduced motion)
- [lucide-react](https://lucide.dev) icons. Lucide v1 has no brand icons, so the GitHub/LinkedIn marks are inline SVGs from Simple Icons (CC0) in `src/components/brand-icons.tsx`.
- `@fontsource-variable/jetbrains-mono`: self-hosted font, no Google Fonts

## Local development

Requires Node 20.19+ or 22.12+ (Node 22/24 recommended).

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # type-check → client build → prerender → checks; output in dist/
npm run preview   # serves dist/ with the same security headers (incl. CSP) as Cloudflare
```

## Editing content

**All content lives in [`src/data/resume.ts`](src/data/resume.ts).** It holds the profile, summary, skills,
experience (with client projects), projects, writing, education and contact line, all typed with
exported TypeScript interfaces. Components only render that data, so you shouldn't need to touch them
to update the site. `/llms.txt` is generated from the same file at build time.

Search the file for `TODO` to find what's still missing.

Other things you may want to change:

| What | Where |
| --- | --- |
| Résumé PDF | add `public/Shrinath_Poojary_Resume.pdf` (the build warns until it exists) |
| Colours / theme tokens | `:root` and `.dark` in `src/index.css` |
| Page title, description, Open Graph tags | `index.html` |
| Favicon | `public/favicon.svg` |
| Social preview image | `public/og-image.png`, generated from `scripts/og-image.html` (command inside that file) |
| Security headers / caching | `public/_headers` |

### Theme and CSP

The theme follows `prefers-color-scheme` until the visitor uses the header toggle. Their choice is
saved in `localStorage`. A tiny inline script in `index.html` sets `class="dark"` on `<html>` before
first paint, so the wrong theme never flashes.

The Content-Security-Policy in `public/_headers` allows that one inline script by its SHA-256 hash.
**If you edit the script, `npm run build` fails and prints the new hash** to paste into `_headers`.
The build also fails if the prerendered HTML contains inline `style=""` attributes, because the CSP
(`style-src 'self'`) would block them.

## Project layout

```
index.html                  meta/SEO tags + inline theme script
public/                     favicon, og-image, _headers, robots.txt, sitemap.xml
scripts/
  prerender.mjs             injects server-rendered HTML into dist/index.html
  verify-build.mjs          CSP hash / inline-style checks, résumé warning
  og-image.html             source for public/og-image.png
src/
  data/resume.ts            ← all content
  components/sections/      Hero, About, Skills, Experience, Projects, Writing, Contact
  components/ui/            shadcn/ui components
  hooks/                    theme + active-section hooks
  entry-server.tsx          build-time prerender entry
  main.tsx                  client entry (hydrates the prerendered HTML)
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub as `shrinath-portfolio`.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Set up the build:
   - **Project name:** `shrinath` (this gives you `shrinath.pages.dev`)
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Optionally, set the environment variable `NODE_VERSION` = `22` (or newer)
4. **Save and Deploy.** Every push to `main` then deploys to production, and other branches get preview URLs.

Cloudflare Pages picks up `public/_headers` automatically (it ends up in `dist/`). If you later add a
custom domain, update the canonical URL, `og:url`/`og:image`, `robots.txt` and `sitemap.xml`.

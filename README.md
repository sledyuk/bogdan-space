# bogdan.space

Personal site for Bogdan Egikov, product engineer. A single-page Astro site about delivery:
how a product goes from an idea to a live release, shown through two own products
(DaySync, Kachkachi) and one freelance product (AI Whisper).

## Commands

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the production build locally      |
| `npx astro check` | Type-check components and data            |

## Content

All copy lives in `src/data/site.ts`: the hero and its spec card, the six delivery steps
and results, the three product sections, the experience list and the contact block.
Components in `src/components/` only lay that data out. The résumé PDF is
`public/assets/Bogdan_Egikov_Resume.pdf`.

Product screenshots, app icons and the Kachkachi mascot are in `public/assets/work/`.
AI Whisper is client work, so its section shows no screenshots, only the logo Bogdan drew.

## Design

- Tokens, components and section styles: `src/styles/global.css` (light and dark via
  `prefers-color-scheme`).
- Type: Geist Sans and Geist Mono, self-hosted through `@fontsource`.
- Each product section uses that product's own brand colours.
- Navigation is a floating dock at the bottom of the screen (`Dock.astro`).
- Small scripts in `src/scripts/`: Tbilisi clock, copy email, dock menu and scroll spy,
  experience filter.

## Deploy (Vercel)

The site is fully static. The GitHub repo is connected to Vercel, so a push to `main`
deploys production.

Custom domain: Project → Settings → Domains → add `bogdan.space`, then point DNS —
apex `A 76.76.21.21` and `www` `CNAME cname.vercel-dns.com` (or switch the domain to
Vercel nameservers).

The OG share card (`/og.png`), sitemap, and robots.txt are served from the site root.

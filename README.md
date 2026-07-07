# bogdan.space

Personal portfolio/resume site for Bogdan Egikov — Senior Software Engineer & Tech Lead.
Single-page Astro site: light editorial design, dot-field + rings background with scroll
parallax, Selected Work cards, and a "How I Build" agentic-workflow section.

## Commands

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the production build locally      |
| `npx astro check` | Type-check components and data            |

## Content

All copy lives in `src/data/site.ts` — edit facts, projects, experience, and stack there
without touching markup. The résumé PDF is `public/assets/Bogdan_Egikov_Resume.pdf`.

The DaySync flagship card shows `public/assets/work/daysync-web.webp` and
`daysync-mobile.webp` (sourced from daysync.io) in CSS device frames; if either file
is missing the card falls back to a stylized SVG cover at build time.

Brand assets (avatar for Vercel/GitHub/etc.) live in `brand/`.

## Deploy (Vercel)

The site is fully static — zero-config on Vercel:

1. Push to GitHub and import the repo at vercel.com/new (framework preset: Astro), or run
   `npx vercel --prod`.
2. Custom domain: Project → Settings → Domains → add `bogdan.space`, then point DNS —
   apex `A 76.76.21.21` and `www` `CNAME cname.vercel-dns.com` (or switch the domain to
   Vercel nameservers).

The OG share card (`/og.png`), sitemap, and robots.txt are served from the site root.

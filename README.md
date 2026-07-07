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

To swap the DaySync cover for real screenshots, drop `daysync-web.png` and
`daysync-mobile.png` into `public/assets/work/` — the flagship card picks them up
automatically at build time (falls back to the stylized cover if absent).

## Deploy (Vercel)

The site is fully static — zero-config on Vercel:

1. Push to GitHub and import the repo at vercel.com/new (framework preset: Astro), or run
   `npx vercel --prod`.
2. Custom domain: Project → Settings → Domains → add `bogdan.space`, then point DNS —
   apex `A 76.76.21.21` and `www` `CNAME cname.vercel-dns.com` (or switch the domain to
   Vercel nameservers).

The OG share card (`/og.png`), sitemap, and robots.txt are served from the site root.

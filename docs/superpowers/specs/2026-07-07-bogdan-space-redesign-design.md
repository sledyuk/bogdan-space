# bogdan.space — Portfolio/Resume Site Redesign

**Date:** 2026-07-07
**Status:** Approved

## Goal

A single-page portfolio at `bogdan.space` positioning Bogdan Egikov as a senior
engineer / tech lead who ships web + mobile products and builds AI-natively
(agentic workflows). Light, editorial, fast (Lighthouse ≥ 95 in performance,
accessibility, and SEO), with restrained micro-animations and a drawn
dot-field + rings background decoration.

The existing mock (`bogdan_space_redesign.zip` → single `index.html`) is the
visual foundation: keep its palette, type, and layout language; extend it with
a work showcase and an agentic-workflow section.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Scope | Single page, rich work cards (no subpages) |
| Hosting | Vercel, auto-deploy from GitHub `main`, domain `bogdan.space` |
| Framework | Astro, fully static output, no client framework |
| Styling | Hand-written CSS carried from the mock (no Tailwind) |
| Fonts | Geist + Geist Mono, self-hosted (no Google Fonts CDN) |
| Background decoration | Dot field + geometric rings with gentle parallax |
| Work visuals | Real screenshots for DaySync (device frames); stylized SVG covers for NDA/legacy projects |
| Agentic story | Dedicated "How I Build" section + per-project mentions where natural |

## Visual system

- Palette: paper `#F6F6F4`, ink `#141416`, ink-2 `#55565C`, ink-3 `#8B8C93`,
  accent `#2B3CF0`, hairlines `rgba(20,20,22,.10/.18)`.
- Type: Geist (400–700) for text, Geist Mono (400–500) for labels/tags.
  Mono uppercase `.tag` labels for section numbering ("01 — Who" …).
- Layout: `max-width: 1020px`, hairline-separated editorial sections.
- Selection color, focus-visible outlines, and print stylesheet as in the mock.

## Page structure (top → bottom)

1. **Top bar** (sticky, blurred): wordmark, anchor nav (About / Work /
   Experience / Contact), Résumé download pill CTA.
2. **Hero**: status pill (pulsing dot, "Open to Senior / Lead roles · Remote
   UTC+4"), H1 name, role paragraph, contact chips (copy-email with confirm
   animation, LinkedIn, Résumé PDF), portrait (grayscale → color on hover).
3. **Facts strip**: 12+ years / 400K+ users / ~40% throughput lift / 7
   engineers led. Numbers **count up** on first scroll into view.
4. **About**: two-column — narrative (physics origin, fintech/healthcare/Web3,
   AI-native focus, DaySync) + meta list (location with live clock, languages,
   education, domains).
5. **Selected Work** (new): project cards.
   - **DaySync** — flagship, full-width card. Real screenshots (mobile app in a
     CSS-drawn phone frame, web dashboard in a browser frame). Role:
     founder/solo engineer. Outcome: live with paying customers in 4 countries.
     Stack tags: React Native, Next.js, NestJS, PostgreSQL, Cloudflare. Link
     → daysync.io. Notes fully agentic build workflow.
   - **KViTKA (Global Ukraine)** — stylized SVG cover. CTO / lead. Zero to
     production in ~3 months; EUR vIBANs, multi-asset wallets, VISA virtual card.
   - **Phreesia Provider Connect (Lineate)** — stylized cover. Team lead of 7.
     Healthcare data platform; agentic workflows raised throughput ~40%.
   - **Trastra (Codemotion)** — stylized cover. Frontend lead. Crypto-banking
     web + mobile, 400K+ users, full KYC.
   - **Velas Account** — stylized cover. Mobile developer. Passwordless Web3
     access, QR dApp connect/sign.
   - Stylized covers share a visual language: dot-field texture + per-project
     accent motif drawn in SVG (no fake UI).
   - Card anatomy: cover, name, role, one-line outcome with a concrete metric,
     mono stack tags, live link where one exists. Hover: card lift + subtle
     cover zoom.
6. **How I Build** (new): short narrative on AI-native engineering + a
   horizontal pipeline visual in the site's line-art style —
   spec → Claude Code agents → MCP integrations → AI-assisted review & tests →
   ship — nodes reveal in sequence on scroll; anchored by the ~40% metric.
7. **Experience**: 6 hairline rows (Lineate/Phreesia, Global Ukraine/KViTKA,
   DaySync, Velas, Codemotion, Apex) with hover left-bar + arrow slide.
8. **Stack**: key/value rows (AI-Native, Core, Data & Infra, Payments, Practice).
9. **Contact**: lead line, big mailto with underline sweep, LinkedIn / résumé
   alt links.
10. **Footer**: © year, live Tbilisi clock (`Intl.DateTimeFormat`, 30 s tick).

## Background decoration (dot field + rings)

- Fixed full-viewport layer behind content (`z-index` below main, pointer-events
  none).
- Fine dot matrix (`radial-gradient` dots, ~20 px pitch, ≤ 14% ink opacity)
  masked with radial gradients so it fades toward edges and varies by section.
- 2–3 large outlined circles (1 px stroke, accent ≤ 22% / ink ≤ 10% opacity)
  positioned near the hero and section boundaries.
- Rings **parallax** at ~0.15× scroll speed — transform-only, driven by a
  passive scroll listener + `requestAnimationFrame`.
- Under `prefers-reduced-motion`: dots and rings stay, all motion stops.
- Decoration never reduces text contrast below WCAG AA.

## Micro-animation catalogue

Kept from mock: hero load stagger (`rise d1–d4`), scroll reveal
(IntersectionObserver), pulsing status dot, copy-email "Copied ✓" overlay,
underline slide links, experience-row hover bar + arrow, portrait
grayscale→color, chip hover lift.

New: facts count-up (once, on reveal), ring parallax, work-card hover lift +
cover zoom, pipeline sequential reveal.

Global rules: everything transform/opacity-based; single shared easing
`cubic-bezier(.22,.68,.34,1)`; all motion gated behind
`prefers-reduced-motion: reduce`; print stylesheet strips motion and chrome.

## Architecture

```
/
├── astro.config.mjs          # static output; Vercel is zero-config
├── public/
│   ├── og.png                # 1200×630 share card (from zip)
│   ├── favicon.svg           # BE monogram
│   ├── fonts/                # Geist + Geist Mono woff2, self-hosted
│   └── assets/
│       ├── Bogdan_Egikov_Resume.pdf
│       ├── portrait.webp     # copied locally (no hotlinking daysync.io)
│       └── work/             # DaySync screenshots (provided by Bogdan)
└── src/
    ├── pages/index.astro     # assembles sections, head/SEO
    ├── layouts/Base.astro    # <head>: meta, OG, JSON-LD Person, fonts
    ├── components/           # TopBar, Hero, Facts, About, Work, WorkCard,
    │                         # HowIBuild, Experience, Stack, Contact,
    │                         # Footer, BgDecor
    ├── data/site.ts          # all copy/content as typed data (single source)
    ├── styles/global.css     # tokens + base carried from mock
    └── scripts/              # clock, copy-email, reveal, countup, parallax
```

- All copy lives in `src/data/site.ts` so content edits never touch markup.
- Each component owns its scoped styles; shared tokens in `global.css`.
- Client JS: a handful of small vanilla scripts, no framework hydration.

## SEO & metadata

Carried from mock: title, description, canonical `https://bogdan.space`,
full OG + Twitter card set, theme-color, BE-monogram favicon.
Added: JSON-LD `Person` (name, jobTitle, sameAs LinkedIn, url), sitemap +
robots (Astro integrations or static files).

## Error handling / resilience

- No-JS: content fully visible (reveal classes gated behind a `js` class on
  `<html>`); clock shows static "UTC+4"; copy-email falls back to `mailto:`.
- Clipboard API failure → textarea/execCommand fallback (as in mock).
- Missing DaySync screenshots at build time → cards fall back to stylized
  covers so the build never blocks on assets.

## Deployment

- GitHub repo (`bogdan-space`) → Vercel project, production branch `main`.
- Astro static preset — no server functions, no `vercel.json` unless needed.
- Custom domain `bogdan.space` attached in Vercel; DNS pointed per Vercel
  instructions (user action).
- OG image and PDF served from site root as the mock's meta URLs expect.

## Testing & acceptance

- `astro build` succeeds with zero warnings that matter.
- `astro check` passes (TS in data/components).
- Internal anchors and external links validated.
- Lighthouse (mobile): Performance / Accessibility / SEO ≥ 95.
- Manual checks: 360 px, 768 px, 1280 px breakpoints; `prefers-reduced-motion`;
  print preview; OG card rendering (opengraph.xyz or similar).

## Out of scope

Dark mode, blog, case-study subpages, CMS, analytics (an Umami slot comment is
kept in the head for later), contact forms.

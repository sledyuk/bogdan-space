# bogdan.space Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page Astro portfolio at bogdan.space — light editorial design, dot-field + rings background, Selected Work cards, "How I Build" agentic section — deployed to Vercel.

**Architecture:** Fully static Astro site. All copy in `src/data/site.ts`; one component per section with scoped styles; shared tokens in `src/styles/global.css`; small vanilla-JS scripts (clock, copy-email, reveal, count-up, parallax) bundled by Astro. No client framework.

**Tech Stack:** Astro 5, TypeScript (data only), vanilla CSS/JS, @fontsource Geist fonts, Vercel static hosting.

## Global Constraints

- Palette: paper `#F6F6F4`, ink `#141416`, ink-2 `#55565C`, ink-3 `#8B8C93`, accent `#2B3CF0`, lines `rgba(20,20,22,.10)` / `rgba(20,20,22,.18)`.
- Easing everywhere: `cubic-bezier(.22,.68,.34,1)`.
- Max content width `1020px`, side padding `clamp(20px, 4vw, 40px)`.
- All motion transform/opacity-based and gated behind `prefers-reduced-motion: reduce`.
- Content fully visible without JS (`.js` class gating, as in the mock).
- Canonical URL `https://bogdan.space`; email `sledyuk@gmail.com`; LinkedIn `https://www.linkedin.com/in/bogdan-egikov/`.
- Source mock lives at `/private/tmp/claude-501/-Users-sledyuk-Documents-bogdan-space/643fb4a7-cedc-4950-807d-557c528ae9eb/scratchpad/mocks/` (index.html, og.png, assets/Bogdan_Egikov_Resume.pdf).
- Verification for every task: `npm run build` succeeds, then `grep` assertions against `dist/index.html`.

---

### Task 1: Scaffold Astro project, assets, global styles, Base layout

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (via `npm create astro`)
- Create: `src/styles/global.css`, `src/layouts/Base.astro`, `src/pages/index.astro`
- Create: `public/og.png`, `public/favicon.svg`, `public/assets/Bogdan_Egikov_Resume.pdf`, `public/assets/portrait.webp`, `public/robots.txt`

**Interfaces:**
- Produces: `Base.astro` layout with a default `<slot />`, full `<head>` (SEO/OG/JSON-LD), global CSS import, `.js` class bootstrap. All later components rely on tokens in `global.css` (`--paper --ink --ink-2 --ink-3 --line --line-2 --accent --sans --mono --max --pad --ease`), utility classes `.wrap`, `.tag`, `.u-link`, `.reveal`, `.rise`.

- [ ] **Step 1: Scaffold the project**

```bash
cd /Users/sledyuk/Documents/bogdan-space
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --yes
npm install
npm install @fontsource/geist-sans @fontsource/geist-mono
```

If the `@fontsource/geist-sans`/`geist-mono` packages don't resolve, use `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` instead and adjust the import names in Step 4 accordingly (font-family becomes `'Geist Variable'` / `'Geist Mono Variable'`).

- [ ] **Step 2: Copy static assets**

```bash
MOCKS='/private/tmp/claude-501/-Users-sledyuk-Documents-bogdan-space/643fb4a7-cedc-4950-807d-557c528ae9eb/scratchpad/mocks'
cp "$MOCKS/og.png" public/og.png
mkdir -p public/assets
cp "$MOCKS/assets/Bogdan_Egikov_Resume.pdf" public/assets/Bogdan_Egikov_Resume.pdf
curl -fsSL https://daysync.io/assets/founder-clean.webp -o public/assets/portrait.webp
```

If the curl fails (image moved), continue — Hero (Task 3) must tolerate a missing portrait file; note it for the user.

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#141416"/><text x="32" y="43" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">BE</text></svg>
```

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://bogdan.space/sitemap-index.xml
```

- [ ] **Step 3: Configure Astro**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bogdan.space',
  integrations: [sitemap()],
});
```

```bash
npx astro add sitemap --yes
```

(If `astro add` already wrote the config, just ensure `site` is set.)

- [ ] **Step 4: Write `src/styles/global.css`**

Carry the mock's base verbatim (tokens, reset, utilities, motion, print). Content — copy the `:root` block, reset, `.skip`, `.wrap`, `.tag`, `.u-link`, motion (`pulse`, `.reveal`, `.rise`, reduced-motion) and print blocks from the mock's `<style>` (mock lines 47–228), **minus** section-specific styles (top/hero/facts/about/xp/stack/contact/footer — those move into components). Keep `--sans:'Geist Sans', ...; --mono:'Geist Mono', ...` matching the fontsource family names.

- [ ] **Step 5: Write `src/layouts/Base.astro`**

```astro
---
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
import '../styles/global.css';

const title = 'Bogdan Egikov — Senior Software Engineer & Tech Lead';
const description =
  'Senior Software Engineer and Tech Lead — 12+ years designing and shipping mobile and web products across fintech and healthcare. AI-native, agentic development. Based in Tbilisi, Georgia (remote, UTC+4).';
const url = 'https://bogdan.space';
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bogdan Egikov',
  jobTitle: 'Senior Software Engineer & Tech Lead',
  email: 'mailto:sledyuk@gmail.com',
  url,
  address: { '@type': 'PostalAddress', addressLocality: 'Tbilisi', addressCountry: 'GE' },
  sameAs: ['https://www.linkedin.com/in/bogdan-egikov/', 'https://daysync.io'],
});
---

<!doctype html>
<html lang="en">
  <head>
    <script is:inline>document.documentElement.classList.add('js');</script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Bogdan Egikov" />
    <meta name="theme-color" content="#141416" />
    <link rel="canonical" href={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Bogdan Egikov" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content="12+ years designing and shipping mobile & web products across fintech and healthcare. AI-native, agentic development." />
    <meta property="og:image" content={`${url}/og.png`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content="12+ years designing and shipping mobile & web products across fintech and healthcare. AI-native, agentic development." />
    <meta name="twitter:image" content={`${url}/og.png`} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <script type="application/ld+json" set:html={jsonLd} />
    <!-- UMAMI ANALYTICS SCRIPT GOES HERE -->
  </head>
  <body>
    <a class="skip" href="#about">Skip to content</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 6: Stub `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
---

<Base>
  <main class="wrap">
    <h1>Bogdan Egikov</h1>
  </main>
</Base>
```

- [ ] **Step 7: Verify build**

```bash
npm run build
grep -c 'application/ld+json' dist/index.html   # expect: 1
grep -c 'og:image' dist/index.html               # expect: >= 1
ls dist/og.png dist/assets/Bogdan_Egikov_Resume.pdf dist/favicon.svg
```

Expected: build succeeds, greps match, files exist.

- [ ] **Step 8: Commit**

```bash
printf 'node_modules/\ndist/\n.astro/\n' >> .gitignore
git add -A && git commit -m "feat: scaffold Astro site with base layout, SEO head, assets"
```

---

### Task 2: Content data module

**Files:**
- Create: `src/data/site.ts`

**Interfaces:**
- Produces (consumed by every section component):
  - `site` object: `{ name, email, linkedin, resumePath, location, timezoneLabel }`
  - `facts: { value: number; suffix: string; label: string }[]`
  - `aboutParagraphs: string[]` (HTML strings), `aboutMeta: { k: string; v: string }[]`
  - `projects: Project[]` where `Project = { slug: string; name: string; role: string; outcome: string; stack: string[]; link?: string; flagship?: boolean; agentic?: boolean }`
  - `pipeline: { title: string; desc: string }[]`
  - `experience: { years: string; org: string; role: string; summary: string }[]`
  - `stackRows: { k: string; v: string[] }[]`

- [ ] **Step 1: Write `src/data/site.ts`**

```ts
export const site = {
  name: 'Bogdan Egikov',
  email: 'sledyuk@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bogdan-egikov/',
  resumePath: '/assets/Bogdan_Egikov_Resume.pdf',
  location: 'Tbilisi, Georgia',
  timezoneLabel: 'UTC+4',
};

export type Fact = { value: number; prefix?: string; suffix: string; label: string };
export const facts: Fact[] = [
  { value: 12, suffix: '+', label: 'Years shipping production software' },
  { value: 400, suffix: 'K+', label: "Users on platforms I've built" },
  { value: 40, prefix: '~', suffix: '%', label: 'Team throughput lift from agentic AI workflows' },
  { value: 7, suffix: '', label: 'Engineers led as player-coach' },
];

export const aboutParagraphs: string[] = [
  'I started in physics, not computer science — and it shows in how I work. I look for the underlying pattern before I write the first line of code, then build systems that hold up once real users, real money, or real patients are on the other end.',
  'Over twelve years I\'ve architected and led delivery across fintech, healthcare, and Web3 — usually as the first engineer, sometimes as CTO, always accountable for what ships. Lately my focus is AI-native engineering: agentic coding workflows built on Claude Code and MCP that measurably raise how fast a team delivers. On the side I run <a href="https://daysync.io" target="_blank" rel="noopener">DaySync</a>, a booking SaaS I built solo, live with paying customers in four countries.',
];

export const aboutMeta = [
  { k: 'Based in', v: 'Tbilisi, Georgia — UTC+4' },
  { k: 'Speaks', v: 'English, Ukrainian, Russian, Georgian' },
  { k: 'Studied', v: 'Physics — Tbilisi State University' },
  { k: 'Domains', v: 'FinTech · Healthcare · Web3 · SaaS' },
];

export type Project = {
  slug: string; name: string; role: string; outcome: string;
  stack: string[]; link?: string; flagship?: boolean; agentic?: boolean;
};
export const projects: Project[] = [
  {
    slug: 'daysync', name: 'DaySync', role: 'Founder · solo engineer', flagship: true, agentic: true,
    outcome: 'Booking & business-management SaaS for salons — iOS, Android, and web, designed, built, and operated solo. Live with paying customers in 4 countries, developed with a fully agentic Claude Code workflow across all three repos.',
    stack: ['React Native', 'Next.js', 'NestJS', 'PostgreSQL', 'Cloudflare'],
    link: 'https://daysync.io',
  },
  {
    slug: 'kvitka', name: 'KViTKA', role: 'CTO · lead full-stack',
    outcome: 'Fintech for the Ukrainian diaspora — EUR vIBANs, multi-asset wallets, a VISA virtual card. Zero to first production release in ~3 months, owning architecture, app, and backend.',
    stack: ['React Native', 'MobX', 'NestJS', 'BaaS/KYC'],
  },
  {
    slug: 'phreesia', name: 'Phreesia Provider Connect', role: 'Team lead of 7', agentic: true,
    outcome: 'Healthcare data platform for provider engagement at one of the largest US healthcare companies. Rolled out agentic AI workflows that raised team delivery throughput ~40%.',
    stack: ['TypeScript', 'AWS', 'Airflow', 'Athena'],
  },
  {
    slug: 'trastra', name: 'Trastra', role: 'Frontend lead',
    outcome: 'Crypto-banking platform across web and mobile serving 400K+ users — OTP auth, full KYC flow, banking and crypto API integrations, real-time transaction alerts.',
    stack: ['React', 'React Native', 'MobX', 'Material UI'],
  },
  {
    slug: 'velas', name: 'Velas Account', role: 'Mobile developer',
    outcome: 'One-click, passwordless access to Web3 apps — secure cryptographic key management and QR-based dApp connect/sign flows.',
    stack: ['React Native', 'Web3', 'Cryptography'],
  },
];

export const pipeline = [
  { title: 'Spec', desc: 'Requirements distilled into a design doc before any code' },
  { title: 'Claude Code agents', desc: 'Agentic implementation across mobile, web, and backend repos' },
  { title: 'MCP integrations', desc: 'Custom servers wire agents into the team\'s real tooling' },
  { title: 'AI-assisted review & tests', desc: 'Automated review passes and test generation on every change' },
  { title: 'Ship', desc: '~40% faster team delivery, tracked via sprint velocity' },
];

export const experience = [
  { years: '2025 — 2026', org: 'Lineate · Phreesia', role: 'Senior Engineer / Team Lead', summary: 'Led a cross-functional team of 7 delivering a healthcare data platform for one of the largest US healthcare companies; rolled out agentic AI workflows that raised delivery throughput ~40%.' },
  { years: '2023 — 2025', org: 'Global Ukraine · KViTKA', role: 'CTO / Lead Full-Stack', summary: 'Took a diaspora-banking fintech from a blank repo to production in ~3 months — EUR vIBANs, multi-asset wallets, a VISA virtual card — owning architecture, app, and backend end to end.' },
  { years: '2023 — now', org: 'DaySync', role: 'Independent product', summary: 'Booking & business-management SaaS for salons — iOS, Android, and web, designed, built, and operated solo; live with paying customers in four countries.' },
  { years: '2021 — 2023', org: 'Velas', role: 'Mobile Developer', summary: 'Built Velas Account — one-click, passwordless access to Web3 apps with secure cryptographic key management and QR-based dApp connect/sign flows.' },
  { years: '2017 — 2021', org: 'Codemotion · Trastra & Famepick', role: 'Frontend Lead', summary: 'Delivered the Trastra crypto-banking platform (web + mobile, 400K+ users, full KYC) and led front-end for Famepick, a creator–brand SaaS with Auth0, ElasticSearch, Chargebee, and SendBird.' },
  { years: '2013 — 2017', org: 'Apex LTD', role: 'Full-Stack Developer', summary: 'Led the front-end of a cloud ERP unifying accounting, inventory, banking, and CRM; drove the migration from a .NET stack to a modern JavaScript frontend.' },
];

export const stackRows = [
  { k: 'AI-Native', v: ['Claude Code', 'MCP', 'agentic pipelines', 'AI-assisted review & testing'] },
  { k: 'Core', v: ['TypeScript', 'React', 'React Native', 'Next.js', 'NestJS', 'Node.js'] },
  { k: 'Data & Infra', v: ['PostgreSQL', 'AWS (ETL, Airflow, Athena)', 'Cloudflare', 'Docker', 'CI/CD'] },
  { k: 'Payments', v: ['Stripe', 'Paddle', 'in-app purchases', 'Adapty'] },
  { k: 'Practice', v: ['System design', 'technical leadership', 'mentoring', 'Agile/Scrum', 'code review'] },
];
```

- [ ] **Step 2: Verify types & build**

```bash
npx astro check
npm run build
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts && git commit -m "feat: add typed content data module"
```

---

### Task 3: TopBar, Hero, Footer + clock & copy-email scripts

**Files:**
- Create: `src/components/TopBar.astro`, `src/components/Hero.astro`, `src/components/Footer.astro`
- Create: `src/scripts/clock.ts`, `src/scripts/copy-email.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` from `src/data/site.ts`; tokens/utilities from `global.css`.
- Produces: page skeleton `TopBar → <main> … </main> → Footer`; elements with ids `#clock`, `#clockInline`, `#year`, `#copyEmail` used by scripts; nav anchors `#about #work #experience #contact`.

- [ ] **Step 1: Write components**

Port markup + section CSS from the mock into scoped component styles:

- `TopBar.astro` — mock lines 92–103 (CSS) and 237–247 (HTML). Nav links: About `#about`, Work `#work`, Experience `#experience`, Contact `#contact`, Résumé CTA → `site.resumePath` with `download`.
- `Hero.astro` — mock lines 105–127 and 251–271. Import `site`; email chip text and aria-label from `site.email`. Portrait `<img src="/assets/portrait.webp" …>` — wrap in a conditional: if the file was not fetched in Task 1, omit the portrait column (check at build time with `fs.existsSync('public/assets/portrait.webp')` in frontmatter).
- `Footer.astro` — mock lines 198–201 and 369–374.

- [ ] **Step 2: Write scripts**

`src/scripts/clock.ts`:

```ts
const el = document.getElementById('clock');
const inline = document.getElementById('clockInline');
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tbilisi' });
function tick() {
  const t = fmt.format(new Date());
  if (el) el.textContent = t;
  if (inline) inline.textContent = `${t} UTC+4`;
}
tick();
setInterval(tick, 30_000);
```

`src/scripts/copy-email.ts` — port mock lines 394–408 (clipboard with textarea fallback, `copied` class toggle, 1600 ms).

Load both from `index.astro` with `<script>` tags (Astro bundles them):

```astro
<script>
  import '../scripts/clock';
  import '../scripts/copy-email';
</script>
```

- [ ] **Step 3: Assemble `index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import TopBar from '../components/TopBar.astro';
import Hero from '../components/Hero.astro';
import Footer from '../components/Footer.astro';
---

<Base>
  <TopBar />
  <main>
    <Hero />
  </main>
  <Footer />
  <script>
    import '../scripts/clock';
    import '../scripts/copy-email';
  </script>
</Base>
```

- [ ] **Step 4: Verify**

```bash
npm run build
grep -c 'copyEmail' dist/index.html        # expect >= 1
grep -c 'id="clock"' dist/index.html       # expect 1
npm run preview &   # visual smoke check if a browser tool is available, then kill
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: top bar, hero, footer with clock and copy-email"
```

---

### Task 4: Background decoration (dot field + rings) with parallax

**Files:**
- Create: `src/components/BgDecor.astro`, `src/scripts/parallax.ts`
- Modify: `src/pages/index.astro` (mount BgDecor as first child of `<Base>`)

**Interfaces:**
- Produces: fixed decoration layer; rings carry `data-parallax="<factor>"` attributes consumed by `parallax.ts`.

- [ ] **Step 1: Write `BgDecor.astro`**

```astro
<div class="bg-decor" aria-hidden="true">
  <div class="dots"></div>
  <div class="ring r1" data-parallax="0.15"></div>
  <div class="ring r2" data-parallax="0.10"></div>
  <div class="ring r3" data-parallax="0.20"></div>
</div>

<style>
  .bg-decor { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
  .dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(20, 20, 22, 0.14) 1px, transparent 1px);
    background-size: 20px 20px;
    -webkit-mask-image: radial-gradient(ellipse 60% 50% at 70% 12%, black 20%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 15% 65%, black 10%, transparent 65%);
    mask-image: radial-gradient(ellipse 60% 50% at 70% 12%, black 20%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 15% 65%, black 10%, transparent 65%);
    -webkit-mask-composite: source-over; mask-composite: add;
  }
  .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(20, 20, 22, 0.10); will-change: transform; }
  .r1 { width: 420px; height: 420px; right: -140px; top: -120px; border-color: rgba(43, 60, 240, 0.22); }
  .r2 { width: 640px; height: 640px; right: -260px; top: -240px; }
  .r3 { width: 340px; height: 340px; left: -150px; top: 58%; border-color: rgba(43, 60, 240, 0.14); }
  @media (max-width: 760px) { .r2 { display: none; } .r1 { width: 280px; height: 280px; right: -110px; } }
</style>
```

- [ ] **Step 2: Write `src/scripts/parallax.ts`**

```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
if (!reduce && els.length) {
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    for (const el of els) {
      const f = parseFloat(el.dataset.parallax || '0');
      el.style.transform = `translateY(${(y * f).toFixed(1)}px)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}
```

- [ ] **Step 3: Mount + verify**

Add `<BgDecor />` right after `<Base>` opening tag in `index.astro`, import `../scripts/parallax` in the page script block.

```bash
npm run build
grep -c 'data-parallax' dist/index.html    # expect 3
```

Manual: scroll — rings drift slower than content; with reduced motion emulated, rings are static.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: dot-field and rings background with scroll parallax"
```

---

### Task 5: Facts strip with count-up + scroll reveal script

**Files:**
- Create: `src/components/Facts.astro`, `src/scripts/reveal.ts`, `src/scripts/countup.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `facts` from data module.
- Produces: `reveal.ts` (IntersectionObserver adding `.in` to `.reveal`, ported from mock lines 411–424 — used by all later sections); `countup.ts` animating `[data-countup]` elements; Facts markup uses `data-countup="<value>" data-prefix data-suffix`.

- [ ] **Step 1: Write `Facts.astro`**

Port mock CSS lines 129–142 and markup 274–281, but generate from data:

```astro
---
import { facts } from '../data/site';
---
<div class="facts reveal" role="region" aria-label="Key facts">
  <div class="facts-inner wrap">
    {facts.map((f) => (
      <div class="fact">
        <div class="n">
          {f.prefix}<span class="cnt" data-countup={f.value}>{f.value}</span><span class="sfx">{f.suffix}</span>
        </div>
        <div class="l">{f.label}</div>
      </div>
    ))}
  </div>
</div>
```

(`.sfx` styled like the mock's accent `span`; keep grid + mobile borders CSS from mock.)

- [ ] **Step 2: Write `reveal.ts`** — port mock scroll-reveal IIFE verbatim (reduced-motion and no-IO fallbacks included).

- [ ] **Step 3: Write `countup.ts`**

```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = document.querySelectorAll<HTMLElement>('[data-countup]');
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const target = parseInt(el.dataset.countup || '0', 10);
      const dur = 900;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
}
```

- [ ] **Step 4: Mount `<Facts />` after `<Hero />`; import reveal + countup scripts. Verify:**

```bash
npm run build
grep -c 'data-countup' dist/index.html   # expect 4
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: facts strip with count-up and scroll reveal"
```

---

### Task 6: About section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `aboutParagraphs`, `aboutMeta` from data; `#clockInline` id (clock script already targets it).

- [ ] **Step 1: Write `About.astro`** — port mock CSS lines 144–159 and markup 284–298, generating paragraphs with `set:html` and meta rows from `aboutMeta`. The "Based in" row keeps `<span id="clockInline">UTC+4</span>`.

- [ ] **Step 2: Mount after `<Facts />`. Verify:**

```bash
npm run build
grep -c 'id="about"' dist/index.html         # expect 1
grep -c 'clockInline' dist/index.html        # expect 1
```

- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: about section"`

---

### Task 7: Selected Work section (cards, covers, device frames)

**Files:**
- Create: `src/components/Work.astro`, `src/components/WorkCard.astro`, `src/components/Cover.astro`, `src/components/DeviceFrames.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `projects` from data.
- Produces: section `id="work"` with tag "02 — Selected work" (renumber later sections: Experience → 03, Stack → 04, Contact → 05).

- [ ] **Step 1: Write `Cover.astro`** — stylized SVG cover per project (no fake UI). Accepts `slug` and `name`; deterministic per-slug motif on the dot-field language:

```astro
---
const { slug } = Astro.props;
const motifs: Record<string, { hue: string; rings: [number, number][] }> = {
  kvitka: { hue: '#2B3CF0', rings: [[70, 26], [40, 15]] },
  phreesia: { hue: '#0FA36B', rings: [[60, 30], [90, 12]] },
  trastra: { hue: '#E0662E', rings: [[80, 20], [50, 34]] },
  velas: { hue: '#7A3CF0', rings: [[65, 22], [95, 10]] },
  daysync: { hue: '#2B3CF0', rings: [[75, 24], [45, 18]] },
};
const m = motifs[slug] ?? motifs.daysync;
---
<svg class="cover" viewBox="0 0 400 240" fill="none" role="img" aria-label={`${Astro.props.name} cover`}>
  <defs>
    <pattern id={`d-${slug}`} width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="rgba(20,20,22,.12)"></circle>
    </pattern>
    <radialGradient id={`f-${slug}`} cx="65%" cy="35%" r="60%">
      <stop offset="30%" stop-color="white"></stop>
      <stop offset="100%" stop-color="white" stop-opacity="0"></stop>
    </radialGradient>
    <mask id={`m-${slug}`}><rect width="400" height="240" fill={`url(#f-${slug})`}></rect></mask>
  </defs>
  <rect width="400" height="240" fill="#F1F1EE"></rect>
  <rect width="400" height="240" fill={`url(#d-${slug})`} mask={`url(#m-${slug})`}></rect>
  {m.rings.map(([r, x], i) => (
    <circle cx={260 + x} cy={70 + i * 55} r={r} stroke={m.hue} stroke-opacity={0.35 - i * 0.12} stroke-width="1.2"></circle>
  ))}
  <text x="28" y="204" font-family="Geist Mono, monospace" font-size="11" letter-spacing="2" fill="#8B8C93">{(Astro.props.name as string).toUpperCase()}</text>
</svg>
<style>.cover { width: 100%; height: 100%; display: block; }</style>
```

- [ ] **Step 2: Write `DeviceFrames.astro`** — DaySync flagship visual. CSS-drawn browser frame + phone frame side by side. In frontmatter check `fs.existsSync` for `public/assets/work/daysync-web.png` and `public/assets/work/daysync-mobile.png`; if either is missing render `<Cover slug="daysync" name="DaySync" />` instead (spec's fallback). Frame styles: rounded rects, 1px `var(--line-2)` borders, browser gets a 3-dot top bar, phone gets a notch pill; screenshots `object-fit: cover`.

- [ ] **Step 3: Write `WorkCard.astro`**

```astro
---
import Cover from './Cover.astro';
import DeviceFrames from './DeviceFrames.astro';
import type { Project } from '../data/site';
const { project } = Astro.props as { project: Project };
const Tag = project.link ? 'a' : 'div';
---
<Tag class:list={['card', { flagship: project.flagship }]}
  {...(project.link ? { href: project.link, target: '_blank', rel: 'noopener' } : {})}>
  <div class="visual">
    {project.flagship ? <DeviceFrames /> : <Cover slug={project.slug} name={project.name} />}
  </div>
  <div class="body">
    <div class="head">
      <h3>{project.name}</h3>
      {project.link && <span class="arw" aria-hidden="true">↗</span>}
    </div>
    <p class="role">{project.role}{project.agentic && ' · agentic build'}</p>
    <p class="outcome">{project.outcome}</p>
    <ul class="tags">{project.stack.map((s) => <li>{s}</li>)}</ul>
  </div>
</Tag>
```

Card styles (scoped): border `1px solid var(--line)`, radius 14px, paper bg; hover `transform: translateY(-4px)`, border-color `var(--line-2)`, `.visual` child scales 1.03 (transition `var(--ease)`, 0.3s); `.tags li` mono uppercase 0.68rem pills; flagship spans full grid width with visual+body side by side (stack on `max-width: 760px`).

- [ ] **Step 4: Write `Work.astro`**

```astro
---
import { projects } from '../data/site';
import WorkCard from './WorkCard.astro';
---
<section class="wrap" id="work">
  <div class="sec-head reveal"><h2>Selected Work</h2><span class="tag">02 — What</span></div>
  <div class="grid reveal">
    {projects.map((p) => <WorkCard project={p} />)}
  </div>
</section>
```

Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem;` flagship `grid-column: 1 / -1;` single column under 760px. Move shared `.sec-head` CSS from the mock into `global.css` (used by Work, About, HowIBuild, Experience, Stack, Contact).

- [ ] **Step 5: Mount after `<About />`; renumber tags** — About "01 — Who", Work "02 — What", HowIBuild "03 — How" (next task), Experience "04 — Where", Stack "05 — With what", Contact "06 — Say hello". Verify:

```bash
npm run build
grep -c 'id="work"' dist/index.html   # expect 1
grep -o 'daysync.io' dist/index.html | head -1
```

Manual: flagship card full width; covers render distinct per project.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: selected work section with covers and device frames"`

---

### Task 8: How I Build section (agentic pipeline)

**Files:**
- Create: `src/components/HowIBuild.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `pipeline` from data; `.reveal` behavior from `reveal.ts`.

- [ ] **Step 1: Write `HowIBuild.astro`**

```astro
---
import { pipeline } from '../data/site';
---
<section class="wrap" id="how">
  <div class="sec-head reveal"><h2>How I Build</h2><span class="tag">03 — How</span></div>
  <div class="reveal">
    <p class="lead">
      I work AI-natively: agents write a large share of the code, and my job is
      architecture, specs, and review. On my last team this raised delivery
      throughput <b>~40%</b> — tracked in sprint velocity, not vibes.
    </p>
    <ol class="pipe">
      {pipeline.map((p, i) => (
        <li class="node" style={`--i:${i}`}>
          <span class="idx">{String(i + 1).padStart(2, '0')}</span>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </li>
      ))}
    </ol>
  </div>
</section>
```

Styles: `.pipe` is a 5-column grid (2 columns ≤ 900px, 1 ≤ 560px) with a connecting hairline drawn via `.node::before` (horizontal 1px line, hidden on first node and on mobile); `.idx` mono accent; nodes reveal sequentially — inside a revealed parent, `transition-delay: calc(var(--i) * 90ms)` on opacity/transform:

```css
.js .reveal .node { opacity: 0; transform: translateY(10px); transition: opacity .5s var(--ease), transform .5s var(--ease); transition-delay: calc(var(--i) * 90ms); }
.js .reveal.in .node { opacity: 1; transform: none; }
```

(Reduced-motion global override in `global.css` already forces these visible.)

- [ ] **Step 2: Mount after `<Work />`. Verify:**

```bash
npm run build
grep -c 'id="how"' dist/index.html      # expect 1
grep -c 'class="node"' dist/index.html  # expect 5
```

- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: how-i-build agentic pipeline section"`

---

### Task 9: Experience, Stack, Contact sections

**Files:**
- Create: `src/components/Experience.astro`, `src/components/Stack.astro`, `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `experience`, `stackRows`, `site` from data.

- [ ] **Step 1: Write the three components** — direct ports of mock CSS/markup, data-driven:
  - `Experience.astro`: mock lines 161–177 + 301–341, `<ol class="xp reveal">` mapped from `experience` (tag "04 — Where", id `experience`).
  - `Stack.astro`: mock lines 179–185 + 344–353, rows from `stackRows`, values joined with `<em>·</em>` separators (tag "05 — With what", id `stack`).
  - `Contact.astro`: mock lines 187–196 + 356–366, email/linkedin/resume from `site` (tag "06 — Say hello", id `contact`).

- [ ] **Step 2: Mount in order after `<HowIBuild />`. Verify:**

```bash
npm run build
for id in experience stack contact; do grep -c "id=\"$id\"" dist/index.html; done  # expect 1 each
grep -c 'big-mail' dist/index.html   # expect >= 1
```

- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: experience, stack, contact sections"`

---

### Task 10: Final QA pass

**Files:**
- Modify: whatever QA surfaces.

- [ ] **Step 1: Full checks**

```bash
npx astro check          # expect 0 errors
npm run build            # expect success
```

- [ ] **Step 2: Link validation** — extract hrefs from `dist/index.html`; verify every `#anchor` has a matching `id=` in the file; `curl -sI` each external URL (daysync.io, linkedin.com) expecting HTTP 200/999 (LinkedIn returns 999 to bots — acceptable); verify `/assets/Bogdan_Egikov_Resume.pdf` and `/og.png` exist in `dist/`.

- [ ] **Step 3: Lighthouse** — run against `npm run preview` (port 4321):

```bash
npx lighthouse http://localhost:4321 --preset=desktop --quiet --chrome-flags='--headless' --only-categories=performance,accessibility,seo --output=json --output-path=/tmp/lh.json
node -e "const r=require('/tmp/lh.json').categories; console.log(Object.entries(r).map(([k,v])=>k+': '+Math.round(v.score*100)).join('\n'))"
```

Expected: all ≥ 95. Fix regressions (common: image dimensions, contrast on `.l` labels, missing `aria-label`s).

If Chrome/Lighthouse is unavailable in this environment, note it and move on — flag for the user to run once deployed.

- [ ] **Step 4: Reduced-motion & responsive spot check** — if a browser automation tool is available: emulate `prefers-reduced-motion` (content visible, no parallax) and screenshot at 360/768/1280 widths. Otherwise flag for manual check.

- [ ] **Step 5: Commit fixes** — `git add -A && git commit -m "fix: QA pass — lighthouse, links, a11y"`

---

### Task 11: Deploy to Vercel

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: the finished static site.

- [ ] **Step 1: Create GitHub repo & push**

```bash
gh repo create bogdan-space --private --source . --push
```

If `gh` is not authenticated, ask the user to run `! gh auth login` or create the repo manually.

- [ ] **Step 2: Deploy** — preferred: `npx vercel --prod --yes` (prompts link/login — if not authenticated, ask the user to run `! npx vercel login`). Alternative: user imports the GitHub repo in the Vercel dashboard (zero-config for Astro).

- [ ] **Step 3: Write `README.md`** — one-paragraph project description, `npm run dev/build/preview` commands, deploy notes, and **domain instructions**: in Vercel → Project → Settings → Domains add `bogdan.space`; set DNS (A `76.76.21.21` apex + CNAME `cname.vercel-dns.com` for www, or Vercel nameservers) — user action.

- [ ] **Step 4: Verify production** — `curl -sI https://<vercel-deployment-url>` expect 200; check `/og.png` and the PDF resolve.

- [ ] **Step 5: Commit** — `git add README.md && git commit -m "docs: readme with deploy instructions" && git push`

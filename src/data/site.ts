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
  'Over twelve years I\'ve architected and led delivery across fintech, adtech, and Web3 – usually as the first engineer, sometimes as CTO, always accountable for what ships. Lately my focus is AI-native engineering: agentic coding workflows built on Claude Code and MCP that measurably raise how fast a team delivers. On the side I run <a href="https://daysync.io" target="_blank" rel="noopener">DaySync</a>, a booking SaaS I built solo – live in the App Store, Google Play, and on the web.',
];

export const aboutMeta = [
  { k: 'Based in', v: 'Tbilisi, Georgia — UTC+4' },
  { k: 'Speaks', v: 'English, Ukrainian, Russian, Georgian' },
  { k: 'Studied', v: 'Physics — Tbilisi State University' },
  { k: 'Domains', v: 'FinTech · AdTech · Web3 · SaaS' },
];

export type Project = {
  slug: string;
  name: string;
  role: string;
  outcome: string;
  stack: string[];
  link?: string;
  flagship?: boolean;
  agentic?: boolean;
};
export const projects: Project[] = [
  {
    slug: 'daysync',
    name: 'DaySync',
    role: 'Founder · solo engineer',
    flagship: true,
    agentic: true,
    outcome:
      'Booking & business-management SaaS for salons – iOS, Android, and web, designed, built, and operated solo. Live in the App Store & Google Play, developed with a fully agentic Claude Code workflow across all three repos, with AI-driven E2E testing (Maestro + MCP, Playwright).',
    stack: ['React Native', 'Next.js', 'NestJS', 'PostgreSQL', 'Cloudflare'],
    link: 'https://daysync.io',
  },
];

export type Engagement = {
  name: string;
  role: string;
  outcome: string;
  stack: string[];
  status: string;
};
export const engagementsNote =
  'Built for employers and clients — the products belong to them, so they are described here, not shown.';
export const engagements: Engagement[] = [
  {
    name: 'Phreesia Provider Connect',
    role: 'Team lead of 7 · via Lineate',
    outcome:
      'Audience Builder – an adtech campaign-targeting platform for one of the largest US healthcare companies. Built hands-on (React/Next.js + NestJS monorepo over AWS Airflow/Athena) while leading a team of 7; agentic AI workflows raised delivery throughput ~40%.',
    stack: ['React/Next.js', 'NestJS', 'AWS Airflow', 'Athena'],
    status: 'Client platform · internal',
  },
  {
    name: 'KViTKA',
    role: 'CTO · lead full-stack · Global Ukraine',
    outcome:
      'Fintech for the Ukrainian diaspora — EUR vIBANs, multi-asset wallets, a VISA virtual card. Zero to first production release in ~3 months, owning architecture, app, and backend.',
    stack: ['React Native', 'MobX', 'NestJS', 'BaaS/KYC'],
    status: 'Employer product · offline',
  },
  {
    name: 'RunBuggy',
    role: 'Mobile developer · via Codemotion',
    outcome:
      'Logistics app for car dealers to manage and track vehicle-transit orders in real time – serving 6,000+ verified transporters.',
    stack: ['React Native', 'MobX', 'REST APIs'],
    status: 'Client product · live',
  },
  {
    name: 'Trastra',
    role: 'Frontend & mobile · via Codemotion',
    outcome:
      'Crypto-banking platform across web and mobile serving 400K+ users — OTP auth, full KYC flow, banking and crypto API integrations, real-time transaction alerts.',
    stack: ['React', 'React Native', 'MobX', 'Material UI'],
    status: 'Employer product · offline',
  },
  {
    name: 'Velas Account',
    role: 'Mobile developer · Velas',
    outcome:
      'One-click, passwordless access to Web3 apps — secure cryptographic key management and QR-based dApp connect/sign flows.',
    stack: ['React Native', 'Web3', 'Cryptography'],
    status: 'Employer product · offline',
  },
];

export const pipeline = [
  { title: 'Spec', desc: 'Requirements distilled into a design doc before any code' },
  { title: 'Claude Code agents', desc: 'Agentic implementation across mobile, web, and backend repos' },
  { title: 'MCP integrations', desc: "Custom servers wire agents into the team's real tooling" },
  { title: 'AI-assisted review & tests', desc: 'Automated review passes and test generation on every change' },
  { title: 'Ship', desc: '~40% faster team delivery – incl. a client platform redesign shipped in ~26h vs a 56–80h estimate' },
];

export const experience = [
  {
    years: '2025 — 2026',
    org: 'Lineate · Phreesia',
    role: 'Senior Engineer / Team Lead',
    summary:
      'Built Audience Builder – an adtech campaign-targeting platform for one of the largest US healthcare companies – hands-on (React/Next.js + NestJS) while leading a cross-functional team of 7; agentic AI workflows raised delivery throughput ~40%.',
  },
  {
    years: '2023 — 2025',
    org: 'Global Ukraine · KViTKA',
    role: 'CTO / Lead Full-Stack',
    summary:
      'Took a diaspora-banking fintech from a blank repo to production in ~3 months — EUR vIBANs, multi-asset wallets, a VISA virtual card — owning architecture, app, and backend end to end.',
  },
  {
    years: '2023 — now',
    org: 'DaySync',
    role: 'Independent product',
    summary:
      'Booking & business-management SaaS for salons – iOS, Android, and web, designed, built, and operated solo; live in the App Store & Google Play, with AI-driven E2E testing (Maestro + MCP, Playwright).',
  },
  {
    years: '2021 — 2023',
    org: 'Velas',
    role: 'Mobile Developer',
    summary:
      'Built Velas Account — one-click, passwordless access to Web3 apps with secure cryptographic key management and QR-based dApp connect/sign flows.',
  },
  {
    years: '2017 — 2021',
    org: 'Codemotion · Trastra & Famepick',
    role: 'Frontend & Mobile Developer',
    summary:
      'Delivered the Trastra crypto-banking platform (web + mobile, 400K+ users, full KYC), built the RunBuggy logistics app serving 6,000+ verified transporters, and built front-end for Famepick, a creator–brand SaaS.',
  },
  {
    years: '2013 — 2017',
    org: 'Apex LTD',
    role: 'Full-Stack Developer',
    summary:
      'Led the front-end of a cloud ERP unifying accounting, inventory, banking, and CRM; drove the migration from a .NET stack to a modern JavaScript frontend.',
  },
];

export const stackRows = [
  { k: 'Core', v: ['TypeScript', 'React', 'React Native', 'Next.js', 'NestJS', 'Node.js'] },
  { k: 'Mobile', v: ['React Navigation', 'MobX', 'biometric auth', 'push & deep links', 'App Store / Google Play releases'] },
  { k: 'Testing', v: ['Maestro (mobile E2E)', 'Playwright (web E2E)', 'AI-generated tests (Jest)'] },
  { k: 'Data & Infra', v: ['PostgreSQL', 'Redis', 'AWS (Airflow, Athena, Lambda)', 'Cloudflare', 'Docker', 'CI/CD'] },
  { k: 'Payments', v: ['Stripe', 'Paddle', 'in-app purchases', 'Adapty'] },
  { k: 'AI-Native', v: ['Claude Code', 'MCP', 'agentic pipelines', 'AI-assisted review & testing'] },
  { k: 'Practice', v: ['System design', 'technical leadership', 'mentoring', 'Agile/Scrum', 'code review'] },
];

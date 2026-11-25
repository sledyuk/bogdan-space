// All copy for bogdan.space lives here. Components only lay it out.

export const site = {
  name: 'Bogdan Egikov',
  email: 'sledyuk@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bogdan-egikov/',
  github: 'https://github.com/sledyuk',
  resumePath: '/assets/Bogdan_Egikov_Resume.pdf',
  location: 'Tbilisi, Georgia',
  timezoneLabel: 'UTC+4',
};

export const meta = {
  title: 'Bogdan Egikov, product engineer',
  description:
    'I take products from an idea to a live release: product design, iOS and Android, web, API and store releases. Founder of DaySync and Kachkachi. Based in Tbilisi, Georgia, working remotely (UTC+4).',
  shortDescription:
    'I take products from an idea to a live release. Founder of DaySync and Kachkachi. Tbilisi, remote UTC+4.',
};

/* ---------- hero ---------- */

export const hero = {
  headline: 'I take products from an idea to a live release.',
  lead: 'Design, apps, backend and the store release, end to end. AI agents write most of the code. I decide what ships.',
};

export type SpecRow = { k: string; v?: string; products?: boolean };
export const specRows: SpecRow[] = [
  { k: 'Role', v: 'Product engineer, 12+ years' },
  { k: 'Delivers', v: 'Product design, iOS and Android, web, API, store releases' },
  { k: 'AI workflow', v: 'Claude Code agents, MCP, automated review and tests' },
  { k: 'Own products', products: true },
  { k: 'Stack', v: 'React Native, Next.js, NestJS, PostgreSQL' },
  { k: 'Based in', v: 'Tbilisi, Georgia. Remote, UTC+4' },
];

export const ownProducts = [
  { name: 'DaySync', href: '#daysync', icon: '/assets/work/ds-icon.webp' },
  { name: 'Kachkachi', href: '#kachkachi', icon: '/assets/work/kach-icon.webp' },
];

// Projects menu in the dock: the three products with a full section on the page.
export const featuredProjects = [
  { name: 'DaySync', note: 'Own product, salon booking', href: '#daysync', icon: '/assets/work/ds-icon.webp' },
  { name: 'Kachkachi', note: 'Own product, gift wishlists', href: '#kachkachi', icon: '/assets/work/kach-icon.webp' },
  { name: 'AI Whisper', note: 'Freelance, live call assistant', href: '#aiwhisper', icon: '/assets/work/aw-icon.webp' },
];

/* ---------- from idea to release ---------- */

export const ship = {
  title: 'From idea to release',
  lead: 'Every product on this page went through the same six steps. AI agents make each step faster. I stay responsible for every one of them.',
  steps: [
    {
      title: 'Spec',
      text: 'An idea becomes a GitHub issue with a written spec and acceptance criteria. Nothing is built until I mark it ready. Larger choices go into decision records: 75 in DaySync, 57 in Kachkachi.',
      tools: ['GitHub issues', 'Decision records'],
    },
    {
      title: 'Design',
      text: 'A visual change starts as an HTML page with two or three rendered options side by side. The one I pick becomes tokens and components in code.',
      tools: ['HTML prototypes', 'Design tokens'],
    },
    {
      title: 'Build',
      text: 'Claude Code agents write the change, each in its own git worktree. A reviewer agent, a QA agent and a localization checker go over it before I read it.',
      tools: ['Claude Code', 'Git worktrees', 'MCP'],
    },
    {
      title: 'Test',
      text: 'Unit and end-to-end tests run on every change. Maestro drives the mobile app on a device, with a fresh account for each flow. Playwright covers the web.',
      tools: ['Jest', 'Vitest', 'Maestro', 'Playwright'],
    },
    {
      title: 'Release',
      text: 'A hook stops agents from merging. I merge, which deploys the web, then submit the apps to the App Store and Google Play. Each release goes into a delivery log.',
      tools: ['App Store', 'Google Play', 'Cloudflare'],
    },
    {
      title: 'Learn',
      text: 'Product analytics and error reports show what people actually do and where the app breaks. That becomes the next issue.',
      tools: ['PostHog', 'Sentry'],
    },
  ],
  proof: [
    { value: '~26 h', label: 'A client platform redesign at Lineate, against an estimate of 56 to 80 hours' },
    { value: '~40%', label: 'More delivery throughput after a team of seven moved to this workflow' },
    { value: '~3 mo', label: 'From an empty repository to the first production release of a fintech app' },
    { value: '770/1,027', label: 'Kachkachi commits with Claude as co-author' },
  ],
};

/* ---------- products ---------- */

export type Card = { tag: string; title: string; text: string };

export const daysync = {
  name: 'DaySync',
  url: 'https://daysync.io',
  lead: 'Booking and business management for salons, barbers and solo masters. I designed it and built the iOS and Android app, the web app, the booking pages and the API. Every release goes out through the six steps above.',
  role: 'Founder',
  roleNote: 'Design, engineering and releases',
  platforms: ['iOS', 'Android', 'Web app', 'Booking pages'],
  stats: [
    { value: '2.8.0', label: 'Latest release, November 2026' },
    { value: '4', label: 'Languages: English, Georgian, Ukrainian, Russian' },
    { value: '6,241', label: 'API tests: 5,297 unit and 944 end-to-end' },
    { value: '7,404', label: 'Tests in the mobile app' },
  ],
  decisionsNote: 'The app was redesigned in 2026. These are the choices I would defend in a design review.',
  features: [
    {
      tag: 'Navigation',
      title: 'One dock for the whole app',
      text: [
        'A plus button sits in the same place on every screen. Beside it, one panel shows the tabs on top-level screens and the page’s own actions deeper in.',
        'Only the icons crossfade, so it reads as a single panel changing its contents. I prototyped a glass version first and dropped it because it washed out over busy lists.',
      ],
    },
    {
      tag: 'AI assistants',
      title: 'The schedule inside an assistant',
      text: [
        'DaySync has its own connector for assistants such as Claude. An owner can ask for today’s schedule, find a free slot or move an appointment from a chat.',
        'Its 13 tools pass through the same role checks as the app. A client name that is hidden from a staff member in the app stays hidden in the assistant. I also wrote the sign-in server behind it.',
      ],
    },
  ],
  cards: [
    {
      tag: 'Home screen',
      title: 'The first screen is about today’s money',
      text: 'My Day opens with revenue, the amount still to collect and a ring showing how much of it is in. Under that sits the visit happening now, with a Check out button.',
    },
    {
      tag: 'Schedule',
      title: 'A timeline written from scratch',
      text: 'Two calendar libraries came out of the project, and carousels built on lists flashed during swipes. The schedule is a custom timeline on a native pager, with overlapping visits laid out in columns.',
    },
    {
      tag: 'Time zones',
      title: 'The salon’s clock, wherever the owner is',
      text: 'Every day and time follows the business time zone. An owner who travels opens the app and sees the salon’s day, not their own.',
    },
    {
      tag: 'Forms',
      title: 'Save is never greyed out',
      text: 'Tapping Save on an unfinished form moves the cursor to the field that is missing. Nobody has to guess why a button does nothing.',
    },
    {
      tag: 'Modals',
      title: 'Five kinds, one component each',
      text: 'Menu, alert, picker, sheet and full screen. They replaced about nine families of popups. Pickers for clients and services became ordinary pages.',
    },
    {
      tag: 'Booking page',
      title: 'Every accent colour is tested',
      text: 'Owners pick one of 12 accent colours for their booking page. A unit test checks each of them for 4.5:1 contrast on buttons.',
    },
  ] as Card[],
  stack: ['React Native', 'MobX', 'NestJS', 'Prisma', 'PostgreSQL', 'Next.js', 'Cloudflare Workers'],
  stackNote: 'Subscriptions from Apple, Google and Paddle land in one ledger, and every write carries an idempotency key.',
};

export const kachkachi = {
  name: 'Kachkachi',
  url: 'https://kachkachi.com',
  appStore: 'https://apps.apple.com/app/id6821174052',
  georgian: 'კაჭკაჭი',
  georgianNote: 'is Georgian for magpie.',
  lead: 'A free gift wishlist. Make a list, add gifts from any shop link and share one link. Friends reserve a gift without an account, and the owner never sees who took it. I took it from the first idea to a live web app and an approved iOS app.',
  role: 'Founder',
  roleNote: 'Design, engineering and releases',
  status: [
    { label: 'Web', state: 'live' },
    { label: 'iOS', state: 'live' },
    { label: 'Android, in review', state: 'wait' },
    { label: 'Georgian, English, Russian' },
  ] as { label: string; state?: 'live' | 'wait' }[],
  cards: [
    {
      tag: 'Privacy',
      title: 'The surprise is a rule in the code',
      text: 'The list owner never learns who reserved a gift. In the repository, any query that could leak it counts as a blocking bug.',
    },
    {
      tag: 'Mascot',
      title: 'One bird from one drawing kit',
      text: 'Kach has 12 poses and 6 outfits for occasions. Those, the stickers and the spot illustrations are all generated from one drawing kit in code, so he is the same bird everywhere.',
    },
    {
      tag: 'Purchases',
      title: 'A bug the tests could not see',
      text: 'App Store purchases failed while the test suite stayed green. Tests ran on Node, production ran on Cloudflare Workers, and a crypto library handled keys differently there. I moved the keys to Web Crypto.',
    },
    {
      tag: 'Shop links',
      title: 'Shops that block the server',
      text: 'Georgian shops refused requests from the server’s region, so links from those shops came back empty. A second reader now runs outside that region.',
    },
  ] as Card[],
  stack: ['Next.js', 'Cloudflare Workers', 'Expo', 'React Native', 'PostgreSQL', 'Drizzle'],
  stackNote: 'One primary action per screen, no tutorials, no social feed.',
};

export const aiWhisper = {
  name: 'AI Whisper',
  lead: 'A live assistant for calls. A desktop app listens to both sides of a conversation and shows hints while it is still going. After the call the platform returns a transcript, a score and a review.',
  role: 'Product engineer, freelance',
  roleNote: 'I designed the platform and built it through to production.',
  editions: ['Sales', 'Tutoring', 'Business meetings', 'Georgian and English'],
  shipped: [
    'Merged two separate dashboards into one web app.',
    'Moved the API from MongoDB to PostgreSQL.',
    'Rebuilt the desktop app from Electron to Tauri 2, with native audio capture on macOS and Windows.',
    'Set up staging and production as code, with encrypted database storage and nightly backups whose restore has been tested.',
    'Took the new platform to production in November 2026.',
  ],
  flow: [
    { title: 'During the call', steps: ['Both voices', 'Live transcript', 'Hint on screen'] },
    { title: 'After the call', steps: ['Transcript', 'Score', 'Review'] },
  ],
  logoNote: 'I also drew the logo: a voice wave writes a W and points at a compass beside a face.',
  stack: ['Tauri 2', 'Rust', 'Next.js', 'NestJS', 'PostgreSQL', 'Python', 'FastAPI'],
  stackNote: 'The product belongs to the client, so it is described here and not shown.',
};

/* ---------- all projects ---------- */

export type Status = 'live' | 'internal' | 'closed' | 'unlaunched';
export const statusLabel: Record<Status, string> = {
  live: 'Live',
  internal: 'Internal',
  closed: 'Closed',
  unlaunched: 'Not launched',
};

export type ProjectEntry = {
  name: string;
  kind: Kind;
  years: string;
  status: Status;
  text: string;
  platforms: string[];
  url?: string;
  icon?: string; // square icon; without one the card shows a letter tile
  mono?: { letters: string; color: string };
  anchor?: string; // link to a full section on this page
};

export const allProjects = {
  title: 'All projects',
  lead: 'Everything I have built or shipped as a product, with where it stands today. Some are still running, some have closed.',
  items: [
    {
      name: 'DaySync',
      kind: 'own',
      years: 'Now',
      status: 'live',
      text: 'Booking and business management for salons on iOS, Android and web.',
      platforms: ['Mobile', 'Web', 'Backend'],
      url: 'https://daysync.io',
      icon: '/assets/work/ds-icon.webp',
      anchor: '#daysync',
    },
    {
      name: 'Kachkachi',
      kind: 'own',
      years: 'Now',
      status: 'live',
      text: 'Gift wishlists where friends reserve a gift and the owner never sees who took it.',
      platforms: ['Web', 'Mobile'],
      url: 'https://kachkachi.com',
      icon: '/assets/work/kach-icon.webp',
      anchor: '#kachkachi',
    },
    {
      name: 'AI Whisper',
      kind: 'freelance',
      years: '2026 – now',
      status: 'live',
      text: 'A live call assistant. I designed the platform and built the desktop app, web app, API and infrastructure.',
      platforms: ['Desktop', 'Web', 'Backend'],
      icon: '/assets/work/aw-icon.webp',
      anchor: '#aiwhisper',
    },
    {
      name: 'KloutAgent',
      kind: 'freelance',
      years: '2026',
      status: 'live',
      text: 'An email assistant for creators that sorts brand emails and drafts replies. I redesigned onboarding and the dashboard and built the AI reply composer.',
      platforms: ['Web'],
      url: 'https://kloutagent.com',
      icon: '/assets/projects/kloutagent.webp',
    },
    {
      name: 'Respite Co-op',
      kind: 'freelance',
      years: '2024 – now',
      status: 'live',
      text: 'A platform where family caregivers share respite care in small groups. I build the web app and its API.',
      platforms: ['Web', 'Backend'],
      url: 'https://www.respitecoop.com',
      icon: '/assets/projects/respite.webp',
    },
    {
      name: 'Dostata',
      kind: 'freelance',
      years: '2024 – 2025',
      status: 'closed',
      text: 'An AI chat companion for older people, with a side for their caregivers. I added subscriptions and voice input fixes and set up production builds.',
      platforms: ['Mobile'],
      icon: '/assets/projects/dostata.webp',
    },
    {
      name: 'Audience Builder',
      kind: 'company',
      years: '2025 – 2026',
      status: 'internal',
      text: 'Campaign targeting for one of the largest US healthcare companies, built at Lineate.',
      platforms: ['Web', 'Backend', 'Data'],
      mono: { letters: 'AB', color: '#3F5B7A' },
    },
    {
      name: 'KViTKA',
      kind: 'company',
      years: '2023 – 2025',
      status: 'closed',
      text: 'A banking app for Ukrainians in the EU: EUR vIBANs, wallets, a VISA virtual card and KYC.',
      platforms: ['Mobile', 'Backend'],
      icon: '/assets/projects/kvitka.webp',
    },
    {
      name: 'Velas Account',
      kind: 'company',
      years: '2021 – 2023',
      status: 'closed',
      text: 'Passwordless access to Web3 apps, with key management and QR flows to connect and sign.',
      platforms: ['Mobile'],
      icon: '/assets/projects/velas.webp',
    },
    {
      name: 'RunBuggy',
      kind: 'company',
      years: '2017 – 2021',
      status: 'live',
      text: 'Vehicle-transit tracking for car dealers and 6,000 transporters.',
      platforms: ['Mobile'],
      url: 'https://runbuggy.com',
      mono: { letters: 'RB', color: '#1C8CD8' },
    },
    {
      name: 'Trastra',
      kind: 'company',
      years: '2017 – 2021',
      status: 'closed',
      text: 'A crypto-banking platform for more than 400,000 users.',
      platforms: ['Web', 'Mobile'],
      mono: { letters: 'T', color: '#2E3A48' },
    },
    {
      name: 'Famepick',
      kind: 'company',
      years: '2017 – 2021',
      status: 'closed',
      text: 'A platform that connected creators and brands.',
      platforms: ['Web', 'Mobile'],
      mono: { letters: 'F', color: '#0F2A4A' },
    },
  ] as ProjectEntry[],
};

/* ---------- experience ---------- */

export type Kind = 'own' | 'freelance' | 'company';
export type Project = { name?: string; domains: string[]; platforms: string[]; text: string };
export type Job = { years: string; org: string; role: string; kind: Kind; projects: Project[] };

export const kindLabel: Record<Kind, string> = {
  own: 'Own product',
  freelance: 'Freelance',
  company: 'Company',
};

export const experience: Job[] = [
  {
    years: 'Now',
    org: 'DaySync',
    role: 'Founder',
    kind: 'own',
    projects: [
      {
        domains: ['SaaS'],
        platforms: ['Mobile', 'Web', 'Backend'],
        text: 'Booking and business management for salons on iOS, Android and web.',
      },
    ],
  },
  {
    years: 'Now',
    org: 'Kachkachi',
    role: 'Founder',
    kind: 'own',
    projects: [{ domains: ['Consumer'], platforms: ['Web', 'Mobile'], text: 'Gift wishlists on web and iOS.' }],
  },
  {
    years: '2026 – now',
    org: 'AI Whisper',
    role: 'Product engineer',
    kind: 'freelance',
    projects: [
      {
        domains: ['AI'],
        platforms: ['Desktop', 'Web', 'Backend'],
        text: 'A live call assistant. I designed the platform and built the desktop app, web app, API and infrastructure.',
      },
    ],
  },
  {
    years: '2026',
    org: 'KloutAgent',
    role: 'Product engineer',
    kind: 'freelance',
    projects: [
      {
        domains: ['AI', 'Creator economy'],
        platforms: ['Web'],
        text: 'An email assistant for creators. I redesigned onboarding and the dashboard and built the AI reply composer.',
      },
    ],
  },
  {
    years: '2024 – now',
    org: 'Dostata',
    role: 'Product engineer',
    kind: 'freelance',
    projects: [
      {
        name: 'Respite Co-op',
        domains: ['Care'],
        platforms: ['Web', 'Backend'],
        text: 'A platform where family caregivers share respite care in small groups. I build the web app and its API.',
      },
      {
        name: 'Dostata app',
        domains: ['AI', 'Care'],
        platforms: ['Mobile'],
        text: 'An AI chat companion for older people. Subscriptions, voice input and production builds. Now closed.',
      },
    ],
  },
  {
    years: '2025 – 2026',
    org: 'Lineate',
    role: 'Senior engineer and team lead',
    kind: 'company',
    projects: [
      {
        name: 'Audience Builder, for Phreesia',
        domains: ['Adtech'],
        platforms: ['Web', 'Backend', 'Data'],
        text: 'A campaign-targeting platform for one of the largest US healthcare companies. I led a team of seven and brought agentic development to it.',
      },
    ],
  },
  {
    years: '2023 – 2025',
    org: 'Global Ukraine',
    role: 'CTO and lead full-stack engineer',
    kind: 'company',
    projects: [
      {
        name: 'KViTKA',
        domains: ['Fintech'],
        platforms: ['Mobile', 'Backend'],
        text: 'A banking app for Ukrainians in the EU, from an empty repository to its first production release in about three months: EUR vIBANs, multi-asset wallets, a VISA virtual card and KYC.',
      },
    ],
  },
  {
    years: '2021 – 2023',
    org: 'Velas',
    role: 'Mobile developer',
    kind: 'company',
    projects: [
      {
        name: 'Velas Account',
        domains: ['Crypto'],
        platforms: ['Mobile'],
        text: 'Passwordless access to Web3 apps, with key management and QR flows to connect and sign.',
      },
    ],
  },
  {
    years: '2017 – 2021',
    org: 'Codemotion',
    role: 'Frontend and mobile developer',
    kind: 'company',
    projects: [
      {
        name: 'Trastra',
        domains: ['Fintech', 'Crypto'],
        platforms: ['Web', 'Mobile'],
        text: 'A crypto-banking platform for more than 400,000 users.',
      },
      { name: 'RunBuggy', domains: ['Logistics'], platforms: ['Mobile'], text: 'Vehicle-transit tracking for 6,000 transporters.' },
      { name: 'Famepick', domains: ['SaaS'], platforms: ['Web', 'Mobile'], text: 'A platform that connects creators and brands.' },
    ],
  },
  {
    years: '2013 – 2017',
    org: 'Apex',
    role: 'Full-stack developer',
    kind: 'company',
    projects: [
      {
        name: 'Cloud ERP',
        domains: ['Business software'],
        platforms: ['Web'],
        text: 'Accounting, inventory, banking and CRM in one product. I led the frontend and its move from .NET to JavaScript.',
      },
    ],
  },
];

export const about = {
  text: 'I studied physics at Tbilisi State University and have written software for a living since 2013. I speak Georgian, Russian and Ukrainian natively and work in English.',
  dayToDay: ['TypeScript', 'React Native', 'React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Cloudflare', 'AWS'],
  also: ['Stripe', 'Paddle', 'In-app purchases', 'Claude Code', 'MCP', 'Maestro', 'Playwright'],
};

export const contact = {
  title: 'Have an idea to ship?',
  text: 'If you need one person to take a product from the first sketch to the App Store, Google Play and the web, write to me.',
};

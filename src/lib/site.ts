// ─────────────────────────────────────────────────────────────────────────────
// Store status
//
// FormAI is currently pre-launch — Internal Testing only. The shape below
// makes it impossible to ship a fake link: each store URL is `null` until the
// app is genuinely live. UI components are expected to render an honest
// "Yakında" state when `url === null`, and only render a live store badge
// when both `url` is set and `live` is true.
// ─────────────────────────────────────────────────────────────────────────────
type StoreStatus = {
  url: string | null;
  live: boolean;
  comingSoonLabel: string;
};

export const site = {
  name: 'FormAI',
  tagline: 'Kişisel yapay zekâ fitness koçun.',
  description:
    'FormAI; kameranla formunu izleyen, 30 günde kişisel programını kuran ve beslenmenden gelişimine her adımda yanında olan yapay zekâ destekli fitness koçun.',
  url: 'https://formai.app',
  ogImage: '/og/og-default.png',
  locale: 'tr-TR',
  twitter: '@formai_app',

  stores: {
    appStore: {
      url: null,
      live: false,
      comingSoonLabel: 'Yakında',
    } satisfies StoreStatus,
    play: {
      url: null,
      live: false,
      comingSoonLabel: 'Yakında',
    } satisfies StoreStatus,
  },

  beta: {
    // Anchor the waitlist CTA in one place; pages reference site.beta.waitlistHref.
    waitlistHref: '/baslat#waitlist',
    contactEmail: 'erken-erisim@formai.app',
    primaryCta: 'Erken erişim al',
    primaryCtaShort: 'Erken erişim',
  },

  // ────────────────────────────────────────────────────────────────────────
  // User-count badge — PR 1.6 trust signal.
  //
  // <UserCountBadge /> conditionally REPLACES the hero stats row when the
  // count is real. Today: value is null → stats row keeps its current copy.
  // When you set a real `value` AND it meets `minDisplayCount`, the hero
  // swaps automatically to a single tasteful "Beta · X erken kullanıcı" line
  // with the measurement date as caption.
  //
  // To activate (only when you have a verifiable count):
  //   value:          real number of users (e.g. 1247)
  //   capturedAt:     ISO date when the count was measured
  //   stage:          'beta' | 'launch' | 'production' — drives the caveat
  //                   pill text ("Beta", "Launch", "Production")
  //   minDisplayCount: gate to avoid showing tiny early numbers (default 100)
  // ────────────────────────────────────────────────────────────────────────
  userCount: {
    value: null as number | null,
    capturedAt: null as string | null,
    stage: 'beta' as 'beta' | 'launch' | 'production',
    minDisplayCount: 100,
  },

  // ────────────────────────────────────────────────────────────────────────
  // App-store ratings — PR 1.3 trust badge data source.
  //
  // The <AppRating /> component is invisible by default and only renders when
  // a store has both an `average` AND a `count` that meets `minReviewCount`.
  // This makes it impossible to ship a fabricated rating — the visual exists
  // only once the underlying social proof is real.
  //
  // To activate (per store) once you have ≥100 verified reviews:
  //   1. Set `average` (e.g. 4.7), `count` (e.g. 142), and a deep `url` to
  //      the store reviews page.
  //   2. Optionally raise `minReviewCount` if you want a higher credibility
  //      threshold before going live.
  // ────────────────────────────────────────────────────────────────────────
  ratings: {
    appStore: {
      average: null as number | null,
      count: null as number | null,
      url: null as string | null,
    },
    play: {
      average: null as number | null,
      count: null as number | null,
      url: null as string | null,
    },
    minReviewCount: 100,
  },

  // ────────────────────────────────────────────────────────────────────────
  // Team / human presence
  //
  // The FounderStrip component renders two variants based on this config:
  //   1. ANONYMOUS-CRAFT (default, what ships today): no face, no name —
  //      truthful "made by a small independent team" positioning that
  //      avoids fabrication. Ships when `founder.name` is null.
  //   2. NAMED-FOUNDER: real photo + name + signature line. Activates
  //      automatically when `founder.name` AND `founder.photoSrc` are set.
  //      No code change required — just fill the four fields below.
  // ────────────────────────────────────────────────────────────────────────
  team: {
    founder: {
      name: null as string | null,
      role: null as string | null,
      photoSrc: null as string | null,
      signatureLine: null as string | null,
    },
    location: 'Türkiye',
    status: 'Bağımsız · pre-launch',
    contact: {
      // Single source of truth for the support email. Every Destek channel,
      // every legal-page contact anchor, the FounderStrip strip, and the
      // LegalPageLayout sidebar all read from here. To change the support
      // address site-wide, change this one value.
      email: 'formaisupport@proton.me',
      // Set to a real handle to surface a footer link in the strip; null hides it.
      github: null as string | null,
      twitter: null as string | null,
    },
  },
} as const;

export type SiteConfig = typeof site;

export const storesLive = site.stores.appStore.live || site.stores.play.live;

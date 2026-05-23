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
} as const;

export type SiteConfig = typeof site;

export const storesLive = site.stores.appStore.live || site.stores.play.live;

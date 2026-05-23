export const site = {
  name: 'FormAI',
  tagline: 'Kişisel yapay zekâ fitness koçun.',
  description:
    'FormAI; kameranla formunu izleyen, 30 günde kişisel programını kuran ve beslenmenden gelişimine her adımda yanında olan yapay zekâ destekli fitness koçun.',
  url: 'https://formai.app',
  ogImage: '/og/og-default.png',
  locale: 'tr-TR',
  twitter: '@formai_app',
  appStoreUrl: '#',
  playStoreUrl: '#',
} as const;

export type SiteConfig = typeof site;

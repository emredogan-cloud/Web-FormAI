// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD structured data — PR 5.1 (Phase 5, SEO + observability).
//
// Every builder below draws from the existing single sources of truth
// (`src/lib/site.ts`, `src/data/faq.ts`) — no duplicated strings. Rendered
// server-side via <JsonLd> so the markup is in the initial HTML for crawlers.
//
// TRUTHFUL-CONTENT POLICY (Standing Rule #7) — what is deliberately ABSENT,
// and why, audited against real product state:
//   • NO aggregateRating / review anywhere — `site.ratings.*` are all null
//     (no real reviews yet). Fabricating a rating is forbidden.
//   • WebSite has NO potentialAction/SearchAction — the site has no search
//     endpoint, so a sitelinks-searchbox action would point nowhere.
//   • SoftwareApplication has NO `offers` — the app is pre-launch (both
//     `site.stores.*.url` are null / `live:false`); published prices live as
//     display strings on /baslat, not single-sourced numerics. Emitting an
//     Offer would overclaim availability. Add at launch when stores go live.
//   • Organization has NO `sameAs` — `site.team.contact.{github,twitter}`
//     are null (no established/verifiable public profiles to assert).
//   • NO BreadcrumbList — the site is flat (single-level routes); a hierarchy
//     claim is not justified.
// ─────────────────────────────────────────────────────────────────────────────

import { site } from '@/lib/site';
import { faqGroups } from '@/data/faq';

// Stable @id anchors so cross-references resolve within a page's merged graph
// (the layout emits Organization on every route; page schemas link to it).
const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const SOFTWARE_ID = `${site.url}/#app`;

function absolute(path: string): string {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    logo: absolute('/favicon.svg'),
    description: site.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: site.team.contact.email,
      contactType: 'customer support',
      availableLanguage: ['Turkish'],
    },
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: site.locale,
    publisher: { '@id': ORG_ID },
  };
}

// Root-layout graph: Organization + WebSite, linked by @id. One script tag.
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), websiteSchema()],
  };
}

// /destek — auto-generated from the same faqGroups the page renders.
export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: site.locale,
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };
}

// /baslat — truthful core only (no offers/rating; see policy note above).
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: site.name,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS 15+, Android 10+',
    description: site.description,
    url: `${site.url}/baslat`,
    inLanguage: site.locale,
    publisher: { '@id': ORG_ID },
  };
}

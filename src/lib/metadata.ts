import type { Metadata } from 'next';
import { site } from '@/lib/site';

// ─────────────────────────────────────────────────────────────────────────────
// Canonical + hreflang policy — PR 5.3 (Phase 5).
//
// Single source for every page's `alternates`. Two truthful jobs:
//   1. canonical — a stable self-referential canonical per route (duplicate-
//      content clarity: query params, trailing slashes, www variants all fold
//      to one URL).
//   2. hreflang  — the site is Turkish-only TODAY, so we declare exactly one
//      real language: site.locale ('tr-TR'). x-default points to the same
//      Turkish page because it genuinely is the default for every locale right
//      now. NO fabricated languages (no placeholder en-US) — that would be
//      fake localization.
//
// Paths are relative; Next resolves them against metadataBase (site.url), so
// the emitted canonical/hreflang URLs are absolute + stable without repeating
// the domain anywhere. Future-ready: when a real localized variant ships, add
// its `locale → path` here once and every page inherits the hreflang link.
// ─────────────────────────────────────────────────────────────────────────────
export function alternatesFor(path: string): Metadata['alternates'] {
  return {
    canonical: path,
    languages: {
      [site.locale]: path,
      'x-default': path,
    },
  };
}

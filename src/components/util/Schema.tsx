import type { ReactElement } from 'react';

// PR 5.1 — JSON-LD injector. Server component (no 'use client'): the
// <script type="application/ld+json"> is rendered into the initial HTML so
// crawlers read it without executing JS. Builders live in @/lib/schema.
//
// The '<' escape prevents any string value (FAQ answers, descriptions) from
// breaking out of the <script> via a literal "</script>" sequence — the one
// XSS/parse hazard when inlining JSON into HTML.
export function JsonLd({ data }: { data: Record<string, unknown> }): ReactElement {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

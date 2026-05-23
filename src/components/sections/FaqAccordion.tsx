'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

type Tone = 'violet' | 'ember' | 'lime' | 'scan';

// MP.9 — single-open accordion. Framer Motion removed; the open ↔ closed
// height change is now driven by the modern CSS grid-rows-[0fr] → [1fr]
// pattern, paired with opacity for the cross-fade. No JS height
// measurement, no layout thrash, no bundled animation runtime.
//
// Tone awareness ties each FAQ group to its pillar identity (set on the
// Destek page: antrenman=ember, beslenme=lime, gelisim=violet, security=
// scan, default=violet). The tone drives the number chip's open-state
// fill + the left-rail accent line + the chevron's open-state colour.
//
// The accordion behaves as a single-open list per instance — opening
// one item closes the previously-open one — to keep the page scannable.
// First item ships open as a small reading-comfort affordance (the user
// can scan an answer immediately without a click).

const toneClass: Record<Tone, {
  numberOpen: string;     // filled chip when expanded
  rail: string;            // 1 px left rail in the answer panel
  chevronOpen: string;     // chevron colour when expanded
  hairline: string;        // accent hairline at the top of the question row when open
}> = {
  violet: {
    numberOpen: 'border-violet-400/40 bg-violet-500/15 text-violet-200',
    rail: 'bg-gradient-to-b from-violet-400/0 via-violet-400/50 to-violet-400/0',
    chevronOpen: 'border-violet-400/40 bg-violet-500/15 text-violet-200',
    hairline: 'bg-gradient-to-r from-transparent via-violet-400/40 to-transparent',
  },
  ember: {
    numberOpen: 'border-ember-500/40 bg-ember-500/15 text-ember-400',
    rail: 'bg-gradient-to-b from-ember-500/0 via-ember-500/50 to-ember-500/0',
    chevronOpen: 'border-ember-500/40 bg-ember-500/15 text-ember-400',
    hairline: 'bg-gradient-to-r from-transparent via-ember-500/40 to-transparent',
  },
  lime: {
    numberOpen: 'border-lime-500/40 bg-lime-500/15 text-lime-400',
    rail: 'bg-gradient-to-b from-lime-500/0 via-lime-500/50 to-lime-500/0',
    chevronOpen: 'border-lime-500/40 bg-lime-500/15 text-lime-400',
    hairline: 'bg-gradient-to-r from-transparent via-lime-500/40 to-transparent',
  },
  scan: {
    numberOpen: 'border-scan-500/40 bg-scan-500/15 text-scan-400',
    rail: 'bg-gradient-to-b from-scan-500/0 via-scan-500/50 to-scan-500/0',
    chevronOpen: 'border-scan-500/40 bg-scan-500/15 text-scan-400',
    hairline: 'bg-gradient-to-r from-transparent via-scan-500/40 to-transparent',
  },
};

export function FaqAccordion({ items, tone = 'violet' }: { items: FaqItem[]; tone?: Tone }) {
  const [open, setOpen] = useState<number | null>(0);
  // Stable id prefix so multiple accordion instances on the same page
  // (one per group) don't collide their aria-controls / id links.
  const idBase = useId();
  const t = toneClass[tone];

  return (
    <div className="divide-y divide-white/[0.06] overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.025]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${idBase}-panel-${i}`;
        const buttonId = `${idBase}-trigger-${i}`;
        return (
          <div key={i} className="relative">
            {/* Tone hairline at the very top edge of the row — fades in
                only when this item is open. Lightweight visual cue that
                ties the open state to the group's pillar colour. */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute left-6 right-6 top-0 h-px transition-opacity duration-500',
                isOpen ? 'opacity-100' : 'opacity-0',
                t.hairline
              )}
            />
            <button
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-white/[0.025] focus-visible:bg-white/[0.025] focus-visible:outline-none"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="flex items-start gap-4 pr-4">
                <span
                  className={cn(
                    'mt-0.5 inline-flex h-6 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] transition-colors duration-300',
                    isOpen
                      ? t.numberOpen
                      : 'border-white/10 bg-white/[0.04] text-white/60'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-base font-medium text-white/90 sm:text-lg">{item.q}</span>
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                  isOpen
                    ? cn('rotate-180', t.chevronOpen)
                    : 'border-white/10 bg-white/[0.04] text-white/60 group-hover:text-white/80'
                )}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5 L6 8 L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            {/* Answer panel — CSS grid-rows animation. The row is always
                in the DOM (read by SR), so SR users can navigate it via
                aria-controls. Closed → grid-rows-[0fr] collapses to 0 px;
                open → grid-rows-[1fr] expands to natural content height.
                Inner div needs `min-h-0 overflow-hidden` for the trick
                to work reliably across browsers. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cn(
                    'flex gap-4 px-6 pb-6 pl-[68px] transition-opacity duration-500',
                    isOpen ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {/* Left rail — subtle tone-coloured vertical line
                      visually pairs the answer with its question. */}
                  <span
                    aria-hidden
                    className={cn(
                      '-ml-[40px] mt-1 w-px shrink-0 self-stretch transition-opacity duration-500',
                      isOpen ? 'opacity-100' : 'opacity-0',
                      t.rail
                    )}
                  />
                  <div className="max-w-prose text-sm leading-7 text-white/65">{item.a}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

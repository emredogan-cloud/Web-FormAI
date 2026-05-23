import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

// ─────────────────────────────────────────────────────────────────────────────
// TypographicQuote
//
// PR 3.3 — second layout breaker. Pure typography, no chrome. Sits between
// MetricGrid and CtaBlock to give a final brand "beat" before the conversion
// ask. Resurrects the V1 hero line "Sahaya çıkan yapay zekâ fitness koçun"
// where it actually lands — after the visitor has full product context, the
// sports metaphor reads as a brand seal rather than a parsing puzzle. This
// matches the deep review's W7 recommendation:
//
//   "Move the 'sahaya çıkan' metaphor down to the Manifesto where context
//    exists."
//
// One sentence. Centered. Large. Subtle ambient glow. Nothing else.
// ─────────────────────────────────────────────────────────────────────────────

export function TypographicQuote() {
  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-40 lg:py-48">
      {/* Ambient glow — single soft halo behind the type, no GlowOrbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-violet opacity-20"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 30%, transparent 75%)',
        }}
      />

      <Container className="relative">
        <Reveal>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-display text-balance text-display-xl">
              <span className="text-gradient">Sahaya çıkan </span>
              <span className="text-gradient-violet">yapay zekâ </span>
              <span className="text-gradient">fitness koçun.</span>
            </blockquote>
            <figcaption className="mt-10 inline-flex items-center gap-3 text-white/40">
              <span aria-hidden className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">FormAI · manifesto</span>
              <span aria-hidden className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

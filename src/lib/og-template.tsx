import { ImageResponse } from 'next/og';

// ─────────────────────────────────────────────────────────────────────────────
// Shared OG image renderer — PR 5.2 (Phase 5).
//
// Single source of the OpenGraph visual design. Each route's thin
// `opengraph-image.tsx` (Next.js segment convention) calls renderOgImage()
// with its own truthful params, so previews vary per page while the brand
// system stays identical. 1200×630 PNG, edge runtime (set per route file).
//
// Palette is grounded in the real tailwind.config.ts brand tokens (Standing
// Rule #3): Antrenman=ember, Beslenme=lime, Gelişim/brand=violet, Trust=scan.
// Only accent elements shift per tone; the dark base + layout stay constant.
// ─────────────────────────────────────────────────────────────────────────────

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export type OgTone = 'violet' | 'ember' | 'lime' | 'scan';

const PALETTE: Record<OgTone, { solid: string; light: string; deep: string; rgb: string }> = {
  violet: { solid: '#A98AFF', light: '#CCB5FF', deep: '#5230C2', rgb: '124,92,255' },
  ember: { solid: '#FF7A1A', light: '#FFA552', deep: '#E55F00', rgb: '255,122,26' },
  lime: { solid: '#C8FF00', light: '#D6FF3D', deep: '#A4D900', rgb: '200,255,0' },
  scan: { solid: '#1FCFFF', light: '#5FE3FF', deep: '#0AA3D6', rgb: '31,207,255' },
};

export interface OgStat {
  value: string;
  label: string;
}

export interface OgParams {
  tone: OgTone;
  eyebrow: string;
  headline: string;
  stats: OgStat[];
}

export function renderOgImage({ tone, eyebrow, headline, stats }: OgParams) {
  const c = PALETTE[tone];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          // Dark base, pillar-tinted top glow → per-page identity, one brand system.
          background: `radial-gradient(ellipse 85% 55% at 50% -8%, rgba(${c.rgb},0.42) 0%, #120A24 44%, #05030C 100%)`,
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 80,
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Top mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${c.light}, ${c.deep})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px rgba(${c.rgb},0.5)`,
            }}
          >
            {/* Dark glyph on the bright lime fill; white elsewhere. */}
            <div style={{ color: tone === 'lime' ? '#05030C' : 'white', fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>
              F
            </div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, display: 'flex' }}>
            <span style={{ color: 'white' }}>Form</span>
            <span style={{ color: c.solid }}>AI</span>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontFamily: 'monospace',
              fontSize: 16,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            ai · fitness coach
          </div>
        </div>

        {/* Center copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 960 }}>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'monospace',
              color: c.solid,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.03,
              background: `linear-gradient(180deg, #FFFFFF 0%, ${c.light} 100%)`,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {headline}
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: 60 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: 'white' }}>{s.value}</div>
              <div
                style={{
                  fontSize: 14,
                  fontFamily: 'monospace',
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative ring */}
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: `radial-gradient(circle, rgba(${c.rgb},0.34), transparent 70%)`,
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}

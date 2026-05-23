/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FormAI — kişisel yapay zekâ fitness koçun';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, #3E2399 0%, #150A2B 40%, #05030C 100%)',
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
              background: 'linear-gradient(135deg, #A98AFF, #5230C2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(124,92,255,0.5)',
            }}
          >
            <div style={{ color: 'white', fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>F</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, display: 'flex' }}>
            <span style={{ color: 'white' }}>Form</span>
            <span style={{ color: '#A98AFF' }}>AI</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'monospace',
              color: '#A98AFF',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            POSE DETECTION · ON-DEVICE
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #C9B8FF 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Sahaya çıkan yapay zekâ fitness koçun.
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: 60 }}>
          <Stat value="138" label="egzersiz" />
          <Stat value="30 gün" label="kişisel plan" />
          <Stat value="30fps" label="on-device pose" />
        </div>

        {/* Decorative gradient ring */}
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: 'white' }}>{value}</div>
      <div
        style={{
          fontSize: 14,
          fontFamily: 'monospace',
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

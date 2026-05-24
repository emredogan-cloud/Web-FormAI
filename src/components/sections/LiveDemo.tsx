'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  PoseLandmarker,
  PoseLandmarkerResult,
  NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/* ────────────────────────────────────────────────────────────────────────────
 * LiveDemo — PR 6.3 · in-browser live pose-detection demo (the signature
 * "try the product itself" moment).
 *
 * Runs BlazePose via @mediapipe/tasks-vision ENTIRELY in the browser: the camera
 * frames are processed on-device, a real 33-keypoint skeleton is drawn over the
 * feed, and a TRUTHFUL alignment score (computed from the detected landmarks)
 * reads out live. It mirrors the app's on-device pose engine — and honours the
 * site's privacy copy to the letter.
 *
 * PRIVACY (matches gizlilik/kvkk/faq: "hiçbir kare/landmark sunucuya yüklenmez,
 * Google'a gönderilmez, üçüncü tarafla paylaşılmaz"):
 *   • EXPLICIT click-gate — the camera never starts on its own.
 *   • Local-only — getUserMedia frames go straight into the in-page model;
 *     nothing is uploaded, stored, or sent anywhere. No analytics coupling.
 *   • Self-hosted runtime — wasm + model are served from our own origin
 *     (/mediapipe/*), so the demo makes ZERO third-party requests (mirrors how
 *     next/font self-hosts Google Fonts). See scripts/setup-mediapipe-assets.mjs.
 *   • Time-bounded — auto-stops after 60s; the camera is released on stop,
 *     timeout, tab-hide, and unmount (teardown() is called from every exit).
 *
 * TRUTHFULNESS (rule #7): the score is a real geometric posture/alignment metric
 * (torso verticality + shoulder/hip symmetry), not a fabricated number. It is
 * labelled as a simplified live readout — the app does full exercise-specific
 * form analysis. No pseudo-AI theatre.
 *
 * PERF (rule #8): @mediapipe/tasks-vision is dynamic-imported ONLY on Start, so
 * it never touches any page's initial bundle; GPU delegate (no SharedArrayBuffer
 * / cross-origin isolation needed); the lite model keeps mobile light. No Framer
 * Motion (rule #2). Decorative motion is minimal, so reduced-motion is honoured;
 * the demo itself is user-initiated and functional, not ambient.
 *
 * SHIP STATE: gated behind site.features.liveDemo (default OFF) — the camera/ML
 * runtime needs a real-device QA pass before going public (same build-then-
 * verify config-gating as AppRating / UserCountBadge).
 * ──────────────────────────────────────────────────────────────────────────── */

type DemoState = 'idle' | 'loading' | 'running' | 'ended' | 'denied' | 'unsupported' | 'error';

const DEMO_SECONDS = 60;
const WASM_PATH = '/mediapipe/wasm';
const MODEL_PATH = '/mediapipe/models/pose_landmarker_lite.task';

// Brand palette (matches the hero skeleton overlay for cohesion).
const VIOLET = '#8B66FF';
const SCAN = '#5FE3FF';

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// ── Truthful alignment score ────────────────────────────────────────────────
// A real geometric readout from the detected landmarks: torso verticality +
// shoulder & hip levelness. Returns null when the body isn't framed well enough
// (low visibility) rather than inventing a number.
function alignmentScore(lm: NormalizedLandmark[]): number | null {
  const need = [11, 12, 23, 24]; // shoulders + hips
  if (need.some((i) => (lm[i]?.visibility ?? 0) < 0.5)) return null;
  const ls = lm[11], rs = lm[12], lh = lm[23], rh = lm[24];

  const midSh = { x: (ls.x + rs.x) / 2, y: (ls.y + rs.y) / 2 };
  const midHip = { x: (lh.x + rh.x) / 2, y: (lh.y + rh.y) / 2 };

  // Torso verticality — angle of the shoulder→hip line away from vertical.
  const tilt = Math.abs(Math.atan2(midHip.x - midSh.x, midHip.y - midSh.y));
  const spine = clamp01(1 - tilt / (Math.PI / 6)); // full credit within 30°

  // Shoulder / hip levelness, normalised by their own width (scale-invariant).
  const shW = Math.hypot(ls.x - rs.x, ls.y - rs.y) || 1e-3;
  const hipW = Math.hypot(lh.x - rh.x, lh.y - rh.y) || 1e-3;
  const shoulders = clamp01(1 - Math.abs(ls.y - rs.y) / shW / 0.35);
  const hips = clamp01(1 - Math.abs(lh.y - rh.y) / hipW / 0.35);

  return Math.round((0.5 * spine + 0.25 * shoulders + 0.25 * hips) * 100);
}

function scoreLabel(score: number): string {
  if (score >= 85) return 'Mükemmel hizalama';
  if (score >= 70) return 'İyi — küçük düzeltme';
  if (score >= 50) return 'Dengeni topla';
  return 'Çerçevede düzel';
}

export function LiveDemo() {
  const [state, setState] = useState<DemoState>('idle');
  const [score, setScore] = useState<number | null>(null);
  const [best, setBest] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DEMO_SECONDS);

  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const connectionsRef = useRef<Array<{ start: number; end: number }>>([]);
  const rafRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastDisplayRef = useRef(0);
  const bestRef = useRef(0);

  // Releases EVERY resource. Safe to call repeatedly; called from all exits.
  const teardown = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    try {
      landmarkerRef.current?.close();
    } catch {
      /* noop */
    }
    landmarkerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    const v = videoRef.current;
    if (v) v.srcObject = null;
  }, []);

  // Release the camera if the tab is hidden mid-session, and always on unmount.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && streamRef.current) {
        teardown();
        setState((s) => (s === 'running' || s === 'loading' ? 'ended' : s));
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      teardown();
    };
  }, [teardown]);

  const handleStop = useCallback(() => {
    teardown();
    setBest(bestRef.current);
    setState('ended');
  }, [teardown]);

  const start = useCallback(async () => {
    // Capability + secure-context gate.
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia ||
      !window.isSecureContext
    ) {
      setState('unsupported');
      return;
    }

    setState('loading');

    // 1) Camera permission (explicit, user-initiated).
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
    } catch (err) {
      const name = (err as DOMException)?.name;
      setState(name === 'NotAllowedError' || name === 'SecurityError' ? 'denied' : 'error');
      return;
    }
    streamRef.current = stream;

    const video = videoRef.current;
    if (!video) {
      teardown();
      setState('error');
      return;
    }
    video.srcObject = stream;
    try {
      await video.play();
    } catch {
      /* autoplay quirks — the loop still reads frames */
    }
    await new Promise<void>((resolve) => {
      if (video.readyState >= 2) resolve();
      else video.addEventListener('loadeddata', () => resolve(), { once: true });
    });
    if (wrapRef.current && video.videoWidth) {
      // Match the frame's aspect so object-cover never crops → skeleton aligns.
      wrapRef.current.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    }

    // 2) Lazy-load the self-hosted BlazePose runtime (first paid cost is here).
    try {
      const vision = await import('@mediapipe/tasks-vision');
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_PATH);
      const make = (delegate: 'GPU' | 'CPU') =>
        vision.PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_PATH, delegate },
          runningMode: 'VIDEO',
          numPoses: 1,
        });
      landmarkerRef.current = await make('GPU').catch(() => make('CPU'));
      connectionsRef.current = vision.PoseLandmarker.POSE_CONNECTIONS;
    } catch {
      teardown();
      setState('unsupported');
      return;
    }

    // 3) Run.
    startedAtRef.current = performance.now();
    lastDisplayRef.current = 0;
    bestRef.current = 0;
    setScore(null);
    setBest(0);
    setSecondsLeft(DEMO_SECONDS);
    setState('running');

    const loop = () => {
      const v = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = landmarkerRef.current;
      if (!v || !canvas || !landmarker) return;

      const now = performance.now();
      const elapsed = (now - startedAtRef.current) / 1000;
      if (elapsed >= DEMO_SECONDS) {
        handleStop();
        return;
      }

      let result: PoseLandmarkerResult | undefined;
      try {
        result = landmarker.detectForVideo(v, now);
      } catch {
        /* skip frame */
      }
      const lm = result?.landmarks?.[0];

      // Draw the skeleton (DPR-scaled → crisp; mirrored to match the selfie view).
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const cssW = canvas.clientWidth || 1;
        const cssH = canvas.clientHeight || 1;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
          canvas.width = Math.round(cssW * dpr);
          canvas.height = Math.round(cssH * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, cssW, cssH);
        if (lm) {
          ctx.lineCap = 'round';
          ctx.strokeStyle = VIOLET;
          ctx.lineWidth = 3;
          ctx.shadowColor = SCAN;
          ctx.shadowBlur = 8;
          for (const c of connectionsRef.current) {
            const a = lm[c.start];
            const b = lm[c.end];
            if (!a || !b || (a.visibility ?? 1) < 0.4 || (b.visibility ?? 1) < 0.4) continue;
            ctx.beginPath();
            ctx.moveTo(a.x * cssW, a.y * cssH);
            ctx.lineTo(b.x * cssW, b.y * cssH);
            ctx.stroke();
          }
          ctx.shadowBlur = 10;
          ctx.fillStyle = SCAN;
          for (const p of lm) {
            if ((p.visibility ?? 1) < 0.4) continue;
            ctx.beginPath();
            ctx.arc(p.x * cssW, p.y * cssH, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        }
      }

      // Throttle the numeric/state display to ~8 Hz (the canvas stays 60fps).
      if (now - lastDisplayRef.current > 120) {
        lastDisplayRef.current = now;
        const s = lm ? alignmentScore(lm) : null;
        if (s !== null && s > bestRef.current) bestRef.current = s;
        setScore(s);
        setSecondsLeft(Math.max(0, DEMO_SECONDS - Math.floor(elapsed)));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [teardown, handleStop]);

  const tracked = score !== null;

  return (
    <section id="canli-demo" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-20" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-violet-400/70" />
            <Eyebrow tone="violet">Canlı dene · cihazında</Eyebrow>
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-display-md text-balance text-white">
            Pozunu, tarayıcında çıkaran yapay zekâ.
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/60">
            FormAI&apos;ın kullandığı <span className="text-white/80">BlazePose</span> modeli
            burada, senin tarayıcında çalışır. Kameran açılır, iskeletin canlı çıkarılır,
            hizalama skorun gerçek zamanlı hesaplanır.{' '}
            <span className="text-white/80">
              Görüntün cihazından çıkmaz — yüklenmez, kaydedilmez, hiçbir yere gönderilmez.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="surface-strong relative mt-12 overflow-hidden rounded-4xl p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
              {/* Camera stage */}
              <div
                ref={wrapRef}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-violet-400/20 bg-ink-950"
              >
                {/* The video + skeleton overlay are mirrored (selfie view). They
                    only carry pixels while running; hidden otherwise. */}
                {/* eslint-disable-next-line jsx-a11y/media-has-caption -- live, muted camera preview with no audio track; captions are not applicable */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`absolute inset-0 h-full w-full -scale-x-100 object-cover transition-opacity duration-500 ${
                    state === 'running' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <canvas
                  ref={canvasRef}
                  aria-hidden
                  className={`absolute inset-0 h-full w-full -scale-x-100 transition-opacity duration-500 ${
                    state === 'running' ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Live HUD chips while running */}
                {state === 'running' && (
                  <>
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-ink-950/70 px-3 py-1.5 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-scan-400/70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-scan-400" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                        {tracked ? 'İzleniyor' : 'Çerçeveye gir'}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[11px] tabular-nums tracking-widest text-white/80 backdrop-blur-md">
                      00:{String(secondsLeft).padStart(2, '0')}
                    </div>
                  </>
                )}

                {/* State overlays (idle / loading / ended / denied / unsupported / error) */}
                {state !== 'running' && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
                    <StageOverlay
                      state={state}
                      best={best}
                      onStart={start}
                    />
                  </div>
                )}
              </div>

              {/* Readout panel */}
              <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/80">
                    Hizalama skoru
                  </div>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-display text-6xl font-semibold tabular-nums text-white">
                      {state === 'running' && tracked ? score : '—'}
                    </span>
                    <span className="mb-2 text-sm text-white/40">/ 100</span>
                  </div>
                  <div className="mt-2 h-5 text-sm text-white/60">
                    {state === 'running'
                      ? tracked
                        ? scoreLabel(score as number)
                        : 'Gövdeni kameraya göster'
                      : 'Omuz · kalça simetrisi + gövde dikliği'}
                  </div>

                  <div className="mt-6 h-px bg-white/[0.06]" />
                  <ul className="mt-5 space-y-2.5 text-sm text-white/55">
                    <li className="flex items-start gap-2.5">
                      <Dot /> Tamamen cihazında — görüntün yüklenmez.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Dot /> ~60 saniye sonra kamera otomatik kapanır.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Dot /> Bu, basitleştirilmiş bir göstergedir; uygulama egzersize özel
                      formu analiz eder.
                    </li>
                  </ul>
                </div>

                {state === 'running' && (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Durdur ve kamerayı kapat
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Dot() {
  return <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-scan-400/80" />;
}

function StageOverlay({
  state,
  best,
  onStart,
}: {
  state: DemoState;
  best: number;
  onStart: () => void;
}) {
  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center gap-3 text-white/70">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
        <span className="text-sm">Kamera ve model hazırlanıyor…</span>
      </div>
    );
  }

  const copy: Record<string, { title: string; body: string; cta: string }> = {
    idle: {
      title: 'Pozunu canlı çıkar',
      body: 'Kameran yalnızca sen başlatınca açılır ve görüntün cihazından çıkmaz.',
      cta: 'Kamerayı başlat',
    },
    ended: {
      title: best > 0 ? `En iyi hizalaman: ${best}` : 'Demo bitti',
      body: 'Kamera kapatıldı. İstersen tekrar dene.',
      cta: 'Tekrar dene',
    },
    denied: {
      title: 'Kamera izni verilmedi',
      body: 'Demo tamamen cihazında çalışır. Tarayıcı ayarlarından izin verip tekrar deneyebilirsin.',
      cta: 'Tekrar dene',
    },
    unsupported: {
      title: 'Tarayıcın desteklemiyor',
      body: 'Bu demo için kamera, WebGL ve güvenli (HTTPS) bağlantı gerekir.',
      cta: 'Tekrar dene',
    },
    error: {
      title: 'Bir şeyler ters gitti',
      body: 'Kamera başlatılamadı. Tekrar dener misin?',
      cta: 'Tekrar dene',
    },
  };
  const c = copy[state] ?? copy.idle;

  return (
    <div className="flex max-w-sm flex-col items-center gap-4">
      <h3 className="font-display text-2xl font-semibold text-white">{c.title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{c.body}</p>
      <button
        type="button"
        onClick={onStart}
        className="mt-1 inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-medium text-white shadow-glow-medium transition-transform hover:scale-[1.03] active:scale-100"
      >
        {/* camera glyph */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 8a2 2 0 0 1 2-2h2l1.2-1.6A1 1 0 0 1 9 4h6a1 1 0 0 1 .8.4L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {c.cta}
      </button>
    </div>
  );
}

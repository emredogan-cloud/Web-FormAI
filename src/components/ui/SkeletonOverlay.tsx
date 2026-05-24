'use client';

import { useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────────────────────────────────
 * SkeletonOverlay — PR 6.1 · the hero's signature "pose-detection" interaction.
 *
 * Draws the real 33-keypoint BlazePose skeleton (the topology FormAI's app uses
 * for on-device pose analysis) as a neon wireframe behind the hero device. A
 * "detection focus" tracks the cursor and makes nearby joints + bones LOCK ON —
 * brightening from the resting violet to scan-cyan with a tracking reticle —
 * mimicking the moment the app acquires a body on camera. It's the same gesture
 * the product performs, surfaced as an ambient hero layer.
 *
 * WHY CANVAS (not SVG, not Framer Motion) — see PR 6.1 audit:
 *   • 33 joints + 35 bones ease their glow every frame around a moving focus; a
 *     single canvas redraw is far cheaper than mutating ~68 SVG nodes per frame.
 *   • Mirrors how the app renders its overlay (raster over a feed) — truthful.
 *   • Standing rule #2: NO Framer Motion in interactions. This is rAF + vanilla
 *     pointer listeners only. (Hero.tsx keeps FM for its entrance — allowed —
 *     but this new interaction must not use it.)
 *   • Sharpness (rule #1): the backing store is devicePixelRatio-scaled (capped
 *     at 2) so the wireframe is crisp, never soft. It is vector-drawn, not an
 *     image, so the blur audit is N/A by construction.
 *
 * PARITY + PERF (rules #4, #6, #8 + the Phase-4 budget):
 *   • Touch / no-hover (mobile = the largest surface) gets an equivalent moment:
 *     an idle "scan" sweep auto-acquires joints down the body, and a tap sets a
 *     temporary focus. The cursor path is a desktop enhancement layered on top.
 *   • prefers-reduced-motion / prefers-reduced-data → ONE calm static frame, no
 *     rAF loop, no pointer listeners. (The global CSS reduced-motion killswitch
 *     only covers CSS animation; a canvas loop has to opt out itself.)
 *   • A private IntersectionObserver pauses the loop whenever the hero scrolls
 *     off-screen (same philosophy as MotionGate, PR 4.4) so it never burns
 *     frames out of view. MotionGate can't help here — it only toggles CSS
 *     animation-play-state, which a canvas loop ignores.
 *   • Decorative → aria-hidden + pointer-events-none: it never eats a click; the
 *     cursor is read from window coordinates and mapped into the canvas.
 *   • shadowBlur (the neon glow) is applied ONLY to currently-active elements,
 *     keeping the common path cheap.
 * ──────────────────────────────────────────────────────────────────────────── */

// BlazePose GHUM — 33 landmarks, authored in a unit box (x → right, y → down) as
// a front-facing standing pose with the arms slightly out. Proportions are
// realistic (shoulder-span : height ≈ 1 : 4) so a single uniform scale renders a
// believable human figure. Indices follow the canonical BlazePose ordering.
const POSE: ReadonlyArray<readonly [number, number]> = [
  [0.5, 0.085], // 0  nose
  [0.515, 0.072], // 1  left eye (inner)
  [0.522, 0.072], // 2  left eye
  [0.529, 0.073], // 3  left eye (outer)
  [0.485, 0.072], // 4  right eye (inner)
  [0.478, 0.072], // 5  right eye
  [0.471, 0.073], // 6  right eye (outer)
  [0.54, 0.083], // 7  left ear
  [0.46, 0.083], // 8  right ear
  [0.512, 0.104], // 9  mouth (left)
  [0.488, 0.104], // 10 mouth (right)
  [0.605, 0.205], // 11 left shoulder
  [0.395, 0.205], // 12 right shoulder
  [0.66, 0.345], // 13 left elbow
  [0.34, 0.345], // 14 right elbow
  [0.7, 0.478], // 15 left wrist
  [0.3, 0.478], // 16 right wrist
  [0.716, 0.503], // 17 left pinky
  [0.284, 0.503], // 18 right pinky
  [0.705, 0.508], // 19 left index
  [0.295, 0.508], // 20 right index
  [0.69, 0.498], // 21 left thumb
  [0.31, 0.498], // 22 right thumb
  [0.56, 0.52], // 23 left hip
  [0.44, 0.52], // 24 right hip
  [0.57, 0.715], // 25 left knee
  [0.43, 0.715], // 26 right knee
  [0.576, 0.905], // 27 left ankle
  [0.424, 0.905], // 28 right ankle
  [0.572, 0.93], // 29 left heel
  [0.428, 0.93], // 30 right heel
  [0.612, 0.942], // 31 left foot index
  [0.388, 0.942], // 32 right foot index
];

// MediaPipe POSE_CONNECTIONS — the authoritative 35-edge skeleton graph.
const BONES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 7], // face — subject-left
  [0, 4], [4, 5], [5, 6], [6, 8], // face — subject-right
  [9, 10], // mouth
  [11, 12], // shoulders
  [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], // left arm + hand
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], // right arm + hand
  [11, 23], [12, 24], [23, 24], // torso
  [23, 25], [25, 27], [27, 29], [29, 31], [27, 31], // left leg + foot
  [24, 26], [26, 28], [28, 30], [30, 32], [28, 32], // right leg + foot
];

// Normalised bounding box of the authored pose, for exact centring.
const NX_MIN = 0.284, NX_MID = 0.5, NY_MIN = 0.072, NY_MID = 0.507, NY_SPAN = 0.87;

// ── Tunables — conservative defaults (this layer is intentionally an ambient
// backdrop, so being slightly off in scale/placement still reads as intentional
// texture; a real-browser eyeball can dial these up if more prominence is
// wanted). ────────────────────────────────────────────────────────────────────
const HEIGHT_FRAC = 0.9; // figure height ÷ canvas height
const LOCK_RADIUS_FRAC = 0.24; // detection radius ÷ figure height
const BASE_BONE_ALPHA = 0.17;
const BASE_JOINT_ALPHA = 0.32;
const POINTER_IDLE_MS = 2000; // cursor still this long → resume idle scan

type Pt = { x: number; y: number };
type RGB = readonly [number, number, number];
const VIOLET: RGB = [139, 102, 255];
const SCAN: RGB = [95, 227, 255];
const WHITE: RGB = [236, 240, 255];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export function SkeletonOverlay({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const STATIC =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(prefers-reduced-data: reduce)').matches;

    // Geometry (CSS px). pts = pixel landmark positions; act = eased activation.
    let W = 0, H = 0, figH = 0, lockR = 0;
    const pts: Pt[] = POSE.map(() => ({ x: 0, y: 0 }));
    const act: number[] = POSE.map(() => 0);

    const focus: Pt = { x: 0, y: 0 };
    let pointerActive = false;
    let lastPointer = 0;
    let intro = STATIC ? 1 : 0; // graceful fade-in of the whole layer
    let last = 0;

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Uniform scale so the y-span fills HEIGHT_FRAC of the canvas → no
      // distortion; centre the authored bbox in the canvas.
      const s = (H * HEIGHT_FRAC) / NY_SPAN;
      const ox = W / 2 - NX_MID * s;
      const oy = H / 2 - NY_MID * s;
      for (let i = 0; i < POSE.length; i++) {
        pts[i].x = ox + POSE[i][0] * s;
        pts[i].y = oy + POSE[i][1] * s;
      }
      figH = NY_SPAN * s;
      lockR = figH * LOCK_RADIUS_FRAC;
      if (focus.x === 0 && focus.y === 0) {
        focus.x = (pts[11].x + pts[12].x) / 2;
        focus.y = pts[11].y;
      }
    }

    function draw(now: number) {
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      if (W === 0 || H === 0) return;

      if (!STATIC) {
        intro += (1 - intro) * (1 - Math.exp(-dt / 600));
        // Resume the idle scan if the cursor has been still / left the hero.
        if (pointerActive && now - lastPointer > POINTER_IDLE_MS) pointerActive = false;
        // Idle "scan" focus: travels head→feet with a gentle sine, slight sway —
        // the auto-demo that gives touch / no-hover users an equivalent moment.
        if (!pointerActive) {
          const e = 0.5 - 0.5 * Math.cos(now * 0.00026 * Math.PI * 2);
          const fy = pts[0].y + (pts[31].y - pts[0].y) * e;
          const fx = W / 2 + Math.sin(now * 0.0006) * figH * 0.07;
          focus.x += (fx - focus.x) * (1 - Math.exp(-dt / 220));
          focus.y += (fy - focus.y) * (1 - Math.exp(-dt / 220));
        }
        // Ease each joint's activation toward its proximity target.
        for (let i = 0; i < pts.length; i++) {
          const d = Math.hypot(pts[i].x - focus.x, pts[i].y - focus.y);
          const target = smooth(clamp01(1 - d / lockR));
          act[i] += (target - act[i]) * (1 - Math.exp(-dt / 110));
        }
      }

      render(now);
    }

    function render(now: number) {
      ctx!.clearRect(0, 0, W, H);
      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';

      // Bones first (under the joints).
      for (const [a, b] of BONES) {
        const e = Math.max(act[a], act[b]);
        const col = mix(VIOLET, SCAN, e);
        if (e > 0.4) {
          ctx!.shadowColor = rgba(SCAN, 0.7 * intro);
          ctx!.shadowBlur = 14 * e;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.strokeStyle = rgba(col, (BASE_BONE_ALPHA + 0.72 * e) * intro);
        ctx!.lineWidth = 1.1 + 1.7 * e;
        ctx!.beginPath();
        ctx!.moveTo(pts[a].x, pts[a].y);
        ctx!.lineTo(pts[b].x, pts[b].y);
        ctx!.stroke();
      }
      ctx!.shadowBlur = 0;

      // Joints.
      let lockIdx = -1, lockVal = 0;
      for (let i = 0; i < pts.length; i++) {
        const a = act[i];
        if (a > lockVal) { lockVal = a; lockIdx = i; }
        const isFace = i <= 10;
        const r = (isFace ? 1.2 : 2.0) + 3.6 * a;
        const col = mix(mix(VIOLET, SCAN, a), WHITE, a * 0.55);
        if (a > 0.35) {
          ctx!.shadowColor = rgba(SCAN, 0.85 * intro);
          ctx!.shadowBlur = 10 + 13 * a;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.fillStyle = rgba(col, (BASE_JOINT_ALPHA + 0.68 * a) * intro);
        ctx!.beginPath();
        ctx!.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      // Tracking reticle on the most-locked joint — sells "pose detection lock".
      if (lockIdx >= 0 && lockVal > 0.55) {
        const p = pts[lockIdx];
        const rr = 9 + 4 * lockVal;
        const ang = now * 0.0006;
        ctx!.strokeStyle = rgba(SCAN, 0.7 * lockVal * intro);
        ctx!.lineWidth = 1.3;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, rr, 0, Math.PI * 2);
        ctx!.stroke();
        // four rotating corner ticks
        ctx!.beginPath();
        for (let k = 0; k < 4; k++) {
          const a0 = ang + (k * Math.PI) / 2;
          ctx!.moveTo(p.x + Math.cos(a0) * (rr + 2), p.y + Math.sin(a0) * (rr + 2));
          ctx!.lineTo(p.x + Math.cos(a0) * (rr + 6), p.y + Math.sin(a0) * (rr + 6));
        }
        ctx!.stroke();
      }
    }

    // ── Static path: one calm frame, no loop, no pointer listeners. ───────────
    if (STATIC) {
      layout();
      for (let i = 0; i < act.length; i++) {
        // Light the structural joints a touch more so the figure reads.
        act[i] = [11, 12, 23, 24, 25, 26].includes(i) ? 0.4 : 0.22;
      }
      render(performance.now());
      const ro = new ResizeObserver(() => {
        layout();
        render(performance.now());
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    // ── Animated path. ────────────────────────────────────────────────────────
    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === 'touch') return; // touch handled by tap + idle scan
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const m = lockR;
      if (x >= -m && x <= W + m && y >= -m && y <= H + m) {
        focus.x = x;
        focus.y = y;
        pointerActive = true;
        lastPointer = performance.now();
      } else {
        pointerActive = false;
      }
    }
    function onPointerDown(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const m = lockR;
      if (x >= -m && x <= W + m && y >= -m && y <= H + m) {
        focus.x = x;
        focus.y = y;
        pointerActive = true;
        lastPointer = performance.now();
      }
    }

    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    // Only spend frames while the hero is on screen (MotionGate philosophy,
    // but for the rAF loop MotionGate can't reach).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: '120px 0px' }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}

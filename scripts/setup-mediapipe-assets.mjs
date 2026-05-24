// ─────────────────────────────────────────────────────────────────────────────
// setup-mediapipe-assets — PR 6.3 (Live form-score demo)
//
// Self-hosts the BlazePose (MediaPipe) runtime so the live demo makes ZERO
// third-party requests at runtime — consistent with the site's privacy copy
// ("hiçbir kare/landmark Google'a gönderilmez, üçüncü tarafla paylaşılmaz") and
// with how next/font fetches Google Fonts at build and serves them from our own
// origin.
//
// Runs from `predev` / `prebuild` (see package.json), so the assets are present
// for both `next dev` and `next build`. Output lives under public/mediapipe/ and
// is gitignored (regenerated from the pinned @mediapipe/tasks-vision dependency +
// a build-time model fetch — nothing binary is committed to the repo).
//
//   • WASM: copied from the installed package (the SIMD build only — modern
//     browsers; pre-SIMD browsers fall through to the demo's graceful
//     "unsupported" state).
//   • Model: pose_landmarker_lite.task (BlazePose-lite, ~3 MB) — lite keeps the
//     download light for mobile parity. Fetched once, then cached on disk.
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wasmSrc = join(root, 'node_modules/@mediapipe/tasks-vision/wasm');
const wasmDst = join(root, 'public/mediapipe/wasm');
const modelDir = join(root, 'public/mediapipe/models');
const modelPath = join(modelDir, 'pose_landmarker_lite.task');

const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task';

// SIMD build only — keeps the self-hosted footprint to one ~11 MB binary.
const WASM_FILES = ['vision_wasm_internal.js', 'vision_wasm_internal.wasm'];

async function main() {
  if (!existsSync(wasmSrc)) {
    throw new Error(
      '@mediapipe/tasks-vision not installed — run `npm install` before this script.'
    );
  }

  await mkdir(wasmDst, { recursive: true });
  for (const f of WASM_FILES) {
    await copyFile(join(wasmSrc, f), join(wasmDst, f));
  }

  await mkdir(modelDir, { recursive: true });
  if (existsSync(modelPath)) {
    console.log('[mediapipe] assets already present — skipping model fetch.');
    return;
  }

  console.log('[mediapipe] fetching pose_landmarker_lite.task …');
  const res = await fetch(MODEL_URL);
  if (!res.ok) throw new Error(`model fetch failed: HTTP ${res.status}`);
  await writeFile(modelPath, Buffer.from(await res.arrayBuffer()));
  console.log('[mediapipe] assets ready.');
}

main().catch((err) => {
  console.error('[mediapipe] setup failed:', err.message);
  process.exit(1);
});

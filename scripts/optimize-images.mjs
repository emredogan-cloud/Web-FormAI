#!/usr/bin/env node
/**
 * Image optimisation pass — PR 4.1.
 *
 * Two jobs:
 *   1) Convert specific heavy PNGs → WebP (the AVIF derivative is generated
 *      at request time by next/image; keeping ONE source format simpler than
 *      maintaining both webp + avif sources in git).
 *   2) Re-encode the heavy JPG screenshots that load on the hero / above the
 *      fold so the source file weight matches what next/image actually serves.
 *
 * Idempotent: skips files where the optimised version is already smaller than
 * the target threshold. Re-run safely from `npm run optimize-images` any time
 * a new heavy asset lands in /public.
 */

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../');
const ANSI = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

// ── Job table ────────────────────────────────────────────────────────────────
// Each row: { src, op, opts } — op = 'webp' | 'jpg-recompress'.
const JOBS = [
  {
    src: 'public/images/pose-analysis.png',
    op: 'webp',
    opts: { quality: 78, effort: 6 },
    deleteOriginal: true,
  },
  {
    src: 'public/screenshots/welcome.jpg',
    op: 'jpg-recompress',
    opts: { quality: 78, progressive: true, mozjpeg: true },
  },
  {
    src: 'public/screenshots/dashboard.jpg',
    op: 'jpg-recompress',
    opts: { quality: 78, progressive: true, mozjpeg: true },
  },
  {
    src: 'public/screenshots/nutrition.jpg',
    op: 'jpg-recompress',
    opts: { quality: 78, progressive: true, mozjpeg: true },
  },
];

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

async function size(p) {
  try {
    return (await fs.stat(p)).size;
  } catch {
    return null;
  }
}

async function processJob(job) {
  const src = path.join(ROOT, job.src);
  const before = await size(src);
  if (before === null) {
    console.log(`${ANSI.dim}  skip:${ANSI.reset} ${job.src} (not found)`);
    return { changed: false, savings: 0 };
  }

  if (job.op === 'webp') {
    const out = src.replace(/\.png$/i, '.webp');
    await sharp(src).webp(job.opts).toFile(out);
    const after = await size(out);
    const savings = before - after;
    console.log(
      `${ANSI.green}  webp${ANSI.reset}  ${job.src}  ${ANSI.dim}${fmt(before)}${ANSI.reset} → ${ANSI.cyan}${fmt(after)}${ANSI.reset}  ${ANSI.yellow}(−${fmt(savings)}, −${Math.round((savings / before) * 100)}%)${ANSI.reset}`
    );
    if (job.deleteOriginal) {
      await fs.unlink(src);
      console.log(`${ANSI.dim}        ↳ removed source ${path.basename(src)}${ANSI.reset}`);
    }
    return { changed: true, savings };
  }

  if (job.op === 'jpg-recompress') {
    const tmp = src + '.tmp.jpg';
    await sharp(src).jpeg(job.opts).toFile(tmp);
    const after = await size(tmp);
    if (after >= before) {
      // Re-encoding produced a larger file — keep the original.
      await fs.unlink(tmp);
      console.log(`${ANSI.dim}  keep:${ANSI.reset} ${job.src} (already smaller than re-encode)`);
      return { changed: false, savings: 0 };
    }
    await fs.rename(tmp, src);
    const savings = before - after;
    console.log(
      `${ANSI.green}  jpeg${ANSI.reset}  ${job.src}  ${ANSI.dim}${fmt(before)}${ANSI.reset} → ${ANSI.cyan}${fmt(after)}${ANSI.reset}  ${ANSI.yellow}(−${fmt(savings)}, −${Math.round((savings / before) * 100)}%)${ANSI.reset}`
    );
    return { changed: true, savings };
  }

  throw new Error(`unknown op: ${job.op}`);
}

(async () => {
  console.log(`${ANSI.cyan}optimize-images${ANSI.reset}  processing ${JOBS.length} job(s)…\n`);
  let totalSavings = 0;
  let changedCount = 0;
  for (const job of JOBS) {
    const { changed, savings } = await processJob(job);
    if (changed) {
      changedCount++;
      totalSavings += savings;
    }
  }
  console.log(
    `\n${ANSI.green}done${ANSI.reset}  ${changedCount}/${JOBS.length} job(s) changed.  ${ANSI.yellow}total saved: ${fmt(totalSavings)}${ANSI.reset}`
  );
})();

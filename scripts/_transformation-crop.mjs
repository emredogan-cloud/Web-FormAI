#!/usr/bin/env node
// MP.4 one-off — pre-crop the transformation pair to central-figure portraits.
// The FormAI app source webps are 2816×1536 with a peripheral card overlay on
// the right side. Cropping to the central 1100×1536 region removes the
// distraction and concentrates the visible pixel-budget on the figure.
//
// After this PR, future maintenance can re-run via `npm run transformation`.

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../');
const FORMAI = '/home/emre/Downloads/FormAI-FitnessKoçu/photos';

const PAIRS = [
  {
    src: `${FORMAI}/kişiselleştirilmişplandabugünkühalERKEK.webp`,
    dst: 'public/images/transformation-before.webp',
  },
  {
    src: `${FORMAI}/kişiselleştirilmiş planda30.günERKEK.webp`,
    dst: 'public/images/transformation-after.webp',
  },
];

const CROP_W = 1100;

for (const { src, dst } of PAIRS) {
  const meta = await sharp(src).metadata();
  if (!meta.width || !meta.height) {
    console.error(`! missing dims on ${src}`);
    continue;
  }
  const dstAbs = path.join(ROOT, dst);
  const cropX = Math.floor((meta.width - CROP_W) / 2);
  await sharp(src)
    .extract({ left: cropX, top: 0, width: CROP_W, height: meta.height })
    .webp({ quality: 92, effort: 6 })
    .toFile(dstAbs);
  const size = fs.statSync(dstAbs).size;
  console.log(
    `  ${dst.split('/').pop().padEnd(32)} ${CROP_W}x${meta.height}  ${(size / 1024).toFixed(0)} KB`
  );
}

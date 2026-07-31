/**
 * Resize the raster assets in `src/assets` down to the widths they are actually
 * displayed at (roughly 2x the CSS width, for retina).
 *
 * This complements `vite-plugin-image-optimizer`, which recompresses on every
 * build but never *resizes* — a 3200px source stays 3200px no matter how hard
 * it is quantized. Resizing is where the real savings are.
 *
 * Safe to re-run: a file is skipped when it is already at or below its target
 * width, so repeated runs never re-encode (and never accumulate generation loss).
 *
 *   yarn optimize:images          # rewrite anything oversized
 *   yarn optimize:images --dry    # report only, touch nothing
 */
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets");
const DRY_RUN = process.argv.includes("--dry");

/**
 * Target width per asset, derived from the widest container each image renders
 * in (x2 for retina). Anything not listed here is left alone.
 *
 * The .avif files (bells, ripped, mobileGear) are deliberately absent: they are
 * already at or under their display size, and re-encoding AVIF is slow and
 * gains nothing.
 */
const TARGETS = {
  // Home hero — full-bleed, and the LCP element. Stays at 1920.
  "hero-image.jpg": 1920,
  "hero-image.webp": 1920,
  // Shop hero — full-bleed inside a max-w container.
  "pexels-franki-frank-11513151.jpg": 1440,
  "pexels-franki-frank-11513151.webp": 1440,
  // Advert banner — CSS background, full-bleed (no max-w wrapper), so it has to
  // cover a 1920 viewport without upscaling.
  "BeltHeader_1a.webp": 1920,
  // Brand-story card — container tops out around 700px.
  "pexels-823sl-2294361.webp": 1200,
  // Category cards — container is 2xl:w-[400px].
  "belt.webp": 800,
  "tape-roll.webp": 800,
  "sleeves.webp": 800,
  "lifting-strap.webp": 800,
};

/** Encoder (sharp format name + settings) per file extension. */
const ENCODE = {
  ".webp": ["webp", { quality: 80, effort: 6 }],
  ".jpg": ["jpeg", { quality: 82, mozjpeg: true }],
  ".jpeg": ["jpeg", { quality: 82, mozjpeg: true }],
  // `quality` only applies to PNG when `palette` is on — without it sharp
  // encodes lossless and silently ignores the setting.
  ".png": ["png", { quality: 80, palette: true, compressionLevel: 9 }],
};

/**
 * Second pass: derived `-sm` variants for images that are ALSO used somewhere
 * much smaller than their primary use.
 *
 * The brand-story cards render these at roughly 380 CSS px on a phone, but each
 * file is sized for a full-bleed hero or a desktop card. One file cannot serve
 * both, so the component picks per breakpoint with <picture media>. Unlike the
 * TARGETS pass above this writes a *new* file rather than resizing in place —
 * the originals are still needed at full size elsewhere.
 *
 * 760px = ~380 CSS px at 2x DPR.
 */
const CARD_VARIANT_WIDTH = 760;
const CARD_VARIANTS = [
  "pexels-823sl-2294361.webp",
  "hero-image.webp",
  "pexels-franki-frank-11513151.webp",
  "bells.avif",
  "BeltHeader_1a.webp",
  // mobileGear.avif is deliberately absent: at 687px it is already narrower
  // than the variant width, and it doubles as the *mobile* shop hero, where it
  // is if anything under-sized.
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

let totalBefore = 0;
let totalAfter = 0;
let resized = 0;

for (const [name, targetWidth] of Object.entries(TARGETS)) {
  const file = join(ASSETS, name);

  let before;
  try {
    before = (await stat(file)).size;
  } catch {
    console.log(`  ??  ${name} — not found, skipping`);
    continue;
  }

  // Read into a buffer first: sharp cannot stream a file into itself.
  const input = await readFile(file);
  const { width } = await sharp(input).metadata();

  totalBefore += before;

  if (width <= targetWidth) {
    totalAfter += before;
    console.log(`  ok  ${name} — ${width}px, already <= ${targetWidth}px`);
    continue;
  }

  const encoder = ENCODE[extname(name).toLowerCase()];
  if (!encoder) {
    totalAfter += before;
    console.log(`  ??  ${name} — no encoder for this extension, skipping`);
    continue;
  }
  const [format, options] = encoder;

  const output = await sharp(input)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .toFormat(format, options)
    .toBuffer();

  if (!DRY_RUN) await writeFile(file, output);

  totalAfter += output.length;
  resized += 1;
  const saved = Math.round((1 - output.length / before) * 100);
  console.log(
    `  ->  ${name} — ${width}px ${kb(before)}  ⭢  ${targetWidth}px ${kb(output.length)}  (-${saved}%)`,
  );
}

const label = DRY_RUN ? "would resize" : "resized";
console.log(
  `\n${label} ${resized} file(s): ${kb(totalBefore)} ⭢ ${kb(totalAfter)} ` +
    `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
);

console.log(`\n-- card variants (${CARD_VARIANT_WIDTH}px, for mobile) --`);
let variantBefore = 0;
let variantAfter = 0;

for (const name of CARD_VARIANTS) {
  const source = join(ASSETS, name);
  const ext = extname(name).toLowerCase();
  const target = join(ASSETS, name.replace(ext, `-sm${ext}`));

  const input = await readFile(source);
  const { width } = await sharp(input).metadata();
  variantBefore += input.length;

  if (width <= CARD_VARIANT_WIDTH) {
    console.log(`  ok  ${name} — ${width}px, no smaller variant needed`);
    continue;
  }

  const resizer = sharp(input).resize({ width: CARD_VARIANT_WIDTH });
  const output =
    ext === ".avif"
      ? await resizer.avif({ quality: 60, effort: 6 }).toBuffer()
      : await resizer.webp({ quality: 78, effort: 6 }).toBuffer();

  if (!DRY_RUN) await writeFile(target, output);
  variantAfter += output.length;

  const saved = Math.round((1 - output.length / input.length) * 100);
  console.log(
    `  ->  ${name} — ${width}px ${kb(input.length)}  ⭢  ${CARD_VARIANT_WIDTH}px ` +
      `${kb(output.length)}  (-${saved}%)`,
  );
}

console.log(
  `\nmobile card payload: ${kb(variantBefore)} ⭢ ${kb(variantAfter)} ` +
    `(-${Math.round((1 - variantAfter / variantBefore) * 100)}%)`,
);

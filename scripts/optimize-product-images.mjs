/**
 * Resizes the product images in Supabase Storage down to the size they are
 * actually displayed at.
 *
 * They are stored at 1200x1200 (some 1000/600) but render at 224-256px on cards
 * and at most 512px on the product detail page. Supabase's on-the-fly image
 * transforms would be the clean fix, but they are a paid feature and this
 * project's tenant returns `FeatureNotEnabled` — so the files themselves have to
 * be replaced.
 *
 * Target is 768px, not 512: cards only need 512 (256 CSS px at 2x DPR), but the
 * detail page's main image goes up to `max-w-lg` = 512 CSS px, which would then
 * render 1x and look soft on a retina screen. 768 keeps that page sharp and
 * still removes about two thirds of the bytes.
 *
 *   node scripts/optimize-product-images.mjs            # download + resize only
 *   node scripts/optimize-product-images.mjs --upload   # also overwrite Storage
 *
 * The upload step needs SUPABASE_SECRET_KEY in .env (a new-style `sb_secret_…`
 * key from Project Settings -> API Keys, the replacement for the retired
 * `service_role` JWT). The publishable key cannot write to Storage under RLS,
 * by design. Uploads overwrite in place, so the URLs in the `product` table stay
 * valid and nothing in the database changes.
 *
 * Originals are always saved to product-images-backup/original first, and the
 * upload refuses to run if that backup is missing.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BACKUP = join(ROOT, "product-images-backup", "original");
const OUTPUT = join(ROOT, "product-images-backup", "optimized");

const TARGET_WIDTH = 768;
const QUALITY = 78;
/** One year. The current objects are served with max-age=3600. */
const CACHE_CONTROL = "31536000";

const UPLOAD = process.argv.includes("--upload");

/** Minimal .env reader — no dependency, and it never prints values. */
const env = Object.fromEntries(
  readFileSync(join(ROOT, ".env"), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    }),
);

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const READ_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;
/** New-style `sb_secret_…` key. The legacy `service_role` JWT is retired. */
const WRITE_KEY = env.SUPABASE_SECRET_KEY;

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;

mkdirSync(BACKUP, { recursive: true });
mkdirSync(OUTPUT, { recursive: true });

// ---- 1. Which images does the catalogue actually reference? -----------------
const res = await fetch(`${SUPABASE_URL}/rest/v1/product?select=id,image_url`, {
  headers: { apikey: READ_KEY, Authorization: `Bearer ${READ_KEY}` },
});
const products = await res.json();
if (!Array.isArray(products)) {
  throw new Error(`Could not read products: ${JSON.stringify(products).slice(0, 200)}`);
}

const urls = [...new Set(products.flatMap((p) => p.image_url ?? []))];
console.log(`${products.length} products, ${urls.length} distinct images\n`);

// ---- 2. Download originals (once) and resize -------------------------------
let totalBefore = 0;
let totalAfter = 0;
const results = [];

for (const url of urls) {
  const name = decodeURIComponent(url.split("/").pop());
  const backupPath = join(BACKUP, name);

  if (!existsSync(backupPath)) {
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    writeFileSync(backupPath, buf);
  }

  const original = readFileSync(backupPath);
  const { width } = await sharp(original).metadata();

  let pipeline = sharp(original);
  if (width > TARGET_WIDTH) {
    pipeline = pipeline.resize(TARGET_WIDTH, TARGET_WIDTH, { fit: "inside" });
  }
  const optimized = await pipeline.webp({ quality: QUALITY, effort: 6 }).toBuffer();

  // Same object path as the original, so the stored URL keeps working. The
  // extension may now say .jpg while the bytes are WebP — harmless, because the
  // Content-Type header is what browsers actually obey.
  const objectPath = decodeURIComponent(url.split("/object/public/")[1]);
  writeFileSync(join(OUTPUT, name), optimized);

  totalBefore += original.length;
  totalAfter += optimized.length;
  results.push({ name, objectPath, optimized, before: original.length });

  console.log(
    `  ${width}px ${kb(original.length).padStart(9)}  ->  ` +
      `${Math.min(width, TARGET_WIDTH)}px ${kb(optimized.length).padStart(9)}   ${name}`,
  );
}

console.log(
  `\ntotal: ${kb(totalBefore)} -> ${kb(totalAfter)} ` +
    `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
);
console.log(`originals backed up to product-images-backup/original (${readdirSync(BACKUP).length} files)`);

// ---- 3. Upload, only when explicitly asked ---------------------------------
if (!UPLOAD) {
  console.log("\nDry run. Nothing in Supabase was touched. Re-run with --upload to replace.");
  process.exit(0);
}

if (!WRITE_KEY) {
  console.error(
    "\nSUPABASE_SECRET_KEY is missing from .env — cannot write to Storage." +
      "\nGet an `sb_secret_…` key from Project Settings -> API Keys.",
  );
  process.exit(1);
}
if (readdirSync(BACKUP).length !== urls.length) {
  console.error("\nBackup is incomplete — refusing to overwrite. Re-run without --upload first.");
  process.exit(1);
}

console.log(`\nOverwriting ${results.length} objects in Storage...`);
let ok = 0;
for (const r of results) {
  const put = await fetch(`${SUPABASE_URL}/storage/v1/object/${r.objectPath}`, {
    method: "PUT",
    headers: {
      apikey: WRITE_KEY,
      Authorization: `Bearer ${WRITE_KEY}`,
      "Content-Type": "image/webp",
      "Cache-Control": `max-age=${CACHE_CONTROL}`,
      "x-upsert": "true",
    },
    body: r.optimized,
  });
  if (put.ok) {
    ok += 1;
  } else {
    console.error(`  FAILED ${r.name}: ${put.status} ${(await put.text()).slice(0, 120)}`);
  }
}
console.log(`\nreplaced ${ok}/${results.length} objects, cache-control max-age=${CACHE_CONTROL}`);

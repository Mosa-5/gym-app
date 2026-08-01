import { describe, it, expect } from "vitest";
import { productSrcSet } from "./productImage";

/**
 * These tests exist because the `-sm` naming is a contract between two things
 * that cannot see each other: this module derives the URL in the browser, and
 * `scripts/optimize-product-images.mjs` derives the object path when uploading.
 * If they ever disagree, the small candidate 404s — and a failed srcset
 * candidate renders as a broken image rather than falling back to `src`.
 *
 * Nothing but a comment enforced that agreement before.
 */

/** Mirrors the transform in scripts/optimize-product-images.mjs. */
const scriptSideObjectPath = (path: string) =>
  path.replace(/(\.[a-z0-9]+)$/i, "-sm$1");

const BASE = "https://x.supabase.co/storage/v1/object/public/product_images/";

describe("productSrcSet", () => {
  it("offers the small candidate at 384w and the full one at 768w", () => {
    expect(productSrcSet(`${BASE}belt.webp`)).to.equal(
      `${BASE}belt-sm.webp 384w, ${BASE}belt.webp 768w`,
    );
  });

  it("puts -sm before the extension, not at the end of the URL", () => {
    expect(productSrcSet(`${BASE}belt.webp`)).to.include("belt-sm.webp");
    expect(productSrcSet(`${BASE}belt.webp`)).not.to.include("belt.webp-sm");
  });

  it.each([
    "10mm-lever-belt-navy-main.webp",
    // Real filenames from the bucket: a UUID suffix full of hyphens and digits,
    // and a .jpg whose bytes are actually WebP.
    "lifting-straps-lilac-main_0f080f9b-f259-4e76-96f5-1991b17d0391.webp",
    "skull-tape-black-stacked-trio.jpg",
    "Knee-Sleeve-Black-Black-side-by-side.webp",
  ])("agrees with the upload script for %s", (filename) => {
    const small = productSrcSet(BASE + filename).split(" ")[0];
    const fromScript = BASE + scriptSideObjectPath(filename);

    expect(small).to.equal(fromScript);
  });

  it("leaves a query string after the extension alone", () => {
    const small = productSrcSet(`${BASE}belt.webp?v=2`).split(" ")[0];

    expect(small).to.equal(`${BASE}belt-sm.webp?v=2`);
  });
});

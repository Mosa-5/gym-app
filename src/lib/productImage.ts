/**
 * Responsive sources for product images stored in Supabase Storage.
 *
 * Supabase's on-the-fly image transforms are a paid feature and this project's
 * tenant returns `FeatureNotEnabled`, so there is no URL parameter that resizes.
 * Instead `scripts/optimize-product-images.mjs` uploads two files per product
 * image and the smaller one is derived from the larger one's URL:
 *
 *   .../product_images/belt-navy.webp       768px
 *   .../product_images/belt-navy-sm.webp    384px
 *
 * The `-sm` suffix convention is shared with that script. If one changes, both
 * must.
 */

/** 768px, the width uploaded for the full-size file. */
const FULL_WIDTH = 768;
/** 384px, the width uploaded for the `-sm` file. */
const SMALL_WIDTH = 384;

/** `foo.webp` -> `foo-sm.webp`, leaving any query string alone. */
const smVariant = (url: string) =>
  url.replace(/(\.[a-z0-9]+)(\?|$)/i, "-sm$1$2");

/**
 * Builds the `srcSet` for a product image. Pair it with a `sizes` value that
 * describes the slot's CSS width at each breakpoint — the browser multiplies
 * that by the device pixel ratio to choose, so an inaccurate `sizes` will pick
 * the wrong file however correct the srcset is.
 */
export const productSrcSet = (url: string) =>
  `${smVariant(url)} ${SMALL_WIDTH}w, ${url} ${FULL_WIDTH}w`;

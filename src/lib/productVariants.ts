/**
 * Colour options are separate rows in `product`, tied together by
 * `variant_group` and labelled by `color` (both added 2026-09-30). The
 * frontend only supplies presentation: the swatch fill here, and the
 * translated colour names under `colors.*` in the locale files.
 */

/**
 * Swatch fills for the colour words in the catalogue. A colour that isn't here
 * still works — the swatch falls back to a text chip — so adding a colour to
 * the database doesn't require touching this map first.
 *
 * These are approximations of the product photos, not sampled from them.
 */
const SWATCHES: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f2f2f2",
  gray: "#808080",
  navy: "#1f2a44",
  red: "#c42b2b",
  green: "#3f7d3f",
  tan: "#d2b48c",
  lilac: "#c8a2c8",
};

/** The swatch fill for a colour word, or undefined if it has no entry. */
export const swatchFor = (color: string): string | undefined =>
  SWATCHES[color.toLowerCase()];

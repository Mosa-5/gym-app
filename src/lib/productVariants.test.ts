import { describe, it, expect } from "vitest";
import { swatchFor } from "./productVariants";

/**
 * The colour words come from the `color` column, so this map is the one place
 * the frontend has to keep in step with the data. A colour in the catalogue
 * with no entry here renders as a text chip instead of a swatch — readable,
 * but not what the design intends.
 */

describe("swatchFor", () => {
  it.each(["black", "white", "gray", "navy", "red", "green", "tan", "lilac"])(
    "has a swatch for %s, a colour in the catalogue",
    (color) => {
      expect(swatchFor(color)).to.match(/^#[0-9a-f]{6}$/i);
    },
  );

  it("returns undefined for an unknown colour so the UI can fall back", () => {
    expect(swatchFor("chartreuse")).to.equal(undefined);
  });

  it("matches regardless of the case stored in the database", () => {
    expect(swatchFor("Navy")).to.equal(swatchFor("navy"));
  });
});

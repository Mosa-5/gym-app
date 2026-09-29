import { cva } from "class-variance-authority";

export const heroSectionClass = cva([
  "relative overflow-hidden bg-black text-white flex items-center sm:items-end",
  // Mobile uses svh, not vh: on iOS/Android `vh` measures the viewport with the
  // browser chrome *hidden*, so 94vh renders taller than what's actually on
  // screen and the bottom of the hero sits under the URL bar. `svh` is the
  // small (chrome-visible) viewport, so it always fits. 88 rather than 94 also
  // leaves the next section peeking, which is the scroll cue. From sm: up there
  // is no dynamic chrome, so svh and vh are identical and vh is used.
  "h-[88svh] sm:h-[94vh]",
  "pb-0 sm:pb-20 md:pb-28 2xl:pb-40",
]);

export const overlayClass = cva([
  "absolute inset-0 bg-gradient-to-t",
  "from-black via-black/70 to-black/30",
  "sm:from-black sm:via-black/60 sm:to-black/20",
]);

export const contentClass = cva([
  "relative z-10 w-full mx-auto",
  "max-w-screen-xl 2xl:max-w-[1560px]",
  "px-5 sm:px-6 md:px-10 2xl:px-16",
  "text-center sm:text-left",
]);

export const headingClass = cva([
  "text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[110px]",
  "font-black uppercase leading-[0.9] tracking-tight",
  // Georgian has taller glyphs, so it needs more leading. Its words are also
  // longer, so it grows less than Latin (90px max instead of 110px). sm and md
  // stay put: there "ივარჯიშე დიდხანს" is already about as wide as the screen.
  "ka:leading-[1.2] ka:text-[52px] ka:sm:text-6xl ka:md:text-7xl",
  "ka:lg:text-[80px] ka:2xl:text-[90px]",
]);

/**
 * Clips the rotating word so it slides in from below and out the top.
 * The small vertical padding keeps Georgian ascenders and descenders, which
 * poke outside the line box, from being cut off by the clip.
 */
export const rotatingWordClass = cva([
  // align-baseline lines the word up with "LIFT" beside it. An inline-flex
  // box's baseline is its text's baseline, so the clip padding doesn't move it
  // (align-bottom did: it aligned the padded box edge, dropping the word).
  "relative inline-flex overflow-hidden align-baseline",
  "py-[0.06em] -my-[0.06em]",
  // Georgian letters like ფ and უ hang much further below the baseline than
  // Latin capitals, so 0.06em clipped them. The matching negative margin keeps
  // the headline's line spacing unchanged; only the clip area grows.
  "ka:py-[0.25em] ka:-my-[0.25em]",
  // Black fill with a white outline instead of red, so the CTA stays the only
  // red on screen. The stroke scales with the font size but never drops below
  // 1.5px, where it would vanish at the mobile size.
  "text-black [-webkit-text-stroke:max(1.5px,0.02em)_white]",
]);

export const paragraphClass = cva([
  "mt-3 sm:mt-6 ka:mt-5 ka:sm:mt-9 mx-auto sm:mx-0",
  "text-sm md:text-base 2xl:text-lg",
  "leading-relaxed text-neutral-400",
  // Wide enough to sit under the one-line heading without looking stubby, but
  // capped around 70 characters per line so it stays easy to read. Georgian
  // uses the same widths (it used to be pinned to max-w-md at every size).
  "max-w-sm sm:max-w-lg lg:max-w-xl 2xl:max-w-2xl",
]);

export const buttonContainerClass = cva(
  "mt-5 sm:mt-6 flex gap-4 justify-center sm:justify-start",
);

// Pill shape to match the site's other CTAs (About's ctaButton, place order).
export const buttonClass = cva([
  "group inline-flex items-center gap-3 rounded-full",
  "px-8 py-4 2xl:px-10 2xl:py-5",
  "bg-brand hover:bg-brand-hover text-white",
  "font-bold text-xs 2xl:text-sm uppercase tracking-wider",
  // Georgian has no capitals, so at the same size its label looks a step
  // smaller than the uppercase English one. One size up evens them out.
  "ka:text-sm ka:2xl:text-base",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
]);

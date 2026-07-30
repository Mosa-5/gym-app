import { cva } from "class-variance-authority";

export const heroSectionClass = cva([
  "relative bg-black text-white flex items-center sm:items-end",
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

export const subtitleClass = cva([
  "text-sm sm:text-lg md:text-2xl 2xl:text-3xl",
  "font-semibold uppercase tracking-[0.25em] text-neutral-300",
]);

export const headingClass = cva([
  "text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[110px]",
  "font-black uppercase leading-[0.9] tracking-tight",
  "ka:leading-[1.2] ka:text-7xl",
]);

export const paragraphClass = cva([
  "mt-3 sm:mt-6 mx-auto sm:mx-0",
  "text-sm md:text-base 2xl:text-lg ka:md:text-sm",
  "leading-relaxed text-neutral-400",
  "max-w-xs sm:max-w-sm 2xl:max-w-md ka:max-w-md",
]);

export const buttonContainerClass = cva(
  "mt-5 sm:mt-6 flex gap-4 justify-center sm:justify-start",
);

/**
 * Scroll cue, pinned to the bottom centre of the hero.
 *
 * Desktop/tablet only: on mobile the hero is deliberately 88svh so the next
 * section already peeks above the fold, which is a stronger cue than an icon.
 *
 * `z-10` matches the hero's text content, which also sits above the `hero-cover`
 * fade — so the cue behaves like the copy, not like the image.
 */
export const scrollCueClass = cva([
  "hidden md:flex absolute z-10",
  "bottom-6 2xl:bottom-10 left-1/2 -translate-x-1/2",
  "flex-col items-center gap-2",
  "text-neutral-400",
]);

export const scrollCueLabelClass = cva([
  "text-[10px] 2xl:text-xs",
  "font-semibold uppercase tracking-[0.25em]",
]);

export const buttonClass = cva([
  "flex items-center gap-2 rounded-full",
  "px-7 py-3.5 2xl:px-9 2xl:py-5",
  "bg-brand hover:bg-brand-hover text-white",
  "font-bold text-xs 2xl:text-sm uppercase tracking-wider",
  "border border-neutral-700/50 transition-all duration-200",
]);

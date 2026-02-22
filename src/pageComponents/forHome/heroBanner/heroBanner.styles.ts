import { cva } from "class-variance-authority";

export const heroSectionClass = cva(
  "relative bg-black text-white h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center sm:items-end pb-0 sm:pb-20 md:pb-28",
);
export const overlayClass = cva(
  "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 sm:from-black sm:via-black/60 sm:to-black/20",
);
export const contentClass = cva(
  "relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-6 md:px-10 text-center sm:text-left",
);
export const subtitleClass = cva(
  "text-sm sm:text-lg md:text-2xl font-medium italic tracking-wide text-neutral-300",
);
export const headingClass = cva(
  "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight",
);
export const paragraphClass = cva(
  "mt-3 sm:mt-4 text-sm md:text-base italic text-neutral-400 max-w-xs sm:max-w-sm mx-auto sm:mx-0",
);
export const buttonContainerClass = cva(
  "mt-5 sm:mt-6 flex gap-4 justify-center sm:justify-start",
);
export const buttonClass = cva(
  "bg-brand hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider rounded-full px-7 py-3.5 transition-all duration-200 flex items-center gap-2 border border-neutral-700/50",
);

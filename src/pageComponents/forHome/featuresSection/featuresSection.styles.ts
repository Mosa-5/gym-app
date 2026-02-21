import { cva } from "class-variance-authority";

export const sectionClass = cva(
  "py-10 sm:py-14 bg-neutral-950 border-t border-neutral-800/50",
);
export const containerClass = cva(
  "container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 max-w-6xl",
);
export const featureClass = cva(
  "flex flex-col items-center text-center gap-3 sm:gap-4",
);
export const iconClass = cva(
  "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center",
);
export const titleClass = cva(
  "font-semibold text-sm sm:text-base text-white tracking-wide",
);

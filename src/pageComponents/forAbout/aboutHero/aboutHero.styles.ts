import { cva } from "class-variance-authority";

export const banner = cva(
  "relative bg-black text-white h-[55vh] md:h-[65vh] flex items-end pb-16 md:pb-20",
);
export const bannerInner = cva(
  "absolute inset-0 bg-cover bg-center bg-no-repeat",
);
export const overlay = cva(
  "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20",
);
export const content = cva(
  "relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10",
);
export const subtitle = cva(
  "text-base md:text-lg font-medium italic tracking-wide text-neutral-300",
);
export const heading = cva(
  "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight",
);
export const paragraph = cva(
  "mt-4 text-sm md:text-base italic text-neutral-400 max-w-lg",
);

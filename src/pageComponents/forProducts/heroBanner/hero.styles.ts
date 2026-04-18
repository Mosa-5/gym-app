import { cva } from "class-variance-authority";

export const banner = cva(
  "relative bg-black text-white overflow-hidden h-[50vh] md:h-[60vh] 2xl:h-[65vh] flex items-end pb-16 md:pb-20 2xl:pb-28",
);
export const bannerInner = cva(
  "absolute inset-0 bg-cover bg-center bg-no-repeat",
);
export const overlay = cva(
  "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20",
);
export const content = cva(
  "relative z-10 w-full max-w-screen-xl 2xl:max-w-[1560px] mx-auto px-6 md:px-10 2xl:px-16",
);
export const subtitle = cva(
  "text-base md:text-lg 2xl:text-2xl font-medium italic tracking-wide text-neutral-300",
);
export const heading = cva(
  "text-3xl py-1 sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[100px] ka:lg:text-6xl font-black uppercase leading-[0.9] ka:leading-[1.2] tracking-tight",
);
export const paragraph = cva(
  "mt-4 text-sm md:text-base 2xl:text-lg ka:md:text-sm italic text-neutral-400 max-w-md 2xl:max-w-xl",
);

import { cva } from "class-variance-authority";

export const heroSectionClass = cva(
  "bg-neutral-950 py-12 2xl:py-16 px-6 2xl:px-8",
);

export const heroInnerClass = cva("max-w-screen-lg 2xl:max-w-[1400px] mx-auto");

export const heroTitleClass = cva([
  "text-2xl sm:text-3xl 2xl:text-4xl",
  "font-black uppercase tracking-tight text-white",
]);

export const heroSubtitleClass = cva("text-sm 2xl:text-base text-neutral-400");

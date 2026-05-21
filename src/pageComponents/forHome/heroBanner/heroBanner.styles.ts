import { cva } from "class-variance-authority";

export const heroSectionClass = cva([
  "relative bg-black text-white flex items-center sm:items-end",
  "h-[70vh] sm:h-[80vh] md:h-[90vh] 2xl:h-[92vh]",
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

export const buttonClass = cva([
  "flex items-center gap-2 rounded-full",
  "px-7 py-3.5 2xl:px-9 2xl:py-5",
  "bg-brand hover:bg-brand-hover text-white",
  "font-bold text-xs 2xl:text-sm uppercase tracking-wider",
  "border border-neutral-700/50 transition-all duration-200",
]);

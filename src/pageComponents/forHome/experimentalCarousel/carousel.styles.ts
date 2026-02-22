import { cva } from "class-variance-authority";

export const wrapper = cva(
  "relative flex flex-col gap-7 justify-center items-center py-16 sm:py-20 lg:py-24 overflow-hidden",
);

export const heading = cva(
  "text-xl md:text-3xl mb-5 font-bold dark:text-white tracking-widest uppercase",
);

export const carousel = cva("w-[70%] sm:w-[85%] lg:w-[80%] max-w-5xl");

export const carouselItem = cva(
  "md:basis-1/2 lg:basis-1/3 py-4 flex justify-center transition-all duration-300",
);

export const image = cva(
  "h-64 border-2 object-contain mb-2 border-spacing-1 border-black shadow-sm rounded-full transition-all duration-300",
);

export const productName = cva("text-sm font-medium text-center");

export const productPrice = cva("text-sm font-semibold");

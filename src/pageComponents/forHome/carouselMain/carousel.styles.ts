import { cva } from "class-variance-authority";

export const wrapper = cva([
  "flex flex-col gap-7 justify-center items-center",
  "mt-10 sm:mt-16 lg:mt-20 2xl:mt-28",
  "mb-10 sm:mb-16 lg:mb-20 2xl:mb-28",
]);

export const heading = cva([
  "text-xl md:text-3xl mb-5",
  "font-bold dark:text-white tracking-widest uppercase",
]);

export const carousel = cva([
  "w-[97%] sm:w-[85%] lg:w-[80%] 2xl:w-[90%]",
  "max-w-5xl 2xl:max-w-[1560px]",
]);

export const carouselItem = cva([
  "basis-[56%] sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4",
  "pl-0 sm:pl-4 py-4",
]);

export const card = cva([
  "group relative overflow-hidden cursor-pointer",
  "min-h-[340px] lg:min-h-[432px] 2xl:min-h-[480px]",
  "transition-transform duration-300 ease-out sm:hover:-translate-y-3",
]);

export const cardContent = cva([
  "flex flex-col gap-2 lg:gap-3 items-center",
  "p-4 pb-5 sm:pb-6 2xl:p-6 2xl:pb-8",
]);

export const image = cva([
  // `w-auto` is load-bearing. The <img> carries width/height attributes for the
  // aspect ratio (CLS), but those attributes are ALSO presentational hints that
  // set `width: 768px`. Nothing in Tailwind's preflight sets `width`, so without
  // an explicit rule here the hint wins, the element stretches to its container,
  // and `rounded-full` turns into an ellipse with the image letterboxed inside.
  "h-36 sm:h-40 lg:h-56 2xl:h-72 w-auto object-contain rounded-full",
  "mb-5 sm:mb-6 lg:mb-10",
]);

export const productName = cva([
  "text-sm 2xl:text-base font-semibold text-center",
  "tracking-wide text-white",
]);

export const productPrice = cva("text-base 2xl:text-xl font-black text-white");

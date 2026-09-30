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
  // A fixed gutter on phones rather than the old `w-[97%]`, whose 1.5% margin
  // grew with the screen (~6px at 375, ~10px at 639). From sm: up the width
  // percentages already inset the track, so the padding comes back off.
  "w-full px-4 sm:px-0",
  "sm:w-[85%] lg:w-[80%] 2xl:w-[90%]",
  "max-w-5xl 2xl:max-w-[1560px]",
]);

export const carouselItem = cva([
  "basis-[56%] sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4",
  "pl-0 sm:pl-4 py-4",
  // A percentage basis drifts a long way inside one breakpoint band — at 1023px
  // half the track is 435px, so two cards filled the row and then halved at lg.
  // The cap holds them steady below lg and lets the spare width show more of
  // the next card instead; the floor keeps them from being cramped at lg, where
  // a third of the track is only ~273px.
  //
  // Both go on the slide rather than the card because CarouselItem is
  // `min-w-0 shrink-0 grow-0`: it is exactly its basis, so a card sized past it
  // would overflow onto its neighbour instead of widening it. Each value is the
  // card width plus this slide's 16px gutter and the card's own 4px wrapper.
  // The base floor only bites on phones, where 56% of a narrow track leaves the
  // card under 224px; from sm: up the basis is already past it. Note the phone
  // slide has no gutter and a 2px wrapper, so its offset is 4 rather than 24.
  "min-w-[228px] max-w-[248px] lg:max-w-none lg:min-w-[314px]",
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

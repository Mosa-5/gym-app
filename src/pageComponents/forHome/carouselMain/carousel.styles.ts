import { cva } from "class-variance-authority";

export const wrapper = cva(
  "flex flex-col gap-7 justify-center items-center mt-10 sm:mt-16 lg:mt-20 mb-10 sm:mb-16 lg:mb-20",
);

export const heading = cva(
  "text-xl md:text-3xl mb-5 font-bold dark:text-white tracking-widest uppercase",
);

export const carousel = cva("w-[70%] sm:w-[85%] lg:w-[80%] max-w-5xl");

export const carouselItem = cva("md:basis-1/2 lg:basis-1/3 py-4");

export const card = cva(
  "group min-h-96 cursor-pointer relative overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-3",
);

export const cardContent = cva("flex flex-col gap-5 items-center p-4 pb-6");

export const image = cva("h-56 object-contain mb-2 rounded-full");

export const productName = cva(
  "text-sm font-semibold text-center tracking-wide text-white",
);

export const productPrice = cva("text-base font-black text-white");

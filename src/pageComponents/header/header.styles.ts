import { cva } from "class-variance-authority";

export const headerClass = cva([
  "fixed top-0 left-0 right-0 z-50 w-full",
  "flex items-center h-[65px] 2xl:h-[82px]",
  "bg-neutral-950 text-white shadow-md overflow-x-hidden",
  "border-b border-neutral-800/40",
]);
export const containerClass = cva([
  "w-full mx-auto flex items-center justify-between",
  "lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1560px]",
  "px-4 md:px-6",
]);
export const logoClass = cva([
  "text-[22px] md:text-[26px] 2xl:text-[30px]",
  "font-black tracking-tighter uppercase leading-none",
  "cursor-pointer duration-200 font-[Inter,system-ui,sans-serif]",
]);
export const rightSectionClass = cva("flex items-center gap-5 2xl:gap-7");

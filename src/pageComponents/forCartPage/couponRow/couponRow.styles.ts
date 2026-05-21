import { cva } from "class-variance-authority";

export const couponRowClass = cva([
  "flex flex-col sm:flex-row items-stretch sm:items-center",
  "gap-3 mt-6 2xl:mt-8",
]);

export const couponFieldClass = cva([
  "flex-1 flex items-center gap-2 px-4 h-10 2xl:h-12",
  "rounded-full border border-neutral-200 dark:border-neutral-800",
  "bg-white dark:bg-neutral-900",
]);

export const couponInputClass = cva([
  "flex-1 bg-transparent outline-none",
  "text-sm 2xl:text-base text-neutral-900 dark:text-white",
  "placeholder:text-neutral-400",
]);

export const applyButtonClass = cva([
  "h-10 2xl:h-12 px-6 2xl:px-8 rounded-full",
  "bg-neutral-900 dark:bg-neutral-800 text-white",
  "text-sm 2xl:text-base font-semibold",
  "hover:bg-neutral-800 dark:hover:bg-neutral-700",
  "transition-colors cursor-pointer",
]);

export const clearButtonClass = cva([
  "h-10 2xl:h-12 px-6 2xl:px-8 rounded-full",
  "border border-neutral-200 dark:border-neutral-800",
  "text-sm 2xl:text-base font-semibold text-neutral-500",
  "hover:text-neutral-900 dark:hover:text-white",
  "hover:border-neutral-400 dark:hover:border-neutral-600",
  "transition-colors cursor-pointer",
]);

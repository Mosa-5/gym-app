import { cva } from "class-variance-authority";

export const itemCardClass = cva([
  "flex items-center gap-4 2xl:gap-6 p-4 2xl:p-6",
  "rounded-2xl border border-neutral-200 dark:border-neutral-800",
  "bg-white dark:bg-neutral-900",
]);

export const itemImageClass = cva([
  "w-20 h-20 sm:w-24 sm:h-24 2xl:w-32 2xl:h-32",
  "rounded-xl object-cover flex-shrink-0",
  "bg-neutral-100 dark:bg-neutral-800",
]);

export const itemNameClass = cva([
  "text-sm sm:text-base 2xl:text-lg font-bold",
  "text-neutral-900 dark:text-white truncate",
]);

export const itemUnitPriceClass = cva(
  "text-xs 2xl:text-sm text-neutral-400 mt-0.5",
);

export const qtyButtonClass = cva([
  "w-8 h-8 2xl:w-10 2xl:h-10 rounded-full",
  "flex items-center justify-center",
  "bg-neutral-100 dark:bg-neutral-800",
  "hover:bg-neutral-200 dark:hover:bg-neutral-700",
  "transition-colors cursor-pointer",
]);

export const qtyIconClass = cva([
  "w-3.5 h-3.5 2xl:w-4 2xl:h-4",
  "text-neutral-600 dark:text-neutral-300",
]);

export const qtyCountClass = cva([
  "w-8 2xl:w-10 text-center",
  "text-sm 2xl:text-base font-semibold",
  "text-neutral-900 dark:text-white",
]);

export const itemLineTotalClass = cva([
  "text-sm sm:text-base 2xl:text-lg font-bold",
  "text-neutral-900 dark:text-white",
]);

export const removeButtonClass = cva([
  "p-2 2xl:p-3 rounded-full flex-shrink-0 self-start",
  "text-neutral-400 hover:text-brand",
  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
  "transition-colors cursor-pointer",
]);

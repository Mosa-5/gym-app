import { cva } from "class-variance-authority";

export const summaryWrapperClass = cva(
  "w-full lg:w-80 2xl:w-[420px] lg:flex-shrink-0",
);

export const summaryCardClass = cva([
  "rounded-2xl border border-neutral-200 dark:border-neutral-800",
  "bg-white dark:bg-neutral-900 p-6 2xl:p-8",
  "lg:sticky lg:top-24",
]);

export const summaryTitleClass = cva([
  "text-base 2xl:text-xl font-black uppercase tracking-tight",
  "text-neutral-900 dark:text-white mb-5 2xl:mb-7",
]);

export const summaryValueClass = cva(
  "font-semibold text-neutral-900 dark:text-white",
);

export const summaryTotalLabelClass = cva(
  "font-bold text-neutral-900 dark:text-white",
);

export const summaryTotalValueClass = cva([
  "text-lg 2xl:text-2xl font-black",
  "text-neutral-900 dark:text-white",
]);

export const placeOrderButtonClass = cva([
  "w-full mt-6 2xl:mt-8 py-3 2xl:py-4 rounded-full",
  "bg-brand hover:bg-brand-hover",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "text-white font-bold text-sm 2xl:text-base uppercase tracking-wider",
  "transition-colors duration-200 cursor-pointer",
]);

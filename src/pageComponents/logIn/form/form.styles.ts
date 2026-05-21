import { cva } from "class-variance-authority";

export const cardClass = cva([
  "m-auto w-full flex flex-col items-center rounded-2xl",
  "max-w-sm 2xl:max-w-lg p-8 2xl:p-12",
  "bg-white dark:bg-neutral-900",
  "border border-neutral-200 dark:border-neutral-800 shadow-sm",
]);

export const headingClass = cva([
  "text-2xl 2xl:text-4xl font-black uppercase tracking-tight",
  "text-neutral-900 dark:text-white mb-6 2xl:mb-10",
]);

export const formClass = cva([
  "flex flex-col items-center w-full px-2",
  "space-y-6 2xl:space-y-8",
  "max-w-xs 2xl:max-w-md *:w-full dark:text-white",
]);

export const fieldsClass = cva("space-y-3 2xl:space-y-5");

export const inputClass = cva("2xl:h-12 2xl:text-base");

export const labelClass = cva("2xl:text-base");

export const submitButtonClass = cva([
  "rounded-full 2xl:py-6 2xl:px-10",
  "bg-brand hover:bg-brand-hover text-white",
  "font-bold uppercase tracking-wider 2xl:text-base",
]);

export const guestButtonClass = cva(
  "rounded-full font-semibold 2xl:text-base 2xl:py-6",
);

export const descriptionTextClass = cva(
  "text-sm 2xl:text-base text-gray-600 dark:text-gray-500",
);

export const descriptionLinkClass = cva([
  "text-sm 2xl:text-base text-brand font-semibold",
  "hover:underline cursor-pointer",
]);

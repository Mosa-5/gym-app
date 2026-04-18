import { cva } from "class-variance-authority";

export const cardClass = cva([
  "m-auto rounded-2xl flex flex-col items-center w-full",
  "max-w-sm 2xl:max-w-lg p-8 2xl:p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm",
]);

export const headingClass = cva(
  "text-2xl 2xl:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-6 2xl:mb-10",
);

export const formClass = cva(
  "flex flex-col items-center space-y-6 2xl:space-y-8 max-w-xs 2xl:max-w-md *:w-full px-2 w-full dark:text-white",
);

export const fieldsClass = cva("space-y-3 2xl:space-y-5");

export const inputClass = cva("2xl:h-12 2xl:text-base");

export const labelClass = cva("2xl:text-base");

export const submitButtonClass = cva(
  "bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wider rounded-full 2xl:text-base 2xl:py-6 2xl:px-10",
);

export const descriptionTextClass = cva(
  "text-sm 2xl:text-base text-gray-600 dark:text-gray-500",
);

export const descriptionLinkClass = cva(
  "text-sm 2xl:text-base text-brand font-semibold hover:underline cursor-pointer",
);

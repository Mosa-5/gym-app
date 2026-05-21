import { cva } from "class-variance-authority";

export const sectionClass = cva([
  "py-10 sm:py-16 lg:py-20 2xl:py-28",
  "bg-gray-50 dark:bg-neutral-900",
]);
export const containerClass = cva(
  "container mx-auto px-4 text-center max-w-3xl 2xl:max-w-4xl",
);
export const headingClass = cva([
  "text-xl md:text-3xl mb-2",
  "font-bold dark:text-white tracking-widest uppercase",
]);
export const descriptionClass = cva(
  "text-sm 2xl:text-base text-gray-500 dark:text-gray-400 mb-6",
);

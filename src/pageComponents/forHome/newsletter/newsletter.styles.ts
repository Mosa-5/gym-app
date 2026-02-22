import { cva } from "class-variance-authority";

export const sectionClass = cva(
  "py-10 sm:py-16 lg:py-20 bg-gray-50 dark:bg-neutral-900",
);
export const containerClass = cva(
  "container mx-auto px-4 text-center max-w-xl",
);
export const headingClass = cva(
  "text-xl md:text-3xl font-bold dark:text-white mb-2 tracking-widest uppercase",
);
export const descriptionClass = cva(
  "text-sm text-gray-500 dark:text-gray-400 mb-6",
);
export const formClass = cva("flex flex-col sm:flex-row gap-3 justify-center");

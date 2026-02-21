import { cva } from "class-variance-authority";

export const sectionClass = cva("py-16 sm:py-20 lg:py-28");
export const containerClass = cva("container mx-auto px-4 max-w-6xl");
export const headingClass = cva("");

export const contentGridClass = cva(
  "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20",
);

export const textBlockClass = cva("space-y-6");

export const missionClass = cva(
  "text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 font-light",
);

export const secondaryTextClass = cva(
  "text-base text-neutral-500 dark:text-neutral-400 italic border-l-2 border-brand pl-4",
);

export const dividerClass = cva("w-12 h-[2px] bg-brand");

export const statsGridClass = cva(
  "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
);

export const statCardClass = cva(
  "group relative p-6 sm:p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand/5",
);

export const statIconClass = cva(
  "w-9 h-9 flex items-center justify-center rounded-lg bg-brand/10 text-brand mb-4",
);

export const statValueClass = cva(
  "text-3xl sm:text-4xl font-black tracking-tight text-brand",
);

export const statLabelClass = cva(
  "text-sm font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mt-1",
);

export const statDescClass = cva(
  "text-xs text-neutral-500 dark:text-neutral-500 mt-2 leading-relaxed",
);

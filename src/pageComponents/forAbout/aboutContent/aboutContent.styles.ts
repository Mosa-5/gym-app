import { cva } from "class-variance-authority";

export const sectionClass = cva("py-16 sm:py-20 lg:py-28");
export const containerClass = cva("container mx-auto px-4 max-w-6xl");

export const bodyText = cva(
  "text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 font-light max-w-3xl mx-auto text-center",
);

export const gridFour = cva(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
);

export const gridThree = cva(
  "grid grid-cols-1 sm:grid-cols-3 gap-6",
);

export const card = cva(
  "group relative p-6 sm:p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand/5",
);

export const cardIcon = cva(
  "w-11 h-11 flex items-center justify-center rounded-lg bg-brand/10 text-brand mb-4",
);

export const cardTitle = cva(
  "text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-2",
);

export const cardDesc = cva(
  "text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed",
);

export const statValue = cva(
  "text-3xl sm:text-4xl font-black tracking-tight text-brand",
);

export const statLabel = cva(
  "text-sm font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mt-1",
);

export const trustBlock = cva(
  "max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
);

export const ctaButton = cva(
  "inline-block px-10 py-4 bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wider rounded-full transition-colors",
);

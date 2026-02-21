import { cva } from "class-variance-authority";

export const sectionClass = cva("py-10 sm:py-16 lg:py-20");
export const containerClass = cva("container mx-auto px-4");
export const headingClass = cva(
  "text-xl md:text-3xl font-bold dark:text-white text-center mb-2 tracking-widest uppercase",
);
export const subheadingClass = cva(
  "text-sm text-center text-gray-500 dark:text-gray-400 mb-8",
);
export const reviewsGridClass = cva(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto",
);
export const reviewCardClass = cva(
  "p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-300",
);
export const avatarWrapperClass = cva("flex items-center gap-3 mb-4");
export const usernameClass = cva(
  "font-semibold text-sm text-neutral-800 dark:text-neutral-200 tracking-wide",
);
export const commentClass = cva(
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-4",
);
export const ratingClass = cva("flex items-center gap-0.5 mb-3");

import { cva } from "class-variance-authority";

export const themeToggleButtonClass = cva([
  "md:flex relative w-12 h-9 rounded-md",
  "border border-gray-200 dark:border-gray-800",
  "bg-black hover:bg-white hover:text-black",
  "dark:hover:bg-white dark:hover:text-black",
  "transition-colors",
]);

export const iconClass = cva(
  [
    "absolute h-5 w-5 top-1/2 left-1/2",
    "-translate-x-1/2 -translate-y-1/2",
    "transition-transform duration-300",
  ],
  {
    variants: {
      theme: {
        light: "rotate-0 scale-100 opacity-100",
        dark: "-rotate-90 scale-0 opacity-0",
      },
    },
  },
);

export const iconClassDark = cva(
  [
    "absolute h-5 w-5 top-1/2 left-1/2",
    "-translate-x-1/2 -translate-y-1/2",
    "transition-transform duration-300",
  ],
  {
    variants: {
      theme: {
        light: "rotate-90 scale-0 opacity-0",
        dark: "rotate-0 scale-100 opacity-100",
      },
    },
  },
);

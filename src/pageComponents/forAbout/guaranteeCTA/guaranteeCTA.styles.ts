import { cva } from "class-variance-authority";

export const ctaButton = cva([
  "inline-block rounded-full",
  "px-10 py-4 2xl:px-14 2xl:py-5",
  "bg-brand hover:bg-brand-hover text-white",
  "font-bold uppercase tracking-wider 2xl:text-base transition-colors",
]);

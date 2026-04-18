import { cva } from "class-variance-authority";

export const ctaButton = cva(
  "inline-block px-10 py-4 2xl:px-14 2xl:py-5 2xl:text-base bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-wider rounded-full transition-colors",
);

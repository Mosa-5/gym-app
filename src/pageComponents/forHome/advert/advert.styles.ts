import { cva } from "class-variance-authority";

export const banner = cva("relative bg-black text-white");
export const bannerInner = cva(
  "relative flex items-center justify-center bg-cover bg-center",
);
export const overlay = cva("absolute inset-0 bg-black opacity-50");
export const content = cva("relative z-10 text-center p-32 2xl:p-48");
export const subHeading = cva(
  "text-base md:text-lg 2xl:text-2xl font-semibold uppercase tracking-wide",
);
export const heading = cva(
  "text-brand text-3xl md:text-4xl 2xl:text-6xl font-bold tracking-wider",
);
export const saleText = cva(
  "text-xl md:text-2xl 2xl:text-3xl font-medium mt-2 tracking-wide",
);
export const button = cva("mt-4 px-8 py-6 2xl:px-12 2xl:py-8 2xl:text-lg text-white font-bold");

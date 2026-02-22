import { cva } from "class-variance-authority";

export const sectionClass = cva("py-10 sm:py-16 lg:py-20");
export const containerClass = cva("container mx-auto px-4");
export const headingClass = cva(
  "text-xl md:text-3xl font-bold dark:text-white text-center mb-8 tracking-widest uppercase",
);
export const panelContainerClass = cva(
  "flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-5xl mx-auto sm:h-[350px] md:h-[400px] overflow-hidden rounded-2xl",
);

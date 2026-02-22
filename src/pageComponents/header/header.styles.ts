import { cva } from "class-variance-authority";

export const headerClass = cva(
  "bg-neutral-950/95 backdrop-blur-md shadow-md text-white h-[65px] flex items-center fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden border-b border-neutral-800/40",
);
export const containerClass = cva(
  "w-full lg:max-w-[1024px] xl:max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6",
);
export const logoClass = cva(
  "text-[22px] md:text-[26px] cursor-pointer font-black tracking-tighter uppercase leading-none duration-200",
);
export const rightSectionClass = cva("flex items-center gap-5");

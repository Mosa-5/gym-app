import { cva } from "class-variance-authority";

export const headerClass = cva([
  "fixed top-0 left-0 right-0 z-50 w-full",
  "flex items-center h-[65px] 2xl:h-[82px]",
  "bg-neutral-950 text-white shadow-md overflow-x-hidden",
  "border-b border-neutral-800/40",
]);
export const containerClass = cva([
  "w-full mx-auto flex items-center justify-between",
  "lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1560px]",
  "px-4 md:px-6",
]);
export const logoClass = cva([
  "text-[22px] md:text-[26px] 2xl:text-[30px]",
  "font-black tracking-tighter uppercase leading-none",
  "cursor-pointer duration-200 font-[Inter,system-ui,sans-serif]",
]);
export const rightSectionClass = cva("flex items-center gap-5 2xl:gap-7");

// Avatar/icon plus "Profile"/"Login". `group` lets hovering anywhere on the
// link light up both the icon and the label.
export const accountLinkClass = cva(
  "group hidden md:flex items-center gap-2.5 2xl:gap-3",
);

// Same type as the nav links. Hidden below lg, where the header is too narrow
// for another word next to the nav links.
export const accountLabelClass = cva([
  "hidden lg:inline",
  "text-[13px] 2xl:text-[16px] font-semibold uppercase tracking-wider",
  "text-neutral-400 group-hover:text-white transition-colors duration-200",
]);

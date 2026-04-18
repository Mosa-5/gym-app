import { cva } from "class-variance-authority";

export const triggerClass = cva([
  "relative flex items-center justify-center rounded-full cursor-pointer",
  "w-8 h-8 2xl:w-10 2xl:h-10 bg-neutral-800/80 hover:bg-neutral-700 transition-colors duration-200",
]);

export const badgeClass = cva([
  "absolute -top-0.5 -right-0.5 flex justify-center items-center rounded-full font-bold leading-none",
  "bg-brand text-white text-[10px] 2xl:text-[11px] w-4 h-4 2xl:w-5 2xl:h-5",
]);

export const sheetContentClass = cva(
  "w-full max-w-full sm:max-w-md 2xl:max-w-lg bg-neutral-950 border-l border-neutral-800 text-white p-0 flex flex-col",
);

export const headerClass = cva(
  "px-6 pt-6 pb-4 2xl:px-8 2xl:pt-8 2xl:pb-5 border-b border-neutral-800 pr-14",
);

export const titleClass = cva(
  "text-white text-lg 2xl:text-xl font-bold uppercase tracking-wider flex items-center gap-3",
);

export const itemCountClass = cva(
  "ml-auto text-sm 2xl:text-base font-semibold text-neutral-400",
);

export const scrollAreaClass = cva(
  "flex-1 overflow-y-auto px-6 py-4 2xl:px-8 2xl:py-6",
);

export const itemListClass = cva("flex flex-col gap-4 2xl:gap-5");

export const itemCardClass = cva(
  "flex gap-4 2xl:gap-5 p-3 2xl:p-4 rounded-xl bg-neutral-900 border border-neutral-800",
);

export const itemImageClass = cva(
  "w-20 h-20 sm:w-16 sm:h-16 2xl:w-24 2xl:h-24 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0",
);

export const itemNameClass = cva(
  "text-base sm:text-sm 2xl:text-base font-semibold text-white truncate",
);

export const itemCategoryClass = cva(
  "text-sm sm:text-xs 2xl:text-sm text-neutral-500 mt-0.5",
);

export const qtyButtonClass = cva([
  "flex items-center justify-center rounded-md cursor-pointer",
  "w-8 h-8 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8 bg-neutral-800 hover:bg-neutral-700 transition-colors",
]);

export const qtyCountClass = cva(
  "w-8 text-center text-xs 2xl:text-sm font-bold text-white",
);

export const itemPriceClass = cva("text-sm 2xl:text-base font-bold text-white");

export const removeButtonClass = cva(
  "self-start p-1.5 rounded-md hover:bg-neutral-800 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer",
);

export const footerClass = cva(
  "px-6 py-5 2xl:px-8 2xl:py-6 border-t border-neutral-800",
);

export const subtotalLabelClass = cva(
  "text-sm 2xl:text-base text-neutral-400 uppercase tracking-wider font-semibold",
);

export const subtotalValueClass = cva(
  "text-xl 2xl:text-2xl font-black text-white",
);

export const checkoutButtonClass = cva([
  "w-full rounded-full font-bold uppercase tracking-wider cursor-pointer",
  "bg-brand hover:bg-brand-hover text-white text-sm 2xl:text-base py-3.5 2xl:py-4 transition-colors duration-200",
]);

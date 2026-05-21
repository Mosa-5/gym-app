import { cva } from "class-variance-authority";

export const tabsListClass = cva([
  "flex w-full h-auto p-1 gap-1 rounded-full",
  "bg-neutral-100 dark:bg-neutral-900",
]);

export const tabTriggerClass = cva([
  "flex-1 flex items-center justify-center gap-2 rounded-full",
  "py-2.5 2xl:py-3.5 text-sm 2xl:text-base font-semibold",
  "data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800",
  "data-[state=active]:shadow-sm transition-all cursor-pointer",
]);

export const tabContentWrapperClass = cva("mt-8 2xl:mt-10 min-h-[500px]");

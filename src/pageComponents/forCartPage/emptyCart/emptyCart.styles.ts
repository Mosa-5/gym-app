import { cva } from "class-variance-authority";

export const emptyWrapperClass = cva(
  "flex flex-col items-center justify-center py-16 gap-5",
);

export const emptyCircleClass = cva([
  "relative w-52 h-52 2xl:w-72 2xl:h-72 rounded-full",
  "flex items-center justify-center overflow-hidden",
]);

export const emptyImageClass = cva(
  "relative w-28 h-28 2xl:w-40 2xl:h-40 object-contain",
);

export const emptyTextClass = cva(
  "text-neutral-500 text-sm 2xl:text-lg font-medium",
);

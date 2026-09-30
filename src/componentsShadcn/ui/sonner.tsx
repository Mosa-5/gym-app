import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Light only: the site has no dark mode. (It used to read next-themes, which
// had no provider, so toasts followed the OS theme instead of the site.)
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-brand group-[.toaster]:border-2 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-950 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-brand flex items-center justify-center",
          description:
            "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400 text-center",
          actionButton:
            "group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400",
        },
        style: {
          fontSize: "1rem",
          maxWidth: "fit",
          width: "fit-content",
          padding: "10px 20px",
        },
        duration: 1000,
      }}
      {...props}
    />
  );
};

export { Toaster };

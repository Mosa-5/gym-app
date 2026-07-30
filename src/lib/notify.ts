/**
 * Toast helper that loads `sonner` on demand.
 *
 * Importing `toast` from "sonner" directly pulls the whole library (~62 kB raw)
 * into whichever chunk does the importing — and since the home page is in the
 * initial bundle, that meant every visitor downloaded the toast library before
 * first paint, to show notifications that can only ever fire after a click.
 *
 * These wrappers `import()` sonner at call time instead, so it lands in its own
 * chunk fetched on first use. **Always use this instead of importing `toast`
 * directly** — a single direct import in a module that reaches the initial
 * chunk silently undoes the split.
 *
 * The `<Toaster />` renderer is separately lazy-loaded in `App.tsx`; it starts
 * fetching during the first render, so it is always mounted long before a user
 * action can produce a toast.
 */

const loadToast = () => import("sonner").then((m) => m.toast);

export const notify = {
  success: async (message: string) => (await loadToast()).success(message),
  error: async (message: string) => (await loadToast()).error(message),
  /** Plain toast with no status styling — sonner's bare call form. */
  message: async (message: string) => (await loadToast())(message),
};

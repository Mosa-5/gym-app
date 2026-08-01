import "@testing-library/jest-dom/vitest";
// The real i18n instance, so `t()` returns actual copy rather than raw keys.
// Without it every component using useTranslation warns NO_I18NEXT_INSTANCE and
// renders key strings, which would make text assertions meaningless.
import "@/i18n";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

afterEach(() => {
  // React Testing Library does not auto-clean when `globals` is on for every
  // setup; doing it explicitly keeps tests independent of that detail.
  cleanup();
});

beforeEach(() => {
  // The cart persists to localStorage, so without this a test that adds an item
  // would leak into the next one.
  localStorage.clear();
  // useDocumentMeta writes into <head>; reset it so each test sees a clean slate.
  document.head.querySelectorAll("meta[name], link[rel]").forEach((el) => {
    el.remove();
  });
  document.title = "";
});

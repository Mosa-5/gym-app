import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Sets the per-route <title>, <meta name="description">, <link rel="canonical">
 * and (optionally) <meta name="robots"> from inside a page component.
 *
 * Scope note: this runs at runtime, so **Googlebot sees it but social crawlers
 * do not**: Facebook/LinkedIn/Slack/Discord/X never execute JavaScript. The
 * og:/twitter: tags that produce link previews are therefore static in
 * `index.html` and are deliberately *not* touched here; updating them from a
 * hook would look like it works while changing nothing for any crawler.
 *
 * Re-runs on language change, so titles follow the active locale.
 */

/** Must stay in sync with the <title> and description in `index.html`. */
const SITE_NAME = "GymGear";
const DEFAULT_TITLE = "GymGear | Premium Lifting Gear";
const DEFAULT_DESCRIPTION =
  "Premium lifting belts, straps, knee sleeves and wrist wraps for athletes who demand the best. Browse the full range and read real reviews.";
const SITE_URL = "https://gym-app-7y5y.vercel.app";

type DocumentMeta = {
  /** Page name only; " | GymGear" is appended. Omit while data is loading. */
  title?: string;
  description?: string;
  /** Keep private/transactional routes out of search results. */
  noindex?: boolean;
};

/** Find a tag by selector, creating it in <head> if it isn't there yet. */
const upsertTag = (
  selector: string,
  create: () => HTMLElement,
): HTMLElement => {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (existing) return existing;

  const created = create();
  document.head.appendChild(created);
  return created;
};

export const useDocumentMeta = ({
  title,
  description,
  noindex = false,
}: DocumentMeta) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

    upsertTag('meta[name="description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      return tag;
    }).setAttribute("content", description ?? DEFAULT_DESCRIPTION);

    // Canonical uses the bare pathname: App.tsx appends a ?lang= param to every
    // route, which would otherwise read as three URLs for the same page.
    upsertTag('link[rel="canonical"]', () => {
      const tag = document.createElement("link");
      tag.setAttribute("rel", "canonical");
      return tag;
    }).setAttribute("href", `${SITE_URL}${pathname}`);

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      upsertTag('meta[name="robots"]', () => {
        const tag = document.createElement("meta");
        tag.setAttribute("name", "robots");
        return tag;
      }).setAttribute("content", "noindex");
    } else if (robots) {
      // Drop it on the way out, so a noindex route doesn't taint the next one.
      robots.remove();
    }
  }, [title, description, noindex, pathname, i18n.language]);
};

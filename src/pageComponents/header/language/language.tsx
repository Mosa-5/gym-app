import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const LANGS = ["en", "ka"] as const;
type Lang = (typeof LANGS)[number];

/**
 * EN | KA segmented switch. A red thumb slides under the active language.
 * Both buttons have fixed, equal widths so the thumb can move by exactly
 * one button (translate-x-full).
 */
const LanguageChanger = () => {
  const { i18n, t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const current: Lang = i18n.language === "ka" ? "ka" : "en";

  useEffect(() => {
    const lang = searchParams.get("lang");
    if ((lang === "en" || lang === "ka") && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const select = (lang: Lang) => {
    if (lang === current) return;
    i18n.changeLanguage(lang);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("lang", lang);
        return next;
      },
      { replace: true },
    );
  };

  return (
    <div
      role="group"
      aria-label={t("a11y.language")}
      className="relative inline-flex rounded-full bg-neutral-800/80 p-0.5"
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-11 2xl:w-14 rounded-full bg-brand transition-transform duration-200 ease-out motion-reduce:transition-none ${
          current === "ka" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => select(lang)}
          aria-pressed={current === lang}
          className={`relative z-10 w-11 2xl:w-14 py-1 2xl:py-1.5 rounded-full text-[13px] 2xl:text-[16px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            current === lang
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          {t(`common.lang.${lang}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageChanger;

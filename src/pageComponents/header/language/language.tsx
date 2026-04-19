import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get("lang");
    if ((lang === "en" || lang === "ka") && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const toggle = () => {
    const newLang = i18n.language === "ka" ? "en" : "ka";
    i18n.changeLanguage(newLang);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("lang", newLang);
        return next;
      },
      { replace: true },
    );
  };

  return (
    <button
      onClick={toggle}
      className="text-[13px] 2xl:text-[16px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer outline-none"
    >
      {i18n.language === "ka" ? "KA" : "EN"}
    </button>
  );
};

export default LanguageChanger;

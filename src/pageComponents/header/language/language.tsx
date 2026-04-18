import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
  const { i18n } = useTranslation();

  const toggle = () => {
    const newLang = i18n.language === "ka" ? "en" : "ka";
    i18n.changeLanguage(newLang);
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

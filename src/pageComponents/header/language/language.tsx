import { useState } from "react";

const LanguageChanger = () => {
  const [lang, setLang] = useState<"EN" | "KA">("EN");

  const toggle = () => {
    setLang((prev) => (prev === "EN" ? "KA" : "EN"));
  };

  return (
    <button
      onClick={toggle}
      className="text-[13px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer outline-none"
    >
      {lang}
    </button>
  );
};

export default LanguageChanger;

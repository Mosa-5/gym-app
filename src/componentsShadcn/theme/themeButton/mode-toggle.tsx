import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={t("common.toggleTheme")}
      className="relative w-[52px] h-7 2xl:w-[66px] 2xl:h-[36px] rounded-full bg-neutral-800 transition-colors duration-300 cursor-pointer border border-neutral-700/50"
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-[3px] w-[22px] h-[22px] 2xl:w-[30px] 2xl:h-[30px] rounded-full bg-brand shadow-sm flex items-center justify-center transition-transform duration-300 ${isDark ? "translate-x-[22px] 2xl:translate-x-[30px]" : "translate-x-0"}`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 2xl:h-4 2xl:w-4 text-white" />
        ) : (
          <Sun className="h-3 w-3 2xl:h-4 2xl:w-4 text-white" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;

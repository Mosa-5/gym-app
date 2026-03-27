import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/componentsShadcn/ui/select";
import { useTranslation } from "react-i18next";

interface SortMenuProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ value, onValueChange }) => {
  const { t } = useTranslation();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-40 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 shadow-none transition">
        <SelectValue placeholder={t("products.sortBy")} />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="price-asc">
            {t("products.priceLowHigh")}
          </SelectItem>
          <SelectItem value="price-desc">
            {t("products.priceHighLow")}
          </SelectItem>
          <SelectItem value="name-asc">{t("products.nameAZ")}</SelectItem>
          <SelectItem value="name-desc">{t("products.nameZA")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortMenu;

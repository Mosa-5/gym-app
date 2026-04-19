import { useState } from "react";
import { Checkbox } from "@/componentsShadcn/ui/checkbox";
import { Slider } from "@/componentsShadcn/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentsShadcn/ui/accordion";
import { useTranslation } from "react-i18next";

const CATEGORIES = ["lever-belts", "grip-tape", "lifting-straps", "knee-sleeves"];

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
}

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange }) => {
  const { t } = useTranslation();
  const [localPrice, setLocalPrice] = useState<[number, number]>(
    filters.priceRange,
  );

  const handlePriceCommit = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setLocalPrice(range);
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPrice([value[0], value[1]]);
  };

  const handleInputChange = (index: 0 | 1, raw: string) => {
    const num = parseInt(raw, 10);
    if (isNaN(num)) return;
    const clamped = Math.min(Math.max(num, 0), 1000);
    const next: [number, number] = [localPrice[0], localPrice[1]];
    next[index] = clamped;
    if (next[0] > next[1]) return;
    setLocalPrice(next);
    onFiltersChange({ ...filters, priceRange: next });
  };

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: updated });
  };

  return (
    <div className="w-full">
      {/* Price Range */}
      <div className="pb-6 2xl:pb-8 border-b border-neutral-200 dark:border-neutral-700">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 2xl:p-5 mb-4 2xl:mb-5">
          <h3 className="text-sm 2xl:text-base font-bold tracking-wide uppercase text-neutral-900 dark:text-neutral-100 mb-3 2xl:mb-4">
            {t("products.price")}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400">$</span>
              <input
                type="number"
                min={0}
                max={localPrice[1]}
                value={localPrice[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 2xl:py-2 text-sm 2xl:text-base rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <span className="text-neutral-400 text-sm">—</span>
            <div className="flex-1 relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400">$</span>
              <input
                type="number"
                min={localPrice[0]}
                max={1000}
                value={localPrice[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 2xl:py-2 text-sm 2xl:text-base rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
        </div>
        <Slider
          value={localPrice}
          onValueChange={handlePriceChange}
          onValueCommit={handlePriceCommit}
          min={0}
          max={1000}
          step={10}
          minStepsBetweenThumbs={1}
        />
      </div>

      {/* Product Category */}
      <Accordion type="multiple" defaultValue={["category"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm 2xl:text-base font-bold tracking-wide uppercase hover:no-underline dark:text-white">
            {t("products.productCategory")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 2xl:space-y-4 pl-1">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 2xl:gap-4 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="2xl:w-5 2xl:h-5"
                  />
                  <span className="text-sm 2xl:text-base text-neutral-700 dark:text-neutral-300">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filters;

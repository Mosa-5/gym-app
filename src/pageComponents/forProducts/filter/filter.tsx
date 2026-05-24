import { useState, useEffect, useRef } from "react";
import { crosshatchPattern } from "@/lib/crosshatchPattern";
import { Checkbox } from "@/componentsShadcn/ui/checkbox";
import { Slider } from "@/componentsShadcn/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentsShadcn/ui/accordion";
import { useTranslation } from "react-i18next";
import { PRICE_MIN, PRICE_MAX } from "@/lib/constants";

const CATEGORIES = [
  "lever-belts",
  "grip-tape",
  "lifting-straps",
  "knee-sleeves",
];

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
  const inputChanged = useRef(false);

  useEffect(() => {
    if (!inputChanged.current) return;
    const handler = setTimeout(() => {
      onFiltersChange({ ...filters, priceRange: localPrice });
      inputChanged.current = false;
    }, 500);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localPrice]);

  const handlePriceChange = (value: number[]) => {
    inputChanged.current = true;
    setLocalPrice([value[0], value[1]]);
  };

  const handleInputChange = (index: 0 | 1, raw: string) => {
    const num = parseInt(raw, 10);
    if (isNaN(num)) return;
    const clamped = Math.min(Math.max(num, PRICE_MIN), PRICE_MAX);
    const next: [number, number] = [localPrice[0], localPrice[1]];
    next[index] = clamped;
    if (next[0] > next[1]) return;
    inputChanged.current = true;
    setLocalPrice(next);
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
        <div
          className="rounded-xl overflow-hidden p-4 2xl:p-5 mb-4 2xl:mb-5 relative"
          style={{
            background:
              "linear-gradient(135deg, rgb(35 35 35) 0%, rgb(10 10 10) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: crosshatchPattern }}
          />
          <h3 className="relative text-sm 2xl:text-base font-bold tracking-wide uppercase text-white mb-3 2xl:mb-4">
            {t("products.price")}
          </h3>
          <div className="relative flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/60">
                $
              </span>
              <input
                type="number"
                min={PRICE_MIN}
                max={localPrice[1]}
                value={localPrice[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 2xl:py-2 text-sm 2xl:text-base rounded-lg border border-white/20 bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <span className="text-white/50 text-sm">—</span>
            <div className="flex-1 relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/60">
                $
              </span>
              <input
                type="number"
                min={localPrice[0]}
                max={PRICE_MAX}
                value={localPrice[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 2xl:py-2 text-sm 2xl:text-base rounded-lg border border-white/20 bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>
        <Slider
          value={localPrice}
          onValueChange={handlePriceChange}
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

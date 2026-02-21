import { useState } from "react";
import { Checkbox } from "@/componentsShadcn/ui/checkbox";
import { Slider } from "@/componentsShadcn/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentsShadcn/ui/accordion";
import { useGetDistinctCategories } from "@/reactQuery/query/categories";

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
}

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange }) => {
  const { data: categories = [] } = useGetDistinctCategories();
  const [localPrice, setLocalPrice] = useState<[number, number]>(filters.priceRange);

  const handlePriceCommit = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setLocalPrice(range);
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPrice([value[0], value[1]]);
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
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold tracking-wide uppercase text-neutral-900 dark:text-neutral-100">
            Price
          </h3>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {localPrice[0]} - {localPrice[1]}
          </span>
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
          <AccordionTrigger className="text-sm font-bold tracking-wide uppercase hover:no-underline">
            Product Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pl-1">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
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

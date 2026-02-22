import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import Filters from "./filter";
import type { FilterState } from "./filter";

interface FiltersMobileProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FiltersMobile: React.FC<FiltersMobileProps> = ({
  filters,
  onFiltersChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full max-w-40 lg:hidden">
        <Button className="w-full">Filter</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl max-w-xs sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl dark:text-neutral-400 text-center">
            Filter
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-left">
              <Filters filters={filters} onFiltersChange={onFiltersChange} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersMobile;

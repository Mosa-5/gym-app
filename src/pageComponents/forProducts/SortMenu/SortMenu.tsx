import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/componentsShadcn/ui/select";

interface SortMenuProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-40 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 shadow-none transition">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="name-asc">Name: A to Z</SelectItem>
          <SelectItem value="name-desc">Name: Z to A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortMenu;

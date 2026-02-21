import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsHeroBanner from "@/pageComponents/forProducts/heroBanner/hero";
import SearchBar from "@/pageComponents/forProducts/search/search";
import SortMenu from "@/pageComponents/forProducts/SortMenu/SortMenu";
import ProductGrid from "@/pageComponents/forProducts/products/products";
import Filters from "@/pageComponents/forProducts/filter/filter";
import FiltersMobile from "@/pageComponents/forProducts/filter/filretMobile";
import type { FilterState } from "@/pageComponents/forProducts/filter/filter";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchedtext") || "";
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
  });

  return (
    <>
      <ProductsHeroBanner />

      <div className="flex p-6 max-w-screen-xl mx-auto mt-10 gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
          <Filters filters={filters} onFiltersChange={setFilters} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-8">
            <SearchBar />
            <SortMenu />
            <FiltersMobile filters={filters} onFiltersChange={setFilters} />
          </div>
          <ProductGrid searchQuery={searchQuery} filters={filters} />
        </main>
      </div>
    </>
  );
};

export default Products;

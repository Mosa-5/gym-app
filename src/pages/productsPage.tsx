import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsHeroBanner from "@/pageComponents/forProducts/heroBanner/hero";
import SearchBar from "@/pageComponents/forProducts/search/search";
import SortMenu from "@/pageComponents/forProducts/SortMenu/SortMenu";
import ProductGrid from "@/pageComponents/forProducts/products/products";
import Filters from "@/pageComponents/forProducts/filter/filter";
import FiltersMobile from "@/pageComponents/forProducts/filter/filretMobile";
import type { FilterState } from "@/pageComponents/forProducts/filter/filter";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("searchedtext") || "";
  const sortBy = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  const filters: FilterState = {
    priceRange: [
      Number(searchParams.get("priceMin")) || 0,
      Number(searchParams.get("priceMax")) || 1000,
    ],
    categories: searchParams.get("categories")
      ? searchParams.get("categories")!.split(",")
      : [],
  };

  const setFilters = useCallback(
    (next: FilterState) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next.priceRange[0] !== 0)
            p.set("priceMin", String(next.priceRange[0]));
          else p.delete("priceMin");
          if (next.priceRange[1] !== 1000)
            p.set("priceMax", String(next.priceRange[1]));
          else p.delete("priceMax");
          if (next.categories.length > 0)
            p.set("categories", next.categories.join(","));
          else p.delete("categories");
          p.delete("page");
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setSortBy = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (value) p.set("sort", value);
          else p.delete("sort");
          p.delete("page");
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setPage = useCallback(
    (pageNum: number) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (pageNum > 1) p.set("page", String(pageNum));
          else p.delete("page");
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <SearchBar />
            <div className="flex items-center gap-3">
              <SortMenu value={sortBy} onValueChange={setSortBy} />
              <FiltersMobile filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>
          <ProductGrid
            searchQuery={searchQuery}
            filters={filters}
            sortBy={sortBy}
            page={page}
            setPage={setPage}
          />
        </main>
      </div>
    </>
  );
};

export default Products;

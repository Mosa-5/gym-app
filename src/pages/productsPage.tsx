import ProductsHeroBanner from "@/pageComponents/forProducts/heroBanner/hero";
import SearchBar from "@/pageComponents/forProducts/search/search";
import SortMenu from "@/pageComponents/forProducts/sortMenu/sortMenu";
import ProductGrid from "@/pageComponents/forProducts/products/products";
import Filters from "@/pageComponents/forProducts/filter/filter";
import FiltersMobile from "@/pageComponents/forProducts/filter/filterMobile";
import { useProductFilters } from "@/pageComponents/forProducts/hooks/useProductFilters";

const Products = () => {
  const {
    mainRef,
    searchQuery,
    sortBy,
    page,
    filters,
    setFilters,
    setSortBy,
    setPage,
  } = useProductFilters();

  return (
    <>
      <ProductsHeroBanner />

      <div className="flex px-3 py-6 2xl:px-6 2xl:py-10 max-w-screen-xl 2xl:max-w-[1560px] mx-auto mt-10 2xl:mt-14 gap-8 2xl:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 2xl:w-80 shrink-0 sticky top-24 2xl:top-28 self-start">
          <Filters filters={filters} onFiltersChange={setFilters} />
        </aside>

        {/* Main content */}
        <main ref={mainRef} className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <SearchBar />
            <div className="flex items-center justify-center gap-3">
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

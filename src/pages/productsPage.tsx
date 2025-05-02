import { useSearchParams } from "react-router-dom";
import FeaturesSection from "@/pageComponents/forHome/featuresSection/featuresSection";
// import Filters from "@/pageComponents/forProducts/filter/filter";
import ProductsHeroBanner from "@/pageComponents/forProducts/heroBanner/hero";
import SearchBar from "@/pageComponents/forProducts/search/search";
import SortMenu from "@/pageComponents/forProducts/SortMenu/SortMenu";
import VirtualizedProductGrid from "@/pageComponents/forProducts/products/products";
import FiltersMobile from "@/pageComponents/forProducts/filter/filretMobile";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchedtext") || "";

  return (
    <>
      <ProductsHeroBanner />

      <div>
        <div className="flex p-6 max-w-full justify-center mt-10">
          <main className="flex flex-col flex-auto max-w-screen-xl">
            <div className="flex flex-col items-center mb-6 justify-evenly min-w-fit gap-4">
              <SearchBar />
              <div className="flex gap-10 w-full justify-center">
                <SortMenu />
                <FiltersMobile />
              </div>
            </div>
            <VirtualizedProductGrid searchQuery={searchQuery} />
          </main>
        </div>
      </div>

      <FeaturesSection />
    </>
  );
};

export default Products;

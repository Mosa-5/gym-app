import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterState } from "@/pageComponents/forProducts/filter/filter";
import { PRICE_MIN, PRICE_MAX } from "@/lib/constants";

/**
 * Owns the products page's URL-driven state: reads the current search/sort/
 * page/filter values from the query string and exposes setters that write them
 * back (replacing history, resetting page on filter/sort changes). Also returns
 * a ref to attach to the results container so the view scrolls into place on
 * first mount when arriving with active filters.
 */
export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasFilters =
      searchParams.get("categories") ||
      searchParams.get("searchedtext") ||
      searchParams.get("sort") ||
      searchParams.get("priceMin") ||
      searchParams.get("priceMax");

    if (hasFilters && mainRef.current) {
      const top =
        mainRef.current.getBoundingClientRect().top + window.scrollY - 95;
      window.scrollTo({ top, behavior: "smooth" });
    }
    // Mount-only: re-scrolling on every query-string change is not wanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchQuery = searchParams.get("searchedtext") || "";
  const sortBy = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  const filters: FilterState = {
    priceRange: [
      Number(searchParams.get("priceMin")) || PRICE_MIN,
      Number(searchParams.get("priceMax")) || PRICE_MAX,
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
          if (next.priceRange[0] !== PRICE_MIN)
            p.set("priceMin", String(next.priceRange[0]));
          else p.delete("priceMin");
          if (next.priceRange[1] !== PRICE_MAX)
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

  return {
    mainRef,
    searchQuery,
    sortBy,
    page,
    filters,
    setFilters,
    setSortBy,
    setPage,
  };
};

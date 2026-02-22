import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchedtext") || "",
  );
  const userTyped = useRef(false);

  useEffect(() => {
    if (!userTyped.current) return;

    const handler = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (searchText) {
            p.set("searchedtext", searchText);
          } else {
            p.delete("searchedtext");
          }
          p.delete("page");
          return p;
        },
        { replace: true },
      );
      userTyped.current = false;
    }, 1000);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      <input
        value={searchText}
        onChange={(e) => {
          userTyped.current = true;
          setSearchText(e.target.value);
        }}
        className="w-full h-10 pl-10 pr-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition"
        placeholder="Search products..."
      />
    </div>
  );
};

export default SearchBar;

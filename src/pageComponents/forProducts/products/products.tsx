import React from "react";
import { useGetFilteredProducts } from "@/reactQuery/query/products";
import { mapProductTableData, type MappedProduct } from "@/supabase/products";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./productCard";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useAddToWishlist } from "@/reactQuery/mutations/wishlist";
import type { FilterState } from "@/pageComponents/forProducts/filter/filter";
import noDataSVG from "@/assets/undraw_no-data_ig65.svg";
import "@/pageComponents/loader/loader.css";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const gridContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const ITEMS_PER_PAGE = 9;

const ProductGrid: React.FC<{
  searchQuery: string;
  filters: FilterState;
  sortBy: string;
  page: number;
  setPage: (page: number) => void;
}> = ({ searchQuery, filters, sortBy, page, setPage }) => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { t } = useTranslation();

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: string | number;
    category: string;
    created_at: string;
    description: string;
    image_url: string[];
  }) => {
    addToCart({ ...product, quantity: 1 });
  };

  const onAddToCart = (product: MappedProduct) => {
    toast.success(t("products.addedToCart", { name: product.name }));
    handleAddToCart(product);
  };

  const onAddToWishlist = (product: MappedProduct) => {
    if (!user) {
      toast.error(t("products.loginForWishlist"));
      return;
    }
    addToWishlist({ userId: user.id, productId: String(product.id) });
    toast.success(t("products.addedToWishlist"));
  };

  const { data, isLoading, isError } = useGetFilteredProducts({
    filters: {
      search: searchQuery || undefined,
      priceRange: filters.priceRange,
      categories:
        filters.categories.length > 0 ? filters.categories : undefined,
      sortBy: sortBy || undefined,
      page,
      pageSize: ITEMS_PER_PAGE,
    },
  });

  const currentProducts = mapProductTableData(data?.data ?? []);
  const totalPages = Math.ceil((data?.totalCount ?? 0) / ITEMS_PER_PAGE);

  // Scroll to top of grid when page changes (only on user interaction)
  const prevPage = React.useRef(page);
  React.useEffect(() => {
    if (prevPage.current === page) return;
    prevPage.current = page;
    if (gridRef.current) {
      const top =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [page]);

  return (
    <div
      ref={gridRef}
      className="m-auto max-w-sm sm:max-w-screen-lg 2xl:max-w-none w-full pt-5 min-h-screen"
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh] text-brand">
          <div className="lds-circle">
            <div></div>
          </div>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-sm text-neutral-400">
            {t("products.failedToLoad")}
          </span>
        </div>
      ) : currentProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <div
            className="relative w-52 h-52 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: crosshatchPattern,
              }}
            />
            <img
              src={noDataSVG}
              alt=""
              className="relative w-28 h-28 object-contain"
            />
          </div>
          <p className="text-sm text-neutral-400">{t("products.noMatch")}</p>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5 2xl:gap-6 px-0 sm:px-4"
            key={page}
            variants={gridContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {currentProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isEven={((page - 1) * ITEMS_PER_PAGE + index) % 2 === 0}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pb-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label={t("a11y.previousPage")}
                className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-neutral-900 dark:bg-neutral-200 text-white dark:text-black flex items-center justify-center disabled:opacity-30 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 2xl:w-12 2xl:h-12 rounded-full text-sm 2xl:text-base font-bold transition-colors cursor-pointer ${
                    p === page
                      ? "bg-brand text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label={t("a11y.nextPage")}
                className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full bg-neutral-900 dark:bg-neutral-200 text-white dark:text-black flex items-center justify-center disabled:opacity-30 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

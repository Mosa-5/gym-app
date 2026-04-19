import React from "react";
import { useGetFilteredProducts } from "@/reactQuery/query/products";
import { mapProductTableData } from "@/supabase/products";
import { Link } from "react-router-dom";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import type { FilterState } from "@/pageComponents/forProducts/filter/filter";
import noDataSVG from "@/assets/undraw_no-data_ig65.svg";
import "@/pageComponents/loader/loader.css";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from '@/lib/crosshatchPattern';

const gridContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 2xl:gap-6 px-0 sm:px-4"
            key={page}
            variants={gridContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {currentProducts.map((product, index) => {
              const globalIndex = (page - 1) * ITEMS_PER_PAGE + index;
              return (
                <Link
                  key={product.id}
                  to={`/dashboard/productDetail/${product.id}`}
                >
                  <motion.div
                    variants={gridItem}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300"
                  >
                    {/* Alternating bg */}
                    <div
                      className="absolute inset-0 pointer-events-none z-0"
                      style={{
                        background:
                          globalIndex % 2 === 0
                            ? "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)"
                            : "linear-gradient(135deg, rgb(35 35 35) 0%, rgb(20 20 20) 100%)",
                      }}
                    />
                    {/* Pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06]"
                      style={{
                        backgroundImage: crosshatchPattern,
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center p-3 pb-4 gap-2 sm:p-5 sm:pb-6 sm:gap-4 2xl:p-6 2xl:pb-8">
                      <img
                        src={product.image_url[0]}
                        alt={product.name}
                        loading="lazy"
                        className="h-24 sm:h-40 2xl:h-52 object-contain rounded-full"
                      />
                      <h3 className="text-xs sm:text-sm 2xl:text-base font-semibold text-center tracking-wide text-white truncate max-w-full">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base 2xl:text-lg font-black text-white">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.success(
                              t("products.addedToCart", { name: product.name }),
                            );
                            handleAddToCart(product);
                          }}
                          className="flex items-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10px] sm:text-xs 2xl:text-sm font-semibold uppercase tracking-wider px-2.5 py-1.5 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5 rounded-full transition-colors duration-200 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                          {t("products.addToCart")}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (!user) {
                              toast.error(t("products.loginForWishlist"));
                              return;
                            }
                            addToWishlist({
                              userId: user.id,
                              productId: String(product.id),
                            });
                            toast.success(t("products.addedToWishlist"));
                          }}
                          className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-colors duration-200 cursor-pointer"
                        >
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pb-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
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

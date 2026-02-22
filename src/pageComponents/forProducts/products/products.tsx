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

  const {
    data: productList = [],
    isLoading,
    isError,
  } = useGetFilteredProducts({
    queryOptions: { select: mapProductTableData },
    filters: {
      search: searchQuery || undefined,
      priceRange: filters.priceRange,
      categories:
        filters.categories.length > 0 ? filters.categories : undefined,
      sortBy: sortBy || undefined,
    },
  });

  const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentProducts = productList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
      className="m-auto max-w-sm sm:max-w-screen-lg w-full pt-5 min-h-screen"
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh] text-brand">
          <div className="lds-circle">
            <div></div>
          </div>
        </div>
      ) : isError || !productList ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-sm text-neutral-400">
            Failed to load products.
          </span>
        </div>
      ) : productList.length === 0 ? (
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
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
            <img
              src={noDataSVG}
              alt=""
              className="relative w-28 h-28 object-contain"
            />
          </div>
          <p className="text-sm text-neutral-400">
            No products match your filters.
          </p>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 px-0 sm:px-4">
            {currentProducts.map((product, index) => {
              const globalIndex = startIndex + index;
              return (
                <Link
                  key={product.id}
                  to={`/dashboard/productDetail/${product.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
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
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center p-3 pb-4 gap-2 sm:p-5 sm:pb-6 sm:gap-4">
                      <img
                        src={product.image_url[0]}
                        alt={product.name}
                        className="h-24 sm:h-40 object-contain rounded-full"
                      />
                      <h3 className="text-xs sm:text-sm font-semibold text-center tracking-wide text-white truncate max-w-full">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base font-black text-white">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.success(`${product.name} added to cart`);
                            handleAddToCart(product);
                          }}
                          className="flex items-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors duration-200 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (!user) {
                              toast.error("Please log in to add to wishlist");
                              return;
                            }
                            addToWishlist({
                              userId: user.id,
                              productId: String(product.id),
                            });
                            toast.success("Added to wishlist");
                          }}
                          className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-colors duration-200 cursor-pointer"
                        >
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pb-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center disabled:opacity-30 hover:bg-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-colors cursor-pointer ${
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
                className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center disabled:opacity-30 hover:bg-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
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

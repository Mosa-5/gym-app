import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { MappedProduct } from "@/supabase/products";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ProductCardProps {
  product: MappedProduct;
  /** Alternating background tint based on the product's position in the grid. */
  isEven: boolean;
  onAddToCart: (product: MappedProduct) => void;
  onAddToWishlist: (product: MappedProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isEven,
  onAddToCart,
  onAddToWishlist,
}) => {
  const { t } = useTranslation();

  return (
    <Link to={`/dashboard/productDetail/${product.id}`}>
      <motion.div
        variants={gridItem}
        className="group relative rounded-2xl overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300"
      >
        {/* Alternating bg */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: isEven
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

        <div className="relative z-10 flex flex-col items-center p-3 pb-4 gap-1 sm:p-5 sm:pb-6 sm:gap-2 2xl:p-6 2xl:pb-8">
          <img
            src={product.image_url[0]}
            alt={product.name}
            loading="lazy"
            className="h-24 sm:h-40 2xl:h-52 object-contain rounded-full mb-4 sm:mb-6"
          />
          <h3 className="text-xs sm:text-sm 2xl:text-lg font-semibold text-start w-full max-w-60 tracking-wide text-white truncate">
            {product.name}
          </h3>
          <div className="flex flex-col items-stretch gap-2 sm:gap-3 w-full max-w-60">
            <div className="flex items-center justify-between gap-3 sm:gap-5">
              <p className="text-xl sm:text-2xl 2xl:text-3xl font-black text-white">
                ${Number(product.price).toFixed(2)}
              </p>
              <div className="flex items-center gap-1">
                {/* Mobile: single star + numeric rating */}
                <div className="flex sm:hidden items-center gap-1">
                  <Star
                    className={`w-3.5 h-3.5 ${
                      product.avgRating !== null
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-white/20 text-white/20"
                    }`}
                  />
                  <span className="text-xs font-semibold text-white/90">
                    {product.avgRating !== null
                      ? product.avgRating.toFixed(1)
                      : "—"}
                  </span>
                </div>
                {/* Desktop: full 5-star row */}
                <div className="hidden sm:flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`sm:w-4 sm:h-4 ${
                        product.avgRating !== null &&
                        star <= Math.round(product.avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-white/20 text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-white/15" />
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onAddToCart(product);
                }}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-neutral-300 text-neutral-900 text-[10px] sm:text-xs 2xl:text-sm font-semibold uppercase tracking-wider px-2.5 py-2.5 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5 w-full rounded-full transition-colors duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                {t("products.addToCart")}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onAddToWishlist(product);
                }}
                className="flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Heart className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

import { Link } from "react-router-dom";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/componentsShadcn/ui/card";
import { CarouselItem } from "@/componentsShadcn/ui/carousel";
import type { MappedProduct } from "@/supabase/products";
import { carouselItem, card, cardContent, image } from "./carousel.styles";
import { crosshatchPattern } from "@/lib/crosshatchPattern";
import { useTranslation } from "react-i18next";

interface CarouselCardProps {
  product: MappedProduct;
  /** Alternating red/dark background tint based on the card's index. */
  isRed: boolean;
  onAddToCart: (e: React.MouseEvent, product: MappedProduct) => void;
  onAddToWishlist: (e: React.MouseEvent, productId: number) => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  product,
  isRed,
  onAddToCart,
  onAddToWishlist,
}) => {
  const { t } = useTranslation();

  return (
    <CarouselItem className={carouselItem()}>
      <Link to={`/dashboard/productDetail/${product.id}`}>
        <div className="p-0.5 sm:p-1">
          <Card className={card()}>
            {/* Alternating bg + pattern */}
            <div
              className="absolute inset-0 pointer-events-none z-0 rounded-[inherit]"
              style={{
                background: isRed
                  ? "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)"
                  : "linear-gradient(135deg, rgb(35 35 35) 0%, rgb(20 20 20) 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-[1] rounded-[inherit] opacity-[0.06]"
              style={{
                backgroundImage: crosshatchPattern,
              }}
            />
            {/* Shine sweep on hover */}
            <div className="absolute inset-0 z-[2] pointer-events-none rounded-[inherit] overflow-hidden">
              <div className="card-shine-inner absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-15deg]" />
            </div>
            <CardContent className={cardContent() + " relative z-10"}>
              <img
                src={product.image_url[0]}
                alt={product.name}
                loading="lazy"
                className={image()}
              />
              <p className="text-sm 2xl:text-lg font-semibold text-start w-full max-w-60 tracking-wide text-white truncate">
                {product.name}
              </p>
              <div className="flex flex-col items-stretch gap-2 sm:gap-3 w-full max-w-60">
                <div className="flex items-center justify-between gap-3 sm:gap-5">
                  <p className="text-2xl 2xl:text-3xl font-black text-white">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1">
                    {/* Mobile: single star + numeric rating */}
                    <div className="flex sm:hidden items-center gap-1">
                      <Star
                        className={`w-4 h-4 ${
                          product.avgRating !== null
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-white/20 text-white/20"
                        }`}
                      />
                      <span className="text-sm font-semibold text-white/90">
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
                    onClick={(e) => onAddToCart(e, product)}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-neutral-300 text-neutral-900 text-xs 2xl:text-sm font-semibold uppercase tracking-wider px-3 py-2.5 sm:px-4 sm:py-2 2xl:px-5 2xl:py-2.5 w-full rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                    {t("common.addToCart")}
                  </button>
                  <button
                    onClick={(e) => onAddToWishlist(e, product.id)}
                    className="flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 sm:w-7 sm:h-7" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Link>
    </CarouselItem>
  );
};

export default CarouselCard;

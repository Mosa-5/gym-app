import { Card, CardContent } from "@/componentsShadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/componentsShadcn/ui/carousel";
import {
  wrapper,
  carousel,
  carouselItem,
  card,
  cardContent,
  image,
} from "./carousel.styles";
import {
  useGetProductListWithBestSelling,
  useGetProductListWithCategory,
  useGetProductListWithWorstSelling,
} from "@/reactQuery/query/products";
import { mapProductTableData } from "@/supabase/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

interface CarouselProps {
  productType?: string;
  headerText: string;
  carouselType: "bestSelling" | "category" | "worstSelling";
}

const CaruselForPages: React.FC<CarouselProps> = ({
  productType,
  headerText,
  carouselType,
}) => {
  const { data: productWithCategory = [] } = useGetProductListWithCategory(
    { queryOptions: { select: mapProductTableData } },
    productType,
  );

  const { data: productBestSelling = [] } = useGetProductListWithBestSelling({
    queryOptions: { select: mapProductTableData },
  });

  const { data: productWorstSelling = [] } = useGetProductListWithWorstSelling({
    queryOptions: { select: mapProductTableData },
  });

  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
  const { mutate: addToWishlist } = useAddToWishlist();

  const handleAddToCart = (
    e: React.MouseEvent,
    product: ReturnType<typeof mapProductTableData>[number],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
      created_at: product.created_at,
      description: product.description,
      image_url: product.image_url,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleFavourite = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please log in to add to wishlist");
      return;
    }
    addToWishlist({ userId: user.id, productId: String(productId) });
    toast.success("Added to wishlist");
  };

  // Select the products based on carouselType
  const products = (() => {
    switch (carouselType) {
      case "bestSelling":
        return productBestSelling;
      case "worstSelling":
        return productWorstSelling;
      case "category":
      default:
        return productWithCategory;
    }
  })();

  return (
    <motion.div
      className={wrapper()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <SectionHeading text={headerText} />
      <Carousel
        opts={{
          align: "start",
        }}
        className={carousel()}
      >
        <CarouselContent>
          {products.map((product, index) => {
            const isRed = index % 2 === 0;
            return (
              <CarouselItem key={index} className={carouselItem()}>
                <Link to={`/dashboard/productDetail/${product.id}`}>
                  <div className="p-1">
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
                        <div className="flex flex-col items-stretch gap-2 w-full max-w-60">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xl sm:text-2xl 2xl:text-3xl font-black text-white">
                              ${Number(product.price).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
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
                              onClick={(e) => handleAddToCart(e, product)}
                              className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-300 text-neutral-900 text-xs 2xl:text-sm font-semibold uppercase tracking-wider px-4 py-2 2xl:px-5 2xl:py-2.5 w-full rounded-full transition-colors duration-200 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 hidden sm:block" />
                              Add to Cart
                            </button>
                            <button
                              onClick={(e) => handleFavourite(e, product.id)}
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
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default CaruselForPages;

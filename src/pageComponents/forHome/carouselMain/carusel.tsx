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
  productName,
  productPrice,
} from "./carousel.styles";
import {
  useGetProductListWithBestSelling,
  useGetProductListWithCategory,
  useGetProductListWithWorstSelling,
} from "@/reactQuery/query/products";
import { mapProductTableData } from "@/supabase/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";

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
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
                          className={image()}
                        />
                        <p className={productName()}>{product.name}</p>
                        <p className={productPrice()}>{product.price}$</p>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => handleFavourite(e, product.id)}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-colors duration-200 cursor-pointer"
                          >
                            <Star className="w-4 h-4" />
                          </button>
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

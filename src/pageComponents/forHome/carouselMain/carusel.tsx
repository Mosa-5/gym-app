import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/componentsShadcn/ui/carousel";
import { wrapper, carousel } from "./carousel.styles";
import {
  useGetProductListWithBestSelling,
  useGetProductListWithCategory,
  useGetProductListWithWorstSelling,
} from "@/reactQuery/query/products";
import { mapProductTableData, type MappedProduct } from "@/supabase/products";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import CarouselCard from "./carouselCard";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

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

  const handleAddToCart = (e: React.MouseEvent, product: MappedProduct) => {
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
    toast.success(t("common.addedToCart", { name: product.name }));
  };

  const handleFavourite = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error(t("products.loginForWishlist"));
      return;
    }
    addToWishlist({ userId: user.id, productId: String(productId) });
    toast.success(t("products.addedToWishlist"));
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
        setApi={setApi}
        className={carousel()}
      >
        <CarouselContent className="ml-0 sm:-ml-4">
          {products.map((product, index) => (
            <CarouselCard
              key={index}
              product={product}
              isRed={index % 2 === 0}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleFavourite}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      {/* Mobile scroll indicator (replaces arrows on phones) */}
      {scrollSnaps.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={t("common.goToSlide", { number: index + 1 })}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 bg-brand"
                  : "w-2 bg-neutral-400/50 dark:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CaruselForPages;

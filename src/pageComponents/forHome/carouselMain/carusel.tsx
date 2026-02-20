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
  heading,
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
      <h1 className={heading()}>{headerText}</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className={carousel()}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className={carouselItem()}>
              <Link to={`/dashboard/productDetail/${product.id}`}>
                <div className="p-1">
                  <Card className={card()}>
                    <CardContent className={cardContent()}>
                      <img
                        src={product.image_url[0]}
                        alt={product.name}
                        className={`${image()} border border-gray-300`}
                      />
                      <p className={productName()}>{product.name}</p>
                      <p className={productPrice()}>{product.price}$</p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default CaruselForPages;

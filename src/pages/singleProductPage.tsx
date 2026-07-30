import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CarouselForPages from "@/pageComponents/forHome/carouselMain/carousel";
import ReviewList from "@/pageComponents/forSingleProductPage/comments/comments";
import ProductDetail from "@/pageComponents/forSingleProductPage/productDetail/productDetail";
import { Loader } from "@/pageComponents/loader/loader";
import { useGetSingleProduct } from "@/reactQuery/query/products";
import { mapSingleProductTableData } from "@/supabase/products";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const SingleProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: product, isLoading } = useGetSingleProduct(
    {
      queryOptions: {
        select: mapSingleProductTableData,
        enabled: !!id,
      },
    },
    id,
  );

  // Left undefined while loading so the tab shows the site default rather than
  // "undefined — GymGear"; it fills in once the product arrives.
  useDocumentMeta({
    title: product?.name,
    description: product
      ? t("seo.productDescription", {
          name: product.name,
          price: `$${product.price}`,
        })
      : undefined,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      {product && <ProductDetail product={product} />}
      <CarouselForPages
        productType={product?.category}
        headerText={t("common.youMayAlsoLike")}
        carouselType="category"
      />
      <ReviewList />
    </>
  );
};

export default SingleProductPage;

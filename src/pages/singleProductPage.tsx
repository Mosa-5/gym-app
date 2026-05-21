import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CaruselForPages from "@/pageComponents/forHome/carouselMain/carusel";
import ReviewList from "@/pageComponents/forSingleProductPage/comments/comments";
import ProductDetail from "@/pageComponents/forSingleProductPage/productDetail/productDetail";
import { Loader } from "@/pageComponents/loader/loader";
import { useGetSingleProduct } from "@/reactQuery/query/products";
import { mapSingleProductTableData } from "@/supabase/products";

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

  if (isLoading) return <Loader />;

  return (
    <>
      {product && <ProductDetail product={product} />}
      <CaruselForPages
        productType={product?.category}
        headerText={t("common.youMayAlsoLike")}
        carouselType="category"
      />
      <ReviewList />
    </>
  );
};

export default SingleProductPage;

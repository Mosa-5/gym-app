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
      <div className="flex mb-20 2xl:mb-28 flex-col items-center px-6 md:px-20 2xl:px-0 gap-6 2xl:gap-10">
        <h2 className="text-2xl sm:text-3xl 2xl:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white w-full max-w-screen-lg 2xl:max-w-[1400px] text-center">
          {t("reviews.reviews")}
        </h2>
        <ReviewList />
      </div>
    </>
  );
};

export default SingleProductPage;

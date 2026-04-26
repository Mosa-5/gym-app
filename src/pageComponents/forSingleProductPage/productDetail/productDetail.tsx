import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import { useGetProductReviews } from "@/reactQuery/query/reviews";

interface Product {
  id: number;
  name: string;
  price: string | number;
  category: string;
  created_at: string;
  description: string;
  image_url: string[];
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { addToCart } = useCartContext();
  const { mutate: addToWishlistMutate } = useAddToWishlist();

  const { data: reviews = [] } = useGetProductReviews({
    productId: product.id.toString(),
  });

  const avgRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
            reviews.length,
        )
      : 0;

  const images = (product.image_url || []).slice(0, 3);
  const [mainImage, setMainImage] = useState<string>(product.image_url?.[0]);

  useEffect(() => {
    if (product.image_url?.[0]) {
      setMainImage(product.image_url[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(t("common.addedToCart", { name: product.name }));
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error(t("common.needSignIn"));
      return;
    }
    toast.success(t("common.addedToFavourites"));
    addToWishlistMutate({ productId: product.id.toString(), userId: user.id });
  };

  return (
    <div className="flex justify-center p-6 2xl:p-16">
      <div className="max-w-sm sm:max-w-md flex flex-col items-center md:flex-row md:max-w-screen-lg 2xl:max-w-[1400px] gap-10 2xl:gap-20 w-full justify-between p-5 2xl:p-10">
        {/* Image Section */}
        <div className="flex flex-col items-center">
          <div className="max-w-xs md:max-w-sm 2xl:max-w-lg flex justify-center items-center">
            <img
              src={mainImage || product.image_url?.[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex gap-3 2xl:gap-4 mt-4 2xl:mt-6">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 2xl:w-20 2xl:h-20 object-cover cursor-pointer border-2 rounded-lg transition-all duration-300 hover:border-black dark:hover:border-white hover:scale-110 ${
                  mainImage === img
                    ? "border-black dark:border-white border-2 scale-110"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col flex-1 max-w-prose 2xl:max-w-2xl">
          <span className="text-xs 2xl:text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-2 2xl:mb-3">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 2xl:gap-6 mt-3 2xl:mt-5">
            <span className="text-2xl 2xl:text-4xl font-black text-neutral-900 dark:text-white">
              ${product.price}
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 2xl:w-6 2xl:h-6 ${
                    star <= avgRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600"
                  }`}
                />
              ))}
              {reviews.length > 0 && (
                <span className="ml-1.5 text-sm 2xl:text-base font-semibold text-neutral-500 dark:text-neutral-400">
                  ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </span>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-5 2xl:my-8" />

          <p className="text-sm 2xl:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 2xl:gap-4 mt-8 2xl:mt-12">
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm 2xl:text-base uppercase tracking-wider rounded-full py-3.5 2xl:py-5 transition-colors duration-200 cursor-pointer"
            >
              {t("common.addToCart")}
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-full bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-sm 2xl:text-base uppercase tracking-wider rounded-full py-3.5 2xl:py-5 border border-neutral-300 dark:border-neutral-700 transition-colors duration-200 cursor-pointer"
            >
              {t("common.addToFavourites")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

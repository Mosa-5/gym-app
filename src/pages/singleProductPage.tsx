// import image from "@/assets/10mm-lever-belt-black-black-main.webp"
import { Button } from "@/componentsShadcn/ui/button";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import CaruselForPages from "@/pageComponents/forHome/carouselMain/carusel";
import FeaturesSection from "@/pageComponents/forHome/featuresSection/featuresSection";
import VirtualizedReviewList from "@/pageComponents/forSingleProductPage/comments/comments";
import { Loader } from "@/pageComponents/loader/loader";
import { useAddToWishlist } from "@/reactQuery/mutations/whishlist";
import { useGetSingleProduct } from "@/reactQuery/query/products";
import { mapSingleProductTableData } from "@/supabase/products";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { addToCart } = useCartContext();

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: string | number;
    category: string;
    created_at: string;
    description: string;
    image_url: string[];
  }) => {
    addToCart({ ...product, quantity: 1 });
  };

  const { data: product, isLoading } = useGetSingleProduct(
    {
      queryOptions: {
        select: mapSingleProductTableData,
        enabled: !!id,
      },
    },
    id,
  );

  const { mutate: addToWishlistMutate } = useAddToWishlist();

  const images = (product?.image_url || []).slice(0, 3);

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (product?.image_url?.[0]) {
      setMainImage(product.image_url[0]);
    }
  }, [product]);

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("You need to be Signed In for this action!");
      return;
    }
    toast.success("Item Added To Favourites");
    return addToWishlistMutate({
      productId: product?.id.toString(),
      userId: user.id,
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-center p-6">
        <div
          className=" max-w-sm sm:max-w-md flex flex-col items-center  md:flex-row md:max-w-screen-lg gap-10 w-full justify-between
        p-5"
        >
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="max-w-xs md:max-w-sm flex justify-center items-center">
              <img
                src={mainImage || product?.image_url?.[0]}
                alt={product?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-lg transition-all duration-300 hover:border-black dark:hover:border-white hover:scale-110 ${
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
          <div className="flex flex-col gap-0 flex-1 max-w-prose">
            <h1 className="text-2xl font-bold dark:text-white">
              {product?.name}
            </h1>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-400">
              {product?.price}$
            </p>
            <div className="flex items-center gap-1 dark:text-white">
              <h1 className="font-semibold">Rating:</h1>
              <h1 className="text-lg font-semibold">5.0</h1>
              <svg
                className="h-5 w-5 fill-yellow-500"
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <p className="text-gray-700 mt-3 dark:text-gray-400">
              {product?.description}
            </p>
            {/* <p className="text-sm text-gray-500">The model is wearing a size Medium.</p> */}
            <div className="flex flex-col gap-2 sm:flex-row justify-center mt-8 ">
              <Button
                onClick={() => {
                  toast("Item Added To Cart✅");
                  return product && handleAddToCart(product);
                }}
                className="max-w-md w-full"
              >
                Add To Cart
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant={"secondary"}
                className="max-w-md w-full"
              >
                Add To Favourites
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CaruselForPages
        productType={product?.category}
        headerText="Your May Also Like"
        carouselType="category"
      />
      <div className="flex mb-20 flex-col items-center px-10 md:px-20 gap-4">
        <h1 className="text-2xl sm:text-3xl block h-12 dark:text-white font-semibold border-b-black dark:border-b-white border-b-2 w-full max-w-screen-lg text-center">
          Reviews
        </h1>
        <VirtualizedReviewList />
      </div>

      <FeaturesSection />
    </>
  );
};

export default ProductDetail;

// import image from "@/assets/10mm-lever-belt-black-black-main.webp"
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import CaruselForPages from "@/pageComponents/forHome/carouselMain/carusel";
import ReviewList from "@/pageComponents/forSingleProductPage/comments/comments";
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
          <div className="flex flex-col flex-1 max-w-prose">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              {product?.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
              {product?.name}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <span className="text-2xl font-black text-neutral-900 dark:text-white">
                ${product?.price}
              </span>
              <div className="flex items-center gap-1">
                <svg
                  className="h-5 w-5 fill-brand"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">5.0</span>
              </div>
            </div>

            <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-5" />

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {product?.description}
            </p>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => {
                  toast.success(`${product?.name} added to cart`);
                  return product && handleAddToCart(product);
                }}
                className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 transition-colors duration-200 cursor-pointer"
              >
                Add To Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-full bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 border border-neutral-300 dark:border-neutral-700 transition-colors duration-200 cursor-pointer"
              >
                Add To Favourites
              </button>
            </div>
          </div>
        </div>
      </div>
      <CaruselForPages
        productType={product?.category}
        headerText="Your May Also Like"
        carouselType="category"
      />
      <div className="flex mb-20 flex-col items-center px-6 md:px-20 gap-6">
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white w-full max-w-screen-lg text-center">
          Reviews
        </h2>
        <ReviewList />
      </div>
    </>
  );
};

export default ProductDetail;

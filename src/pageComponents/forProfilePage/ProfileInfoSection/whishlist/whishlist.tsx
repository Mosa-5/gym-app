import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/componentsShadcn/ui/card";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useGetWishlistedProducts } from "@/reactQuery/query/whishlist";
import emptyWishlistsSvg from "@/assets/undraw_wishlist_71gv.svg";
import { Link } from "react-router-dom";
import { Button } from "@/componentsShadcn/ui/button";
import { useDeleteWishlistItem } from "@/reactQuery/mutations/whishlist";
import { toast } from "sonner";
import { mapWishlistItemData } from "@/supabase/whishlist";

const Wishlist = () => {
  const { user } = useAuthContext();

  const { data: wishlistProducts = [], isLoading } = useGetWishlistedProducts(
    { queryOptions: { select: mapWishlistItemData } },
    user?.id,
  );

  const { mutate: deleteWishlistItem } = useDeleteWishlistItem();

  const deleteWishlist = (
    userId: string,
    productId: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    deleteWishlistItem({ userId: userId, productId: productId });
    toast("Wishlist Item Deleted");
  };

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Card className="border-none shadow-none bg-transparent dark:bg-transparent dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-center">
              {wishlistProducts.length}{" "}
              {wishlistProducts.length !== 1 ? "Wishlists" : "Wishlist"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-4 flex-wrap justify-center">
              {wishlistProducts.length === 0 ? (
                <img
                  src={emptyWishlistsSvg}
                  alt="No wishlists"
                  className="max-w-72 m-auto"
                />
              ) : (
                wishlistProducts.map((item) => {
                  return (
                    <Link
                      className="w-60 transform-all duration-200 hover:-translate-y-2"
                      to={`/dashboard/productDetail/${item.product.id}`}
                    >
                      <div
                        key={item.id}
                        className="flex-1 max-w-60  cursor-pointer"
                      >
                        <div className="group hover:border-black  dark:hover:border-white border-2 bg-white rounded-lg  hover:shadow-md hover:bg-gray-100 dark:hover:bg-neutral-900 transiton-shadow duration-200  dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
                          <div className="w-full p-4 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 group-hover:scale-110 transform-all duration-200">
                              <img
                                src={item.product.image_url[0]}
                                alt={item.product.name}
                                className="w-full h-full object-contai"
                              />
                            </div>
                          </div>
                          <div className="px-4 pb-4 flex-1 flex justify-center">
                            <h3 className="text-base font-medium truncate">
                              {item.product.name}
                            </h3>
                          </div>
                          <div className="px-2 pb-2 flex-1 flex justify-center w-full">
                            <Button
                              onClick={(e) =>
                                deleteWishlist(item.user_id, item.product.id, e)
                              }
                              variant={"destructive"}
                              className="bg-destructive hover:bg-destructive-hover"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Wishlist;

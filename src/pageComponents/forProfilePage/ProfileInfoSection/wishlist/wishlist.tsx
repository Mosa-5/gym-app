import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { useGetWishlistedProducts } from "@/reactQuery/query/wishlist";
import emptyWishlistsSvg from "@/assets/undraw_wishlist_71gv.svg";
import { Link } from "react-router-dom";
import { useDeleteWishlistItem } from "@/reactQuery/mutations/wishlist";
import { notify } from "@/lib/notify";
import { mapWishlistItemData } from "@/supabase/wishlist";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const Wishlist = () => {
  const { t } = useTranslation();
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
    notify.message(t("wishlist.removed"));
  };

  if (isLoading) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl 2xl:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          {t("wishlist.wishlist")}
        </h2>
        <p className="text-sm 2xl:text-base text-neutral-500 mt-1">
          {wishlistProducts.length}{" "}
          {wishlistProducts.length !== 1
            ? t("wishlist.items")
            : t("wishlist.item")}{" "}
          {t("wishlist.saved")}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-5">
          <div
            className="relative w-44 h-44 2xl:w-64 2xl:h-64 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: crosshatchPattern,
              }}
            />
            <img
              src={emptyWishlistsSvg}
              alt=""
              className="relative w-24 h-24 2xl:w-36 2xl:h-36 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm 2xl:text-base font-medium">
            {t("wishlist.emptyWishlist")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-6">
          {wishlistProducts.map((item) => (
            <Link
              key={item.id}
              to={`/dashboard/productDetail/${item.product.id}`}
              className="group"
            >
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                {/* Image */}
                <div className="flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={item.product.image_url[0]}
                    alt={item.product.name}
                    className="w-28 h-28 2xl:w-36 2xl:h-36 object-contain rounded-full"
                  />
                </div>

                {/* Info */}
                <div className="p-3 text-center">
                  <h3 className="text-sm 2xl:text-base font-semibold text-neutral-900 dark:text-white truncate">
                    {item.product.name}
                  </h3>
                  <div className="mt-2">
                    <button
                      onClick={(e) =>
                        deleteWishlist(item.user_id, item.product.id, e)
                      }
                      className="flex items-center justify-center gap-1.5 w-full text-xs 2xl:text-sm font-semibold text-neutral-400 hover:text-brand transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                      {t("wishlist.remove")}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

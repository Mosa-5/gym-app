import { Link } from "react-router-dom";
import { useGetUserOrders } from "@/reactQuery/query/order";
import { mapOrdersData } from "@/supabase/order";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import emptyOrdersSvg from "@/assets/undraw_empty_4zx0.svg";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";

const Orders = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const {
    data: userOrders = [
      {
        status: "idk",
        created_at: "idk",
        total_price: 0,
        updated_at: "idk",
        user_id: "0",
        id: 0,
        item: [
          {
            productId: 0,
            name: "",
            price: 0,
            quantity: 0,
            category: "",
            created_at: "",
            description: "",
            image_url: [""],
          },
        ],
      },
    ],
    isLoading,
  } = useGetUserOrders({ queryOptions: { select: mapOrdersData } }, user?.id);

  const formatTimestamp = (isoString: string) =>
    new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (isLoading) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl 2xl:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          {t("orders.yourOrders")}
        </h2>
        <p className="text-sm 2xl:text-base text-neutral-500 mt-1">
          {userOrders.length}{" "}
          {userOrders.length !== 1 ? t("orders.orders") : t("orders.order")}{" "}
          {t("orders.placed")}
        </p>
      </div>

      {userOrders.length === 0 ? (
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
              src={emptyOrdersSvg}
              alt=""
              className="relative w-24 h-24 2xl:w-36 2xl:h-36 object-contain"
            />
          </div>
          <p className="text-neutral-500 text-sm 2xl:text-base font-medium">
            {t("orders.noOrders")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {userOrders.map((order) => (
            <Link key={order.id} to={`/dashboard/orders/${order.id}`}>
              <div className="flex items-center gap-4 2xl:gap-6 p-4 2xl:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors group">
                {/* Product image */}
                <img
                  className="w-14 h-14 2xl:w-20 2xl:h-20 rounded-xl object-cover flex-shrink-0"
                  src={order.item[0].image_url[0]}
                  alt=""
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm 2xl:text-base font-bold text-neutral-900 dark:text-white">
                      {t("orders.orderNumber")}
                      {order.id}
                    </span>
                    <span className="text-xs 2xl:text-sm text-neutral-400">
                      {formatTimestamp(order.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm 2xl:text-base font-semibold text-neutral-900 dark:text-white">
                      ${order.total_price}
                    </span>
                    <span className="text-xs 2xl:text-sm text-neutral-400">
                      ({order.item.length}{" "}
                      {order.item.length === 1
                        ? t("cart.item")
                        : t("cart.items")}
                      )
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 2xl:w-6 2xl:h-6 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

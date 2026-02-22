import { useGetUserSingleOrder } from "@/reactQuery/query/order";
import { mapSingleOrdersData } from "@/supabase/order";
import { useParams, Link } from "react-router-dom";
import { Package, ArrowLeft, Truck } from "lucide-react";

const IdOrder = () => {
  const { OrderId } = useParams();
  const {
    data: userOrder = {
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
    isLoading,
  } = useGetUserSingleOrder(
    { queryOptions: { select: mapSingleOrdersData } },
    OrderId,
  );

  const formatTimestamp = (isoString: string) =>
    new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const totalItems = userOrder.item.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero header */}
      <div className="bg-neutral-950 py-12 px-6">
        <div className="max-w-screen-lg mx-auto">
          <Link
            to="/dashboard/profilePage"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-brand" />
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Order #{userOrder.id}
            </h1>
          </div>
          <p className="text-sm text-neutral-400">
            Placed on {formatTimestamp(userOrder.created_at)}
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Items */}
          <div className="flex-1 flex flex-col gap-4">
            {userOrder.item.map((product) => (
              <div
                key={product.productId}
                className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              >
                <img
                  src={product.image_url[0]}
                  alt={product.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0 bg-neutral-100 dark:bg-neutral-800"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5 uppercase tracking-wider">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-neutral-500">
                      Qty: {product.quantity} × ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                      ${(Number(product.price) * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order summary */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Items ({totalItems})
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    ${userOrder.total_price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Delivery
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    $2.00
                  </span>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-black text-neutral-900 dark:text-white">
                      ${(userOrder.total_price + 2).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdOrder;

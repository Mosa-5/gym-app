import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { usePlaceOrder } from "@/reactQuery/mutations/order";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { toast } from "sonner";
import emptyCartSVG from "@/assets/undraw_empty-cart_574u.svg";
import { Minus, Plus, Trash2, ShoppingBag, Truck, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from '@/lib/crosshatchPattern';

const CartPage = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, clearCart, changeQuantity } = useCartContext();
  const { user } = useAuthContext();

  const totalCost = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const deliveryCost = 2;
  const finalCost = totalCost + deliveryCost;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const { mutate: placeOrder, isPending, isError } = usePlaceOrder();

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      return;
    } else if (user === null) {
      toast.error(t("cart.needSignIn"));
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      created_at: item.created_at,
      description: item.description,
      image_url: item.image_url,
    }));

    placeOrder({
      userId: user.id,
      items: orderItems,
      totalPrice: totalCost,
    });
  };

  if (isError) {
    toast.error(t("cart.orderFailed"));
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface">
      {/* Hero header */}
      <div className="bg-neutral-950 py-12 2xl:py-16 px-6 2xl:px-8">
        <div className="max-w-screen-lg 2xl:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-6 h-6 2xl:w-8 2xl:h-8 text-brand" />
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black uppercase tracking-tight text-white">
              {t("cart.yourCart")}
            </h1>
          </div>
          <p className="text-sm 2xl:text-base text-neutral-400">
            {totalItems} {totalItems !== 1 ? t("cart.items") : t("cart.item")}{" "}
            {t("cart.inYourCart")}
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 2xl:px-8 py-8 2xl:py-12 pb-20 2xl:pb-28">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-5">
            <div
              className="relative w-52 h-52 2xl:w-72 2xl:h-72 rounded-full flex items-center justify-center overflow-hidden"
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
                src={emptyCartSVG}
                alt=""
                className="relative w-28 h-28 2xl:w-40 2xl:h-40 object-contain"
              />
            </div>
            <p className="text-neutral-500 text-sm 2xl:text-lg font-medium">
              {t("cart.emptyCart")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 2xl:gap-12">
            {/* Left: Cart items */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 2xl:gap-6 p-4 2xl:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                  >
                    {/* Image */}
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 2xl:w-32 2xl:h-32 rounded-xl object-cover flex-shrink-0 bg-neutral-100 dark:bg-neutral-800"
                    />

                    {/* Info + controls */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base 2xl:text-lg font-bold text-neutral-900 dark:text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs 2xl:text-sm text-neutral-400 mt-0.5">
                        ${Number(product.price).toFixed(2)} {t("cart.each")}
                      </p>

                      {/* Quantity + total row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              changeQuantity(product.id.toString(), "decrement")
                            }
                            className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-600 dark:text-neutral-300" />
                          </button>
                          <span className="w-8 2xl:w-10 text-center text-sm 2xl:text-base font-semibold text-neutral-900 dark:text-white">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeQuantity(product.id.toString(), "increment")
                            }
                            className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-600 dark:text-neutral-300" />
                          </button>
                        </div>

                        <span className="text-sm sm:text-base 2xl:text-lg font-bold text-neutral-900 dark:text-white">
                          $
                          {(Number(product.price) * product.quantity).toFixed(
                            2,
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(product.id.toString())}
                      className="p-2 2xl:p-3 rounded-full text-neutral-400 hover:text-brand hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex-shrink-0 self-start"
                    >
                      <Trash2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon + Clear row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 2xl:mt-8">
                <div className="flex-1 flex items-center gap-2 px-4 h-10 2xl:h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <Tag className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={t("cart.couponCode")}
                    className="flex-1 bg-transparent text-sm 2xl:text-base outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
                  />
                </div>
                <button className="h-10 2xl:h-12 px-6 2xl:px-8 rounded-full bg-neutral-900 dark:bg-neutral-800 text-white text-sm 2xl:text-base font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                  {t("cart.apply")}
                </button>
                <button
                  onClick={clearCart}
                  className="h-10 2xl:h-12 px-6 2xl:px-8 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm 2xl:text-base font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
                >
                  {t("cart.clearCart")}
                </button>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="w-full lg:w-80 2xl:w-[420px] lg:flex-shrink-0">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 2xl:p-8 lg:sticky lg:top-24">
                <h2 className="text-base 2xl:text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-5 2xl:mb-7">
                  {t("cart.orderSummary")}
                </h2>

                <div className="space-y-3 2xl:space-y-4 text-sm 2xl:text-base">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">
                      {t("cart.subtotal")} ({totalItems} {t("cart.items")})
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                      {t("cart.delivery")}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${deliveryCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        {t("cart.total")}
                      </span>
                      <span className="text-lg 2xl:text-2xl font-black text-neutral-900 dark:text-white">
                        ${finalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0 || isPending}
                  className="w-full mt-6 2xl:mt-8 py-3 2xl:py-4 bg-brand hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm 2xl:text-base uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {isPending ? t("cart.placingOrder") : t("cart.placeOrder")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

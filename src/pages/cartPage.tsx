import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { usePlaceOrder } from "@/reactQuery/mutations/order";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { toast } from "sonner";
import emptyCartSVG from "@/assets/undraw_empty-cart_574u.svg";
import { Minus, Plus, Trash2, ShoppingBag, Truck, Tag } from "lucide-react";

const CartPage = () => {
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
      toast.error("You need to be signed in to place an order.");
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
    toast.error("Failed to place order. Please try again.");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero header */}
      <div className="bg-neutral-950 py-12 px-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-6 h-6 text-brand" />
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Your Cart
            </h1>
          </div>
          <p className="text-sm text-neutral-400">
            {totalItems} {totalItems !== 1 ? "items" : "item"} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8 pb-20">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-5">
            <div
              className="relative w-52 h-52 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.384l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656L40.2 36.485l1.415 1.413L60 19.514v-2.83zm0 5.657L43.03 39.313l1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.414 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.414 1.415L30 6.486l9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.142l7.07 7.07zm-2.827 2.83l1.414-1.415L30 14.97l-5.657 5.657 1.414 1.414L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />
              <img
                src={emptyCartSVG}
                alt=""
                className="relative w-28 h-28 object-contain"
              />
            </div>
            <p className="text-neutral-500 text-sm font-medium">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart items */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                  >
                    {/* Image */}
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0 bg-neutral-100 dark:bg-neutral-800"
                    />

                    {/* Info + controls */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        ${Number(product.price).toFixed(2)} each
                      </p>

                      {/* Quantity + total row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              changeQuantity(product.id.toString(), "decrement")
                            }
                            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-neutral-900 dark:text-white">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeQuantity(product.id.toString(), "increment")
                            }
                            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
                          </button>
                        </div>

                        <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
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
                      className="p-2 rounded-full text-neutral-400 hover:text-brand hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex-shrink-0 self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon + Clear row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                <div className="flex-1 flex items-center gap-2 px-4 h-11 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <Tag className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 bg-transparent text-sm outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
                  />
                </div>
                <button className="h-11 px-6 rounded-full bg-neutral-900 dark:bg-neutral-800 text-white text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                  Apply
                </button>
                <button
                  onClick={clearCart}
                  className="h-11 px-6 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
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
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      Delivery
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${deliveryCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-lg font-black text-neutral-900 dark:text-white">
                        ${finalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0 || isPending}
                  className="w-full mt-6 py-3.5 bg-brand hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {isPending ? "Placing Order..." : "Place Order"}
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

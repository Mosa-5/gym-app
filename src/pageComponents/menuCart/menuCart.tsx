import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/componentsShadcn/ui/sheet";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { Link } from "react-router-dom";
import emptyCartSVG from "@/assets/undraw_empty-cart_574u.svg";

const ShoppingCart = () => {
  const { cart, removeFromCart, changeQuantity } = useCartContext();

  const totalPrice = cart.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0,
  );

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger className="relative flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 transition-colors duration-200 cursor-pointer">
        <ShoppingBag className="w-4 h-4 text-neutral-300" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full font-bold leading-none">
            {totalItems}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-md bg-neutral-950 border-l border-neutral-800 text-white p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-neutral-800 pr-14">
          <SheetTitle className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
            <span className="ml-auto text-sm font-semibold text-neutral-400">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#404040 transparent",
          }}
        >
          {cart.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {product.category}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            changeQuantity(product.id.toString(), "decrement")
                          }
                          className="w-6 h-6 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-neutral-300" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            changeQuantity(product.id.toString(), "increment")
                          }
                          className="w-6 h-6 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-neutral-300" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-white">
                        ${(Number(product.price) * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(product.id.toString())}
                    className="self-start p-1.5 rounded-md hover:bg-neutral-800 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 py-10">
              <div
                className="relative w-40 h-40 rounded-full flex items-center justify-center overflow-hidden"
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
                  className="relative w-24 h-24 object-contain"
                />
              </div>
              <p className="text-neutral-500 text-sm font-medium">
                Your cart is empty
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-neutral-400 uppercase tracking-wider font-semibold">
                Subtotal
              </span>
              <span className="text-xl font-black text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <SheetClose asChild>
              <Link to="/dashboard/cartPage">
                <button className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 transition-colors duration-200 cursor-pointer">
                  Checkout
                </button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;

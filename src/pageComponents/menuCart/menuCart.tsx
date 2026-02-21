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

  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

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
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-neutral-800">
          <SheetTitle className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
            <span className="ml-auto text-sm font-semibold text-neutral-400">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#404040 transparent" }}>
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
                          onClick={() => changeQuantity(product.id.toString(), "decrement")}
                          className="w-6 h-6 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-neutral-300" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => changeQuantity(product.id.toString(), "increment")}
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
            <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
              <img src={emptyCartSVG} alt="" className="max-w-40 opacity-50" />
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

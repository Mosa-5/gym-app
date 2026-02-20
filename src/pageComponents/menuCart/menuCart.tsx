// import beltImage from "@/assets/10mm-lever-belt-black-black-main.webp";
import { Button } from "@/componentsShadcn/ui/button";
import { Icons } from "../header/icon.data";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/componentsShadcn/ui/sheet";
import { X } from "lucide-react";
import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { Link } from "react-router-dom";
import emptyCartSVG from "@/assets/undraw_empty-cart_574u.svg";

const ShoppingCart = () => {
  const { cart, removeFromCart } = useCartContext();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative">
          <div>
            {Icons.cart}
            <span className="absolute -top-1 -right-1 border-2 dark:border-white transition-colors duration-200 dark:text-white dark:bg-black border-black bg-white text-black text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {cart.reduce((total, product) => total + product.quantity, 0)}
            </span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-md md:max-w-md dark:text-white"
      >
        <SheetHeader className="mt-8">
          <SheetTitle className="text-center text-3xl">Cart</SheetTitle>
        </SheetHeader>

        <div className="w-full max-w-2xl m-auto py-5 items-center sm:p-5 flex flex-col gap-2">
          <div className="w-full border-y-2 py-7 flex gap-2 max-h-80 overflow-auto flex-col items-center border-black dark:border-white">
            {cart.length > 0 ? (
              cart.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="flex max-w-sm w-full flex-auto border-2 shadow-sm p-4 rounded-xl items-center gap-4 relative"
                  >
                    <Button
                      onClick={() => removeFromCart(product.id.toString())}
                      className="bg-transparent shadow-none p-0 top-0 right-2 hover:bg-nones text-xs absolute text-black dark:text-white opacity-70 hover:opacity-100"
                    >
                      <X />
                    </Button>
                    <div className="max-w-20">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={product.image_url[0]}
                        alt=""
                      />
                    </div>
                    <div className="w-full flex flex-col items-end">
                      <div className="flex text-xs justify-between items-center w-full gap-2 font-semibold">
                        <div>
                          <h1>{product.name}</h1>
                          <h1 className="text-xs font-medium text-gray-700">
                            {product.category}
                          </h1>
                        </div>
                        <h1>
                          ${product.price} x {product.quantity}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <img src={emptyCartSVG} alt="" className="max-w-60 m-auto" />
            )}
          </div>
          <div className="w-full gap-4 flex flex-col sm:flex-row items-center justify-between mt-5">
            <h1 className="text-lg font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </h1>
            <SheetClose asChild>
              <Link
                className="w-full max-w-sm sm:max-w-48"
                to="/dashboard/cartPage"
              >
                <Button className="w-full max-w-sm sm:max-w-48">
                  Checkout
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;

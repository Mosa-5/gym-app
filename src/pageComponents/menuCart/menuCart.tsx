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
import { useTranslation } from "react-i18next";
import { crosshatchPattern } from "@/lib/crosshatchPattern";
import {
  triggerClass,
  badgeClass,
  sheetContentClass,
  headerClass,
  titleClass,
  itemCountClass,
  scrollAreaClass,
  itemListClass,
  itemCardClass,
  itemImageClass,
  itemNameClass,
  itemCategoryClass,
  qtyButtonClass,
  qtyCountClass,
  itemPriceClass,
  removeButtonClass,
  footerClass,
  subtotalLabelClass,
  subtotalValueClass,
  checkoutButtonClass,
} from "./menuCart.styles";

const ShoppingCart = () => {
  const { t } = useTranslation();
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
      <SheetTrigger className={triggerClass()}>
        <ShoppingBag className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-300" />
        {totalItems > 0 && <span className={badgeClass()}>{totalItems}</span>}
      </SheetTrigger>

      <SheetContent
        side="right"
        className={sheetContentClass()}
        aria-describedby={undefined}
      >
        {/* Header */}
        <SheetHeader className={headerClass()}>
          <SheetTitle className={titleClass()}>
            <ShoppingBag className="w-5 h-5 2xl:w-6 2xl:h-6" />
            {t("cart.yourCart")}
            <span className={itemCountClass()}>
              {totalItems} {totalItems === 1 ? t("cart.item") : t("cart.items")}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div
          className={scrollAreaClass()}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#404040 transparent",
          }}
        >
          {cart.length > 0 ? (
            <div className={itemListClass()}>
              {cart.map((product) => (
                <div key={product.id} className={itemCardClass()}>
                  {/* Product image */}
                  <div className={itemImageClass()}>
                    <img
                      src={product.image_url[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <h3 className={itemNameClass()}>{product.name}</h3>
                    <p className={itemCategoryClass()}>{product.category}</p>

                    <div className="flex items-center justify-between mt-2 gap-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            changeQuantity(product.id.toString(), "decrement")
                          }
                          className={qtyButtonClass()}
                        >
                          <Minus className="w-3 h-3 2xl:w-4 2xl:h-4 text-neutral-300" />
                        </button>
                        <span className={qtyCountClass()}>
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            changeQuantity(product.id.toString(), "increment")
                          }
                          className={qtyButtonClass()}
                        >
                          <Plus className="w-3 h-3 2xl:w-4 2xl:h-4 text-neutral-300" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className={itemPriceClass()}>
                        ${(Number(product.price) * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(product.id.toString())}
                    className={removeButtonClass()}
                  >
                    <Trash2 className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 py-10">
              <div
                className="relative w-40 h-40 2xl:w-52 2xl:h-52 rounded-full flex items-center justify-center overflow-hidden"
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
                  className="relative w-24 h-24 2xl:w-32 2xl:h-32 object-contain"
                />
              </div>
              <p className="text-neutral-500 text-sm 2xl:text-base font-medium">
                {t("cart.emptyCartMenu")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={footerClass()}>
            <div className="flex items-center justify-between mb-4">
              <span className={subtotalLabelClass()}>{t("cart.subtotal")}</span>
              <span className={subtotalValueClass()}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <SheetClose asChild>
              <Link to="/dashboard/cartPage">
                <button className={checkoutButtonClass()}>
                  {t("cart.checkout")}
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

import { Trash2, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CartItem as CartItemData } from "@/context/cart";
import {
  itemCardClass,
  itemImageClass,
  itemNameClass,
  itemCategoryClass,
  qtyButtonClass,
  qtyCountClass,
  itemPriceClass,
  removeButtonClass,
} from "./menuCart.styles";

interface CartItemProps {
  product: CartItemData;
  changeQuantity: (id: number, action: "increment" | "decrement") => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  changeQuantity,
  removeFromCart,
}) => {
  const { t } = useTranslation();

  return (
    <div className={itemCardClass()}>
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
              onClick={() => changeQuantity(product.id, "decrement")}
              aria-label={t("a11y.decreaseQuantity")}
              className={qtyButtonClass()}
            >
              <Minus className="w-3 h-3 2xl:w-4 2xl:h-4 text-neutral-300" />
            </button>
            <span className={qtyCountClass()}>{product.quantity}</span>
            <button
              onClick={() => changeQuantity(product.id, "increment")}
              aria-label={t("a11y.increaseQuantity")}
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
        onClick={() => removeFromCart(product.id)}
        aria-label={t("a11y.removeItem")}
        className={removeButtonClass()}
      >
        <Trash2 className="w-[1.125rem] h-[1.125rem] 2xl:w-6 2xl:h-6" />
      </button>
    </div>
  );
};

export default CartItem;

import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CartItem as CartItemData } from "@/context/cart";
import {
  itemCardClass,
  itemImageClass,
  itemNameClass,
  itemUnitPriceClass,
  qtyButtonClass,
  qtyIconClass,
  qtyCountClass,
  itemLineTotalClass,
  removeButtonClass,
} from "./cartItemRow.styles";

interface CartItemRowProps {
  product: CartItemData;
  changeQuantity: (id: number, action: "increment" | "decrement") => void;
  removeFromCart: (id: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  product,
  changeQuantity,
  removeFromCart,
}) => {
  const { t } = useTranslation();

  return (
    <div className={itemCardClass()}>
      {/* Image */}
      <img
        src={product.image_url[0]}
        alt={product.name}
        className={itemImageClass()}
      />

      {/* Info + controls */}
      <div className="flex-1 min-w-0">
        <h3 className={itemNameClass()}>{product.name}</h3>
        <p className={itemUnitPriceClass()}>
          ${Number(product.price).toFixed(2)} {t("cart.each")}
        </p>

        {/* Quantity + total row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => changeQuantity(product.id, "decrement")}
              aria-label={t("a11y.decreaseQuantity")}
              className={qtyButtonClass()}
            >
              <Minus className={qtyIconClass()} />
            </button>
            <span className={qtyCountClass()}>{product.quantity}</span>
            <button
              onClick={() => changeQuantity(product.id, "increment")}
              aria-label={t("a11y.increaseQuantity")}
              className={qtyButtonClass()}
            >
              <Plus className={qtyIconClass()} />
            </button>
          </div>

          <span className={itemLineTotalClass()}>
            ${(Number(product.price) * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(product.id)}
        aria-label={t("a11y.removeItem")}
        className={removeButtonClass()}
      >
        <Trash2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
      </button>
    </div>
  );
};

export default CartItemRow;

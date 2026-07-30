import { useCartContext } from "@/context/cart/hooks/useCartContext";
import { usePlaceOrder } from "@/reactQuery/mutations/order";
import { useAuthContext } from "@/context/auth/hooks/useAuthContext";
import { notify } from "@/lib/notify";
import { useTranslation } from "react-i18next";
import CartHero from "@/pageComponents/forCartPage/cartHero/cartHero";
import CartItemRow from "@/pageComponents/forCartPage/cartItemRow/cartItemRow";
import CouponRow from "@/pageComponents/forCartPage/couponRow/couponRow";
import OrderSummary from "@/pageComponents/forCartPage/orderSummary/orderSummary";
import EmptyCart from "@/pageComponents/forCartPage/emptyCart/emptyCart";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const DELIVERY_COST = 2;

const CartPage = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, clearCart, changeQuantity } = useCartContext();
  const { user } = useAuthContext();
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  useDocumentMeta({
    title: t("seo.cartTitle"),
    description: t("seo.cartDescription"),
  });

  const totalCost = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const finalCost = totalCost + DELIVERY_COST;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    if (user === null) {
      notify.error(t("cart.needSignIn"));
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

    placeOrder(
      { userId: user.id, items: orderItems, totalPrice: totalCost },
      { onError: () => notify.error(t("cart.orderFailed")) },
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface">
      <CartHero totalItems={totalItems} />

      <div className="max-w-screen-lg 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 2xl:px-8 py-8 2xl:py-12 pb-20 2xl:pb-28">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 2xl:gap-12">
            {/* Left: Cart items */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {cart.map((product) => (
                  <CartItemRow
                    key={product.id}
                    product={product}
                    changeQuantity={changeQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>

              <CouponRow onClear={clearCart} />
            </div>

            {/* Right: Order summary */}
            <OrderSummary
              totalItems={totalItems}
              totalCost={totalCost}
              deliveryCost={DELIVERY_COST}
              finalCost={finalCost}
              isPending={isPending}
              disabled={cart.length === 0 || isPending}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

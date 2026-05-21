import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  summaryWrapperClass,
  summaryCardClass,
  summaryTitleClass,
  summaryValueClass,
  summaryTotalLabelClass,
  summaryTotalValueClass,
  placeOrderButtonClass,
} from "./orderSummary.styles";

interface OrderSummaryProps {
  totalItems: number;
  totalCost: number;
  deliveryCost: number;
  finalCost: number;
  isPending: boolean;
  disabled: boolean;
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalItems,
  totalCost,
  deliveryCost,
  finalCost,
  isPending,
  disabled,
  onPlaceOrder,
}) => {
  const { t } = useTranslation();

  return (
    <div className={summaryWrapperClass()}>
      <div className={summaryCardClass()}>
        <h2 className={summaryTitleClass()}>{t("cart.orderSummary")}</h2>

        <div className="space-y-3 2xl:space-y-4 text-sm 2xl:text-base">
          <div className="flex justify-between">
            <span className="text-neutral-500">
              {t("cart.subtotal")} ({totalItems} {t("cart.items")})
            </span>
            <span className={summaryValueClass()}>${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              {t("cart.delivery")}
            </span>
            <span className={summaryValueClass()}>
              ${deliveryCost.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-3">
            <div className="flex justify-between">
              <span className={summaryTotalLabelClass()}>{t("cart.total")}</span>
              <span className={summaryTotalValueClass()}>
                ${finalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={disabled}
          className={placeOrderButtonClass()}
        >
          {isPending ? t("cart.placingOrder") : t("cart.placeOrder")}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

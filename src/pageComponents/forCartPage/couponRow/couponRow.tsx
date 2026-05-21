import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  couponRowClass,
  couponFieldClass,
  couponInputClass,
  applyButtonClass,
  clearButtonClass,
} from "./couponRow.styles";

interface CouponRowProps {
  onClear: () => void;
}

const CouponRow: React.FC<CouponRowProps> = ({ onClear }) => {
  const { t } = useTranslation();

  return (
    <div className={couponRowClass()}>
      <div className={couponFieldClass()}>
        <Tag className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-400 flex-shrink-0" />
        <input
          type="text"
          placeholder={t("cart.couponCode")}
          className={couponInputClass()}
        />
      </div>
      <button className={applyButtonClass()}>{t("cart.apply")}</button>
      <button onClick={onClear} className={clearButtonClass()}>
        {t("cart.clearCart")}
      </button>
    </div>
  );
};

export default CouponRow;

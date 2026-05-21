import { useTranslation } from "react-i18next";
import emptyCartSVG from "@/assets/undraw_empty-cart_574u.svg";
import { crosshatchPattern } from "@/lib/crosshatchPattern";
import {
  emptyWrapperClass,
  emptyCircleClass,
  emptyImageClass,
  emptyTextClass,
} from "./emptyCart.styles";

const EmptyCart = () => {
  const { t } = useTranslation();

  return (
    <div className={emptyWrapperClass()}>
      <div
        className={emptyCircleClass()}
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(120 15 15) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: crosshatchPattern }}
        />
        <img src={emptyCartSVG} alt="" className={emptyImageClass()} />
      </div>
      <p className={emptyTextClass()}>{t("cart.emptyCart")}</p>
    </div>
  );
};

export default EmptyCart;

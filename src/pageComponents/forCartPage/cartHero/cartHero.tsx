import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  heroSectionClass,
  heroInnerClass,
  heroTitleClass,
  heroSubtitleClass,
} from "./cartHero.styles";

interface CartHeroProps {
  totalItems: number;
}

const CartHero: React.FC<CartHeroProps> = ({ totalItems }) => {
  const { t } = useTranslation();

  return (
    <div className={heroSectionClass()}>
      <div className={heroInnerClass()}>
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="w-6 h-6 2xl:w-8 2xl:h-8 text-brand" />
          <h1 className={heroTitleClass()}>{t("cart.yourCart")}</h1>
        </div>
        <p className={heroSubtitleClass()}>
          {totalItems} {totalItems !== 1 ? t("cart.items") : t("cart.item")}{" "}
          {t("cart.inYourCart")}
        </p>
      </div>
    </div>
  );
};

export default CartHero;

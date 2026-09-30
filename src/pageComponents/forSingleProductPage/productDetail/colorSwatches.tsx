import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductVariants } from "@/reactQuery/query/products";
import { swatchFor } from "@/lib/productVariants";

interface ColorSwatchesProps {
  product: {
    id: number;
    color: string | null;
    variant_group: string | null;
  };
}

/**
 * Colour options for the product being viewed. Each colour is its own row in
 * `product`, tied to the others by `variant_group`, so a swatch is a link to
 * that product's page rather than in-page state.
 *
 * Renders nothing for a product that is the only one in its group, so a
 * single-colour item doesn't get a pointless lone swatch.
 */
const ColorSwatches: React.FC<ColorSwatchesProps> = ({ product }) => {
  const { t } = useTranslation();

  const { data: variants = [] } = useGetProductVariants(
    {},
    product.variant_group,
  );

  if (variants.length < 2) return null;

  // Falls back to the raw colour word when a locale has no entry for it, so a
  // colour added to the database shows up before its translation exists.
  const label = (color: string | null) =>
    color ? t(`colors.${color}`, color) : "";

  return (
    <div className="mt-6 2xl:mt-8">
      <p className="text-xs 2xl:text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {t("product.color")}
        {/* align-baseline overrides the global reset in index.css, which sets
            vertical-align: middle on span and lifts it off the baseline of the
            label beside it. */}
        {product.color && (
          <span className="ml-2 align-baseline normal-case tracking-normal text-neutral-900 dark:text-white">
            {label(product.color)}
          </span>
        )}
      </p>

      <ul className="flex flex-wrap items-center gap-3 2xl:gap-4 mt-3">
        {variants.map((variant) => {
          const isCurrent = variant.id === product.id;
          const fill = variant.color ? swatchFor(variant.color) : undefined;

          return (
            <li key={variant.id}>
              <Link
                to={`/dashboard/productDetail/${variant.id}`}
                aria-label={label(variant.color)}
                aria-current={isCurrent ? "true" : undefined}
                title={`${label(variant.color)} — $${variant.price}`}
                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                  fill
                    ? "w-10 h-10 2xl:w-12 2xl:h-12 border border-neutral-300 dark:border-neutral-600"
                    : "px-4 h-10 2xl:h-12 text-sm font-semibold border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white"
                } ${
                  isCurrent
                    ? "ring-2 ring-offset-2 ring-brand ring-offset-white dark:ring-offset-surface"
                    : "hover:ring-2 hover:ring-offset-2 hover:ring-neutral-400 hover:ring-offset-white dark:hover:ring-offset-surface"
                }`}
                style={fill ? { backgroundColor: fill } : undefined}
              >
                {/* A colour with no swatch entry shows its name instead. */}
                {!fill && label(variant.color)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorSwatches;

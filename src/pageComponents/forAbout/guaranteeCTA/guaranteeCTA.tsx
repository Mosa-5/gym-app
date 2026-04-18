import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { guaranteePoints } from "./guaranteeCTA.data";
import { ctaButton } from "./guaranteeCTA.styles";
import { useTranslation } from "react-i18next";

const staggerContainer = (staggerChildren = 0.1) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren } },
  },
});

const fadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

const GuaranteeCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-20 lg:py-28 2xl:py-36">
      <div className="container mx-auto px-4 max-w-6xl 2xl:max-w-[1560px] 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20">
          <motion.div {...fade()}>
            <p className="text-sm sm:text-base 2xl:text-lg ka:!text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 2xl:mb-14 max-w-md 2xl:max-w-xl">
              {t("about.trustText")}
            </p>

            <motion.div
              {...staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5 2xl:space-y-8"
            >
              {guaranteePoints.map((point) => (
                <motion.div
                  key={point.titleKey}
                  variants={fadeVariant}
                  className="flex items-start gap-4 2xl:gap-6"
                >
                  <div>
                    <h4 className="text-sm 2xl:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                      {t(point.titleKey)}
                    </h4>
                    <p className="text-sm 2xl:text-base text-neutral-500">
                      {t(point.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            {...fade(0.2)}
            className="self-center bg-neutral-100 dark:bg-neutral-900 border-l-4 border-brand p-8 sm:p-10 2xl:p-14 flex flex-col gap-6 2xl:gap-8"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black uppercase leading-tight text-neutral-900 dark:text-white">
              {t("about.readyToLift")}
            </h3>
            <p className="text-sm 2xl:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t("about.readyToLiftDesc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard/products" className={ctaButton()}>
                {t("about.shopFullLine")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeCTA;

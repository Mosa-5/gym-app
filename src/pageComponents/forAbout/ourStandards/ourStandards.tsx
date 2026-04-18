import { motion } from "framer-motion";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { standardsPillars } from "./ourStandards.data";
import { gridFour } from "./ourStandards.styles";
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

const OurStandards = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 sm:py-20 2xl:py-36 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl 2xl:max-w-[1560px] 2xl:px-16 relative z-10">
        <SectionHeading
          text={t("about.ourStandards")}
          className="mb-8 2xl:mb-12"
        />
        <motion.div
          {...staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={
            gridFour() +
            " rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700/50"
          }
        >
          {standardsPillars.map((pillar, i) => (
            <motion.div
              key={pillar.titleKey}
              variants={fadeVariant}
              className={`relative p-6 sm:p-8 2xl:p-12 bg-white dark:bg-neutral-900/80 ${
                i > 0
                  ? "border-t sm:border-t-0 sm:border-l border-neutral-200 dark:border-neutral-700/50 lg:border-t-0 lg:border-l"
                  : ""
              } ${i === 2 ? "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l" : ""}`}
            >
              <span className="absolute top-4 2xl:top-6 left-6 2xl:left-8 text-5xl 2xl:text-7xl font-black text-brand/10 dark:text-brand/20 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative pt-10 2xl:pt-14">
                <h3 className="text-sm 2xl:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white mb-3 2xl:mb-4">
                  {t(pillar.titleKey)}
                </h3>
                <p className="text-sm 2xl:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {t(pillar.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurStandards;

import { motion } from "framer-motion";
import { metricsData } from "./metrics.data";
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

const Metrics = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative py-16 sm:py-20 2xl:py-36 overflow-hidden"
      style={{ background: "rgb(var(--color-brand))" }}
    >
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
        }}
      />
      <div className="container mx-auto px-4 max-w-6xl 2xl:max-w-[1560px] 2xl:px-16 relative z-10">
        <motion.div {...fade()} className="flex items-center gap-4 2xl:gap-6 mb-12 2xl:mb-16">
          <span className="text-xs 2xl:text-sm font-bold uppercase tracking-[0.25em] text-white/80">
            {t("about.byTheNumbers")}
          </span>
          <div className="flex-1 h-[1px] bg-white/20" />
        </motion.div>

        <motion.div
          {...staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3"
        >
          {metricsData.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              variants={fadeVariant}
              className={`flex flex-col gap-2 2xl:gap-4 py-6 sm:py-0 ${
                i > 0
                  ? "border-t sm:border-t-0 sm:border-l border-white/20 sm:pl-10 2xl:pl-16"
                  : ""
              }`}
            >
              <span className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black text-white leading-none">
                {stat.value}
              </span>
              <span className="text-xs 2xl:text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Metrics;

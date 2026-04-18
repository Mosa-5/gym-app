import { motion } from "framer-motion";
import storyImg1 from "@/assets/ripped.avif";
import storyImg2 from "@/assets/pexels-binyaminmellish-17840.webp";
import { useTranslation } from "react-i18next";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

const WhoWeAre = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 2xl:py-36 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl 2xl:max-w-[1560px] 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20 items-center">
          <motion.div {...fade()}>
            <span className="text-xs 2xl:text-sm font-bold uppercase tracking-[0.25em] text-brand mb-4 2xl:mb-6 block">
              {t("about.whoWeAre")}
            </span>
            <div className="relative mb-6">
              <span
                aria-hidden="true"
                className="absolute text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl ka:lg:text-5xl font-black uppercase leading-[0.95] ka:!leading-[1.2] text-brand opacity-30"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.15)",
                  transform: "translate(3px, 3px)",
                }}
              >
                {t("about.builtByLifters")}
              </span>
              <h2 className="relative text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl ka:lg:text-5xl font-black uppercase leading-[0.95] ka:!leading-[1.2] text-neutral-900 dark:text-white">
                {t("about.builtByLifters")}
              </h2>
            </div>
            <div className="w-12 h-[2px] bg-brand mb-6 2xl:mb-8" />
            <p className="text-base sm:text-lg 2xl:text-xl ka:!text-[1rem] leading-relaxed text-neutral-600 dark:text-neutral-300 font-light">
              {t("about.aboutText")}
            </p>
          </motion.div>

          <motion.div
            {...fade(0.2)}
            className="relative grid grid-cols-2 gap-4 2xl:gap-6 h-[400px] lg:h-[480px] 2xl:h-[580px]"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={storyImg1}
                alt="Gym training"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden translate-y-8">
              <img
                src={storyImg2}
                alt="Athlete lifting"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

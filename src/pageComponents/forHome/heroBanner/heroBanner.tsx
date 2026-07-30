import gymheroimg from "@/assets/hero-image.jpg";
import gymheroimgWebp from "@/assets/hero-image.webp";
import mobileHeroImg from "@/assets/ripped.avif";
import {
  heroSectionClass,
  overlayClass,
  contentClass,
  subtitleClass,
  headingClass,
  paragraphClass,
  buttonContainerClass,
  buttonClass,
  scrollCueClass,
  scrollCueLabelClass,
} from "./heroBanner.styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className={heroSectionClass()}>
      {/* Background image */}
      <picture className="absolute inset-0 hero-animate">
        <source
          media="(max-width: 767px)"
          srcSet={mobileHeroImg}
          type="image/avif"
        />
        <source
          media="(min-width: 768px)"
          srcSet={gymheroimgWebp}
          type="image/webp"
        />
        <img
          src={gymheroimg}
          alt=""
          fetchPriority="high"
          className="w-full h-full object-cover md:object-[70%_30%] object-center"
        />
      </picture>

      {/* Black layer over the image that fades out to reveal it. */}
      <div className="absolute inset-0 bg-black pointer-events-none z-[2] hero-cover" />

      {/* Overlay */}
      <div className={overlayClass()} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className={contentClass()}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className={subtitleClass()}
        >
          {t("hero.elevateYour")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={headingClass()}
        >
          {t("hero.fitnessJourneyLine1")}
          <br />
          {t("hero.fitnessJourneyLine2")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={paragraphClass()}
        >
          {t("hero.heroDescription")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className={buttonContainerClass()}
        >
          <Link to="/dashboard/products">
            <button className={buttonClass()}>
              {t("hero.exploreProducts")}
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative scroll cue — aria-hidden because it tells a sighted user
          something the page structure already conveys to a screen reader. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className={scrollCueClass()}
      >
        <span className={scrollCueLabelClass()}>{t("hero.scroll")}</span>
        <ChevronDown className="w-5 h-5 2xl:w-6 2xl:h-6 scroll-cue-arrow" />
      </motion.div>
    </section>
  );
};

export default HeroBanner;

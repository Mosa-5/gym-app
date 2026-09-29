import gymheroimg from "@/assets/hero-image.jpg";
import gymheroimgWebp from "@/assets/hero-image.webp";
import mobileHeroImg from "@/assets/ripped.avif";
import {
  heroSectionClass,
  overlayClass,
  contentClass,
  headingClass,
  rotatingWordClass,
  paragraphClass,
  buttonContainerClass,
  buttonClass,
} from "./heroBanner.styles";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// The rotation plays once and rests on the last word, so it stops competing
// with the CTA. It must also end within 5s: WCAG 2.2.2 requires a pause control
// for anything that moves longer than that. With three words and each swap
// taking 0.7s (0.35s exit + 0.35s enter), it settles at about 3.8 + 0.7 = 4.5s.
const ROTATE_EVERY_MS = 1900;

const RotatingWord: React.FC<{ words: string[] }> = ({ words }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const lastIndex = words.length - 1;

  useEffect(() => {
    if (reduceMotion || index >= lastIndex) return;
    const id = setTimeout(() => setIndex((i) => i + 1), ROTATE_EVERY_MS);
    return () => clearTimeout(id);
  }, [reduceMotion, index, lastIndex]);

  // Reduced motion skips straight to the resting word. The clamp covers a
  // language switch swapping in a shorter list.
  const shown = reduceMotion ? lastIndex : Math.min(index, lastIndex);
  const word = words[shown];

  return (
    <span className={rotatingWordClass()}>
      <AnimatePresence mode="wait" initial={false}>
        {/* Keyed by position, not text: switching language changes the text
            but not the position, so the word swaps in place instead of
            replaying the slide-in. */}
        <motion.span
          key={shown}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const HeroBanner: React.FC = () => {
  const { t } = useTranslation();
  const prefix = t("hero.headlinePrefix");
  const words = t("hero.rotatingWords", { returnObjects: true }) as string[];

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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className={headingClass()}
        >
          {/* Screen readers get the whole line once instead of a word that
              changes under them every few seconds. */}
          <span className="sr-only">{`${prefix} ${words.join(", ")}`}</span>
          <span aria-hidden="true">
            {prefix}{" "}
            {/* Phones only: the longest pairing ("LIFT HEAVIER", or the wider
                Georgian "ივარჯიშე დიდხანს") doesn't fit one line there, and letting
                it wrap would make the line count change mid-rotation and shove
                the CTA up and down. */}
            <br className="sm:hidden" />
            <RotatingWord words={words} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className={paragraphClass()}
        >
          {/* align-baseline overrides the global reset in index.css, which sets
              vertical-align: middle on <strong> and drops it below the plain
              text that follows on the same line. */}
          <strong className="font-semibold text-white align-baseline">
            {t("hero.slogan")}
          </strong>{" "}
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={buttonContainerClass()}
        >
          <Link to="/dashboard/products" className={buttonClass()}>
            {t("hero.shopTheGear")}
            <ChevronRight
              strokeWidth={3}
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

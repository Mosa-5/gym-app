import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { sectionClass, containerClass } from "./brandStory.styles";
import storyImg1 from "@/assets/pexels-823sl-2294361.webp";
import storyImg1Sm from "@/assets/pexels-823sl-2294361-sm.webp";
import storyImg2 from "@/assets/hero-image.webp";
import storyImg2Sm from "@/assets/hero-image-sm.webp";
import storyImg3 from "@/assets/pexels-franki-frank-11513151.webp";
import storyImg3Sm from "@/assets/pexels-franki-frank-11513151-sm.webp";
import equipImg1 from "@/assets/bells.avif";
import equipImg1Sm from "@/assets/bells-sm.avif";
import equipImg2 from "@/assets/mobileGear.avif";
import equipImg3 from "@/assets/BeltHeader_1a.webp";
import equipImg3Sm from "@/assets/BeltHeader_1a-sm.webp";
import { useTranslation } from "react-i18next";
import "./brandStory.css";

const INTERVAL = 9000;
/**
 * Each card carries two sources. The full-size files are shared with the heroes
 * that need them (up to 1920px), but these cards render at roughly 380 CSS px on
 * a phone — so mobile gets a 760px variant instead, cutting this section's
 * payload from 504 kB to 96 kB. Regenerate the variants with
 * `yarn optimize:images`.
 *
 * mobileGear has no `sm` variant: at 687px it is already narrower than the
 * variant width.
 */
type CardImage = { full: string; sm: string };

const PEOPLE_IMAGES: CardImage[] = [
  { full: storyImg1, sm: storyImg1Sm },
  { full: storyImg2, sm: storyImg2Sm },
  { full: storyImg3, sm: storyImg3Sm },
];
const EQUIP_IMAGES: CardImage[] = [
  { full: equipImg1, sm: equipImg1Sm },
  { full: equipImg2, sm: equipImg2 },
  { full: equipImg3, sm: equipImg3Sm },
];

/** Picks the 760px file below the `md` breakpoint, the full file above it. */
const CardImg = ({ image }: { image: CardImage }) => (
  <picture>
    <source media="(max-width: 767px)" srcSet={image.sm} />
    <img
      src={image.full}
      alt=""
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </picture>
);
const RADIUS = 13;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

const ImagePair = ({
  images,
  flip,
  current,
}: {
  images: CardImage[];
  flip?: boolean;
  current: number;
}) => {
  const idx = current % images.length;
  const front = images[idx];
  const mid = images[(idx + 1) % images.length];
  const back = images[(idx + 2) % images.length];

  return (
    <div className="relative h-[300px] sm:h-[380px] 2xl:h-[460px]">
      {/* Back card */}
      <div
        className={`absolute inset-0 rounded-2xl overflow-hidden shadow-md ${
          flip
            ? "translate-x-0 lg:-translate-x-10"
            : "translate-x-0 lg:translate-x-10"
        } translate-y-5 lg:translate-y-10`}
      >
        <CardImg image={back} />
      </div>

      {/* Middle card */}
      <div
        className={`absolute inset-0 rounded-2xl overflow-hidden shadow-lg z-[5] ${
          flip
            ? "translate-x-0 lg:-translate-x-5"
            : "translate-x-0 lg:translate-x-5"
        } translate-y-2 lg:translate-y-5`}
      >
        <CardImg image={mid} />
      </div>

      {/* Front card — animates in */}
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl z-10"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <CardImg image={front} />

          {/* Circular timer */}
          <div className="absolute bottom-3 right-3 z-20 w-10 h-10">
            <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
              <circle
                cx="16"
                cy="16"
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2.5"
              />
              <circle
                key={idx}
                cx="16"
                cy="16"
                r={RADIUS}
                fill="none"
                stroke="rgb(var(--color-brand))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{
                  animation: `timer-ring ${INTERVAL / 1000}s linear forwards`,
                }}
              />
            </svg>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const BrandStory = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={sectionClass()}>
      <div className={containerClass()}>
        <SectionHeading text={t("brandStory.ourStory")} className="mb-12" />

        {/* Row 1: text left — people images right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20 items-center mb-16 lg:mb-24 2xl:mb-32">
          <motion.div {...fade()} className="space-y-5">
            <div className="w-12 h-[2px] bg-brand" />
            <p className="text-lg sm:text-xl 2xl:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-100 font-medium">
              {t("brandStory.slide1")}
            </p>
            <p className="text-sm 2xl:text-base font-semibold text-brand">
              - {t("brandStory.slide1Author")}
            </p>
          </motion.div>

          <motion.div {...fade(0.2)} className="lg:pr-8">
            <ImagePair images={PEOPLE_IMAGES} current={current} />
          </motion.div>
        </div>

        {/* Row 2: equipment images left — text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20 items-center">
          <motion.div {...fade(0.1)} className="order-2 lg:order-1 lg:pl-8">
            <ImagePair images={EQUIP_IMAGES} current={current} flip />
          </motion.div>

          <motion.div {...fade(0.2)} className="space-y-5 order-1 lg:order-2">
            <div className="w-12 h-[2px] bg-brand" />
            <p className="text-lg sm:text-xl 2xl:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-100 font-medium">
              {t("brandStory.slide2")}
            </p>
            <p className="text-sm 2xl:text-base font-semibold text-brand">
              - {t("brandStory.slide2Author")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

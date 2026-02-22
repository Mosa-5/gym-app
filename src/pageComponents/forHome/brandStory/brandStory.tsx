import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stats, missionText, secondaryText } from "./brandStory.data";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import { sectionClass, containerClass } from "./brandStory.styles";
import storyImg1 from "@/assets/pexels-823sl-2294361.jpg";
import storyImg2 from "@/assets/pexels-binyaminmellish-17840.jpg";
import storyImg3 from "@/assets/pexels-ivan-samkov-4164450.jpg";
import storyImg4 from "@/assets/pexels-823sl-2294362.jpg";

const IMAGES = [storyImg1, storyImg2, storyImg3, storyImg4];
const INTERVAL = 6000; // 6 seconds per image

const BrandStory = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={sectionClass()}>
      <div className={containerClass()}>
        <SectionHeading text="Our Story" />

        {/* Full-bleed slideshow with overlapping elements */}
        <motion.div
          className="relative mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Image slideshow with Ken Burns zoom */}
          <div className="relative lg:mx-auto lg:w-[95%] rounded-2xl overflow-hidden aspect-[2/1]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current}
                src={IMAGES[current]}
                alt="Our Story"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 2, ease: "easeInOut" },
                  scale: { duration: 6, ease: "easeOut" },
                }}
              />
            </AnimatePresence>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />
            {/* Bottom gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[1]" />
          </div>

          {/* Left text block — top left, half overlapping image */}
          <div
            className="relative lg:absolute lg:-left-[5%] lg:top-[15%] lg:w-[35%] mt-6 lg:mt-0 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl z-10"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(140 20 20) 100%)",
            }}
          >
            <div className="w-8 h-[2px] bg-white/60" />
            <p className="text-sm leading-relaxed text-white/90 font-light">
              {missionText}
            </p>
          </div>

          {/* Right text block — middle right */}
          <div
            className="relative lg:absolute lg:-right-[3%] lg:top-[50%] lg:-translate-y-1/2 lg:w-[32%] mt-4 lg:mt-0 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl z-10"
            style={{
              background:
                "linear-gradient(135deg, rgb(140 20 20) 0%, rgb(var(--color-brand)) 100%)",
            }}
          >
            <div className="w-8 h-[2px] bg-white/60" />
            <p className="text-sm leading-relaxed text-white/70 italic">
              {secondaryText}
            </p>
          </div>

          {/* Stats bar chart — overlapping bottom of image */}
          <div className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-[50%] lg:w-[70%] mt-8 lg:mt-0 z-10">
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-200 dark:border-neutral-800"
              style={{ background: "rgba(255,255,255,0.95)" }}
            >
              <div className="grid grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-brand leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-1 mb-3">
                      {stat.label}
                    </span>
                    {/* Bar */}
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "rgb(var(--color-brand))" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.barPercent}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.12,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;

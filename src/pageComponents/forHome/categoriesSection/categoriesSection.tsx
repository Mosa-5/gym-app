import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/componentsShadcn/ui/button";
import { categories } from "./categoriesSection.data";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import {
  sectionClass,
  containerClass,
  panelContainerClass,
} from "./categoriesSection.styles";
import { useTranslation } from "react-i18next";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const CategoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <motion.section
      className={sectionClass()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className={containerClass()}>
        <SectionHeading
          text={t("categories.shopByCategory")}
          className="mb-8"
        />
        <div className={panelContainerClass()}>
          {categories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={category.nameKey}
                className={`${category.color} relative cursor-pointer rounded-2xl overflow-hidden`}
                initial={false}
                animate={
                  isMobile
                    ? { height: isActive ? 280 : 64, flex: "none" }
                    : { flex: isActive ? 4 : 1, height: "auto" }
                }
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Collapsed state */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className={`text-white font-bold text-lg sm:text-xl tracking-wider ${
                          isMobile
                            ? ""
                            : "[writing-mode:vertical-lr] rotate-180"
                        }`}
                      >
                        {t(category.nameKey).toUpperCase()}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded state - full content */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence>
                    {isActive && (
                      <>
                        {/* Product image */}
                        <motion.div
                          className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 z-0 2xl:mb-6"
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="w-[220px] sm:w-[220px] md:w-[280px] lg:w-[320px] 2xl:w-[400px]">
                            <img
                              src={category.image}
                              alt={t(category.nameKey)}
                              loading="lazy"
                              className="w-full h-auto object-contain"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
                              }}
                            />
                          </div>
                        </motion.div>

                        {/* Dark overlay behind text */}
                        <motion.div
                          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-black/15"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Text content */}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full sm:w-[380px] md:w-[500px] lg:w-[580px] 2xl:w-[680px] p-5 sm:p-8 md:p-10 2xl:p-14 2xl:mb-6 z-[2]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                        >
                          <h3 className="text-white font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl ka:lg:text-5xl tracking-wide mb-1 sm:mb-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.7),0_2px_10px_rgba(0,0,0,0.45)]">
                            {t(category.nameKey)
                              .toUpperCase()
                              .split(" ")
                              .map((word, i, arr) => (
                                <span key={i}>
                                  {word}
                                  {i < arr.length - 1 && <br />}
                                </span>
                              ))}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base 2xl:text-lg ka:sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_6px_rgba(0,0,0,0.8),0_2px_14px_rgba(0,0,0,0.6)]">
                            {t(category.descriptionKey)}
                          </p>
                          <Link
                            to={`/dashboard/products?categories=${encodeURIComponent(category.filterKey)}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="secondary"
                              className="w-fit font-semibold h-10 sm:h-11 2xl:h-12 px-6 2xl:px-8 text-sm sm:text-base 2xl:text-lg border-white/30 bg-white/15 text-white hover:bg-white/25 dark:bg-white/15 dark:hover:bg-white/25 rounded-full"
                            >
                              {t("categories.shopNow")}
                            </Button>
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default CategoriesSection;

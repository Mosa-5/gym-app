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

  return (
    <motion.section
      className={sectionClass()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className={containerClass()}>
        <SectionHeading text="Shop By Category" />
        <div className={panelContainerClass()}>
          {categories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={category.name}
                className={`${category.color} relative cursor-pointer rounded-2xl overflow-hidden`}
                initial={false}
                animate={
                  isMobile
                    ? { height: isActive ? 280 : 56, flex: "none" }
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
                          isMobile ? "" : "[writing-mode:vertical-lr] rotate-180"
                        }`}
                      >
                        {category.name.toUpperCase()}
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
                          className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8"
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="w-[140px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-auto object-contain"
                              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}
                            />
                          </div>
                        </motion.div>

                        {/* Text content */}
                        <motion.div
                          className="absolute bottom-0 left-0 w-[200px] sm:w-[380px] md:w-[500px] lg:w-[580px] p-5 sm:p-8 md:p-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                        >
                          <h3 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide mb-1 sm:mb-2">
                            {category.name.toUpperCase()}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                            {category.description}
                          </p>
                          <Link
                            to={`/dashboard/products?category=${encodeURIComponent(category.name)}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="secondary"
                              className="w-fit font-semibold text-xs sm:text-sm"
                            >
                              Shop Now
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

import gymheroimg from "@/assets/pexels-binyaminmellish-17840.jpg";
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
} from "./heroBanner.styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroBanner: React.FC = () => {
  return (
    <section className={heroSectionClass()}>
      {/* Background image */}
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={mobileHeroImg} />
        <source media="(min-width: 768px)" srcSet={gymheroimg} />
        <img
          src={gymheroimg}
          alt=""
          className="w-full h-full object-cover md:object-[70%_30%] object-center"
        />
      </picture>

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
          Elevate Your
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={headingClass()}
        >
          Fitness
          <br />
          Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={paragraphClass()}
        >
          Premium gear for athletes who demand the best. Stylish and modern
          equipment for those who want to reach perfection.
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
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

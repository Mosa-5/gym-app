import beltimg from "@/assets/pexels-franki-frank-11513151.jpg";
import mobileShopImg from "@/assets/mobileGear.avif";
import { motion } from "framer-motion";

import {
  banner,
  overlay,
  content,
  subtitle,
  heading,
  paragraph,
} from "./hero.styles";

const ProductsHeroBanner = () => {
  return (
    <div className={banner()}>
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={mobileShopImg} />
        <source media="(min-width: 768px)" srcSet={beltimg} />
        <img
          src={beltimg}
          alt=""
          className="w-full h-full object-cover md:object-[50%_65%] object-center"
        />
      </picture>
      <div className={overlay()} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className={content()}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className={subtitle()}
        >
          Browse Our
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={heading()}
        >
          Shop
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={paragraph()}
        >
          Quality, long-lasting fitness equipment and active wear to help your
          healthy lifestyle.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProductsHeroBanner;

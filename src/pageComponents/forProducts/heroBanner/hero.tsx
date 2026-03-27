import beltimg from "@/assets/pexels-franki-frank-11513151.jpg";
import beltimgWebp from "@/assets/pexels-franki-frank-11513151.webp";
import mobileShopImg from "@/assets/mobileGear.avif";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  banner,
  overlay,
  content,
  subtitle,
  heading,
  paragraph,
} from "./hero.styles";

const ProductsHeroBanner = () => {
  const { t } = useTranslation();
  return (
    <div className={banner()}>
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={mobileShopImg} type="image/avif" />
        <source media="(min-width: 768px)" srcSet={beltimgWebp} type="image/webp" />
        <img
          src={beltimg}
          alt=""
          fetchPriority="high"
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
          {t("shopHero.browseOur")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={heading()}
        >
          {t("shopHero.shop")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={paragraph()}
        >
          {t("shopHero.description")}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProductsHeroBanner;

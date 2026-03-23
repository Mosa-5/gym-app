import beltimg from "@/assets/BeltHeader_1a.webp";
import { Button } from "@/componentsShadcn/ui/button";
import { motion } from "framer-motion";
import {
  banner,
  bannerInner,
  overlay,
  content,
  subHeading,
  heading,
  saleText,
  button,
} from "./advert.styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeverBeltBanner = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={banner()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div
        className={bannerInner()}
        style={{ backgroundImage: `url(${beltimg})` }}
      >
        <div className={overlay()}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={content()}
        >
          <h3 className={subHeading()}>{t("advert.blkBlk")}</h3>
          <h1 className={heading()}>{t("advert.leverBelt")}</h1>
          <p className={saleText()}>{t("advert.sale")}</p>
          <Link to="/dashboard/products">
            <Button className={button()}>{t("advert.shopNow")}</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeverBeltBanner;

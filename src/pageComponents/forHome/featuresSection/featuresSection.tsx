import { motion } from "framer-motion";
import {
  containerClass,
  featureClass,
  iconClass,
  sectionClass,
  titleClass,
} from "./featuresSection.styles";
import { features } from "./featuresSection.data";
import { useTranslation } from "react-i18next";

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={sectionClass()}>
      <div className={containerClass()}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={featureClass()}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={iconClass()}>{feature.icon}</div>
            <h3 className={titleClass()}>{t(feature.titleKey)}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

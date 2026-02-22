import heroImg from "@/assets/bells.avif";
import { motion } from "framer-motion";
import {
  banner,
  bannerInner,
  overlay,
  content,
  subtitle,
  heading,
  paragraph,
} from "./aboutHero.styles";

const AboutHero = () => {
  return (
    <div className={banner()}>
      <div
        className={bannerInner()}
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: "50% 40%",
        }}
      />
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
          Who We Are
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={heading()}
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={paragraph()}
        >
          Born in the gym, engineered for the platform — gear that performs as
          hard as you do.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AboutHero;

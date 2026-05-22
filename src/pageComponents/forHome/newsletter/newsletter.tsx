import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import {
  sectionClass,
  containerClass,
  descriptionClass,
} from "./newsletter.styles";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(t("newsletter.emptyEmail"));
      return;
    }
    toast.success(t("newsletter.success"));
    setEmail("");
  };

  return (
    <motion.section
      className={sectionClass()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className={containerClass()}>
        <SectionHeading text={t("newsletter.stayInTheLoop")} />

        <p className={descriptionClass()}>{t("newsletter.description")}</p>

        <form
          onSubmit={handleSubmit}
          className="mt-2 flex items-center w-full max-w-md mx-auto rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-2 gap-2 focus-within:ring-2 focus-within:ring-brand transition"
        >
          <input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-sm 2xl:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pl-3 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-brand hover:bg-brand-hover text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider px-5 py-2.5 2xl:px-6 2xl:py-3 rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            {t("newsletter.subscribe")}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;

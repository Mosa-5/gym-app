import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/componentsShadcn/ui/button";
import { Input } from "@/componentsShadcn/ui/input";
import { toast } from "sonner";
import SectionHeading from "@/pageComponents/forHome/sectionHeading/sectionHeading";
import {
  sectionClass,
  containerClass,
  descriptionClass,
  formClass,
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
        <form onSubmit={handleSubmit} className={formClass()}>
          <Input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white dark:bg-neutral-950 2xl:h-12 2xl:text-base"
          />
          <Button type="submit" className="text-white 2xl:px-8 2xl:text-base 2xl:h-12">
            {t("newsletter.subscribe")}
          </Button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;

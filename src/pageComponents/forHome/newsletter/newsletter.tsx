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

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Thanks for subscribing!");
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
        <SectionHeading text="Stay In The Loop" />
        <p className={descriptionClass()}>
          Subscribe to our newsletter for exclusive deals, new drops, and
          training tips.
        </p>
        <form onSubmit={handleSubmit} className={formClass()}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white dark:bg-neutral-950"
          />
          <Button type="submit" className="text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;

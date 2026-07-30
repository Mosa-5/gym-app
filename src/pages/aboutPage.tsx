import AboutHero from "@/pageComponents/forAbout/aboutHero/aboutHero";
import WhoWeAre from "@/pageComponents/forAbout/whoWeAre/whoWeAre";
import OurStandards from "@/pageComponents/forAbout/ourStandards/ourStandards";
import Metrics from "@/pageComponents/forAbout/metrics/metrics";
import GuaranteeCTA from "@/pageComponents/forAbout/guaranteeCTA/guaranteeCTA";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const AboutPage = () => {
  const { t } = useTranslation();

  useDocumentMeta({
    title: t("seo.aboutTitle"),
    description: t("seo.aboutDescription"),
  });

  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OurStandards />
      <Metrics />
      <GuaranteeCTA />
    </>
  );
};

export default AboutPage;

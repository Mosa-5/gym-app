import LeverBeltBanner from "@/pageComponents/forHome/advert/advert";
import CarouselForPages from "@/pageComponents/forHome/carouselMain/carousel";
import HeroBanner from "@/pageComponents/forHome/heroBanner/heroBanner";
import CategoriesSection from "@/pageComponents/forHome/categoriesSection/categoriesSection";
import BrandStory from "@/pageComponents/forHome/brandStory/brandStory";
import ReviewsSocialProof from "@/pageComponents/forHome/reviewsSocialProof/reviewsSocialProof";
import Newsletter from "@/pageComponents/forHome/newsletter/newsletter";
import FreshPicksCarousel from "@/pageComponents/forHome/freshPicksCarousel/carousel";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "@/convenienceTools/useDocumentMeta";

const Main = () => {
  const { t } = useTranslation();

  useDocumentMeta({
    title: t("seo.homeTitle"),
    description: t("seo.homeDescription"),
  });

  return (
    <>
      <HeroBanner />
      <FreshPicksCarousel
        headerText={t("common.freshPicks", "Fresh Picks")}
        carouselType="worstSelling"
      />
      <CategoriesSection />
      <CarouselForPages
        headerText={t("common.bestSelling", "Best Selling Lifting Gear")}
        carouselType="bestSelling"
      />
      <LeverBeltBanner />
      <BrandStory />
      <ReviewsSocialProof />
      <Newsletter />
    </>
  );
};

export default Main;

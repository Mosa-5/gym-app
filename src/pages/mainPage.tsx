import LeverBeltBanner from "@/pageComponents/forHome/advert/advert";
import CaruselForPages from "@/pageComponents/forHome/carouselMain/carusel";
import HeroBanner from "@/pageComponents/forHome/heroBanner/heroBanner";
import CategoriesSection from "@/pageComponents/forHome/categoriesSection/categoriesSection";
import BrandStory from "@/pageComponents/forHome/brandStory/brandStory";
import ReviewsSocialProof from "@/pageComponents/forHome/reviewsSocialProof/reviewsSocialProof";
import Newsletter from "@/pageComponents/forHome/newsletter/newsletter";
import ExperimentalCarousel from "@/pageComponents/forHome/experimentalCarousel/carousel";

const Main = () => {
  return (
    <>
      <HeroBanner />
      <ExperimentalCarousel headerText="Fresh Picks" carouselType="worstSelling" />
      <CategoriesSection />
      <CaruselForPages
        headerText="Best Selling Lifting Gear"
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

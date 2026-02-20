import LeverBeltBanner from "@/pageComponents/forHome/advert/advert";
import CaruselForPages from "@/pageComponents/forHome/carouselMain/carusel";
import FeaturesSection from "@/pageComponents/forHome/featuresSection/featuresSection";
import HeroBanner from "@/pageComponents/forHome/heroBanner/heroBanner";

const Main = () => {
  return (
    <>
      <HeroBanner />
      <CaruselForPages
        headerText="Best Selling Lifting Gear"
        carouselType="bestSelling"
      />
      <LeverBeltBanner />
      <CaruselForPages headerText="New Products" carouselType="worstSelling" />
      <FeaturesSection />
    </>
  );
};

export default Main;

import PageDivider from "@/components/PageDivider";
import AppDevHero from "./components/AppDevHero";
import OurServicesTabs from "./components/OurServicesTabs";
import DevelopmentProcess from "./components/DevelopmentProcess";
import BusinessValue from "./components/BusinessValue";
import VerticalTabServices from "./components/VerticalTabServices";
import IndustriesSection from "@/components/IndustriesSection";
import AppDevFaq from "./components/AppDevFaq";
import AppDevelopmentServices from "./components/AppDevServices";

const page = () => {
  return (
    <div>
      <AppDevHero />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <OurServicesTabs />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <DevelopmentProcess />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <BusinessValue />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <AppDevelopmentServices />
      {/* <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" /> */}{" "}
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-24" />
      <VerticalTabServices />
      <IndustriesSection />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <AppDevFaq />
    </div>
  );
};

export default page;

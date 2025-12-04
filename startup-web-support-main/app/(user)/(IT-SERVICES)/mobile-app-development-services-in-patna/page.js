import PageDivider from "@/components/PageDivider";
import AppDevHero from "./components/AppDevHero";
import OurServicesTabs from "./components/OurServicesTabs";
import DevelopmentProcess from "./components/DevelopmentProcess";
import BusinessValue from "./components/BusinessValue";
import VerticalTabServices from "./components/VerticalTabServices";
import IndustriesSection from "@/components/IndustriesSection";
import AppDevFaq from "./components/AppDevFaq";
import AppDevelopmentServices from "./components/AppDevServices";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <>
      <Seo
        title="Mobile App Development Company in Patna | Android & iOS App Development"
        description="Startup Web Support is a top mobile app development company in Patna offering Android app development, iOS app development, hybrid mobile apps, UI/UX design, and custom mobile app solutions for startups and businesses."
        canonical="https://startupwebsupport.com/mobile-app-development-services-in-patna"
        image="sws-logo.png"
      />

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
    </>
  );
};

export default page;

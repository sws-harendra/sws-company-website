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
        title=" Mobile App Development Company in Patna | Android and iOS App Development"
        description="Expert mobile app development company in Patna delivering high quality Android and iOS apps with scalable, secure, and user friendly solutions."
        canonical="https://startupwebsupport.com/mobile-app-development-services-in-patna"
        image="sws-logo.png"
        keywords="mobile app development in patna, app developer in patna, mobile app development company in Bihar, Mobile App Development Company in Patna, mobile app developer in patna, app development company in patna, app development company patna, android app developer in patna, app development in Patna, app development, mobile app development, mobile app developer, Mobile App Development Company, app development company, app developer, App Development Company, Android App Development, mobile app developer near me, app designer near me, app developer near me, Flutter app development, Mobile App Development Services, iOS App Development, Cross Platform App Development, app development services, React Native app development, e-commerce app development, custom mobile app development, hybrid app development, app development companies near me, Mobile App Development Process, Native Mobile App Development, app development near me, Custom App Development Company, mobile application development company, Kotlin app development, Cross-Platform Mobile App Development, Swift app development, education mobile apps, App Development Solutions, cost-effective mobile app development, finance app development, enterprise mobile app solutions"
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

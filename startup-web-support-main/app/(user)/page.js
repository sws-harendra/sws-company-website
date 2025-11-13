import AboutUs from "@/components/AboutUs";
import ClientsScroller from "@/components/ClientsScroller";
import FeaturedServices from "@/components/FeaturedServices";
import IndustriesSection from "@/components/IndustriesSection";
import PageDivider from "@/components/PageDivider";
import ServiceFeatures from "@/components/ServiceFeatures";
import HeroSlider from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import Call from "@/components/call";
import WhatsAppButton from "@/components/whatsapp";
import TechStack from "@/components/TechStacks";
import PortfolioGrid from "./portfolio/components/PortfolioGrid";

const page = () => {
  return (
    <div className="overflow-hidden">
      {/* <Hero /> */}

      <HeroSlider />
      <FeaturedServices />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <AboutUs />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <ServiceFeatures />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <IndustriesSection />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />

      <TechStack />

      <ClientsScroller />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <Testimonials />
      <PageDivider upperColor="#1e88e5" lowerColor="#F3F7FD" height="h-12" />
      <PortfolioGrid />
    </div>
  );
};

export default page;

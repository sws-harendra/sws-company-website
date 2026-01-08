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
import Seo from "@/components/Seo";
import NewHeroSection from "@/components/NewHeroSection";

const page = () => {
  return (
    <>
      <Seo
        title="Software Devlopment Company in Patna & IT Company in Patna"
        description="We provide website development, digital branding, and SEO services for startups,helping small businesses build a strong online presence and grow their business."
        canonical="https://startupwebsupport.com/"
        image="sws-logo.png"
        keywords="We provide website development, digital branding, and SEO services for startups,helping small businesses build a strong online presence and grow their business."
      />
      <div className="overflow-hidden">
        {/* <Hero /> */}
        <NewHeroSection />
        {/* <HeroSlider /> */}
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
    </>
  );
};

export default page;

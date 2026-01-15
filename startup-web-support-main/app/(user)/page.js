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
        title="Software Company in Patna | IT Company in Patna | Startup Web Support"
        description="Leading IT company in Patna offering expert software development, digital solutions, and startup web support to help your business grow efficiently."
        canonical="https://startupwebsupport.com/"
        image="sws-logo.png"
        keywords="it company in patna,software company in patna, digital marketing agency Patna, web development company Bihar, best it company in patna,mobile app development company, software development company, mobile app development company India, app development agency, web application development company, custom web development services, SEO Services in Patna, Digital Marketing in Patna, Website Development Patna, E-commerce Website Development, Best Graphic Designing Services, Best Internet Marketing Services in Patna, Top Software Development in Patna,Top 10 IT Company in Patna, Paid Social Media Marketing in Patna, Social Media Management in Patna,Top Software Company in Patna"
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

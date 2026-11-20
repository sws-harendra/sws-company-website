import PageDivider from "@/components/PageDivider";
import BenefitsSection from "./components/BenefitsSection";
import BusinessValue from "./components/BusinessValue";
import HeroSection from "./components/HeroSection";
import InvestmentBenefits from "./components/InvestmentBenefits";
import PricingPackages from "./components/PricingPackages";
import ReliableTeam from "./components/ReliableTeam";
import ServicesAccordion from "./components/ServicesAccordion";
import TrustSection from "./components/TrustSection";
import WhyChooseUs from "./components/WhyChooseUs";
import WhyHireUs from "./components/WhyHireUs";
import CoreFeatures from "./components/CoreFeatures";
import WebdevelopmentSection from "./components/WebdevelopmentSection";
import WebsiteFaq from "./components/WebsiteFaq";
import Seo from "@/components/Seo";
import RecentWorkShowcase from "@/components/RecentWorkShowcase";
import IndustriesSection from "@/components/IndustriesSection";

const page = () => {
  return (
    <>
      <Seo
        title="website development company in patna | Startup Web Support"
        description="Professional website development company in Patna delivering responsive, secure, and scalable websites tailored to startups and growing businesses."
        canonical="https://startupwebsupport.com/web-development-company-in-patna"
        image="website-development.png"
        keywords="web development company in patna, website development company in patna, web development in patna, Web development company Patna, website development in patna, Best web development company in Patna, web designer in patna, website design in patna, website design company in patna, website developer in patna, web design company in patna, web design company patna, best website development company in patna, website company in patna, web developer in patna, website design services in patna, website company in bihar, website designing company in patna, best website designing company in patna, website designer in patna, website development company in bihar, web development company, website development, web development services, eCommerce Development, ERP Development, development services, CMS Development, web development, website development company, web development agency, website designing company, Best web development services Patna, Patna web design agency, Top web development company Patna, Website design and development Patna, Web development solutions Patna, Best Website Development Company Patna"
      />

      <div className="bg-white">
        {/* Section 1: Hero */}
        <HeroSection />
        <PageDivider upperColor="#ffffff" lowerColor="#1e88e5" height="h-12" />

        {/* Section 2: Why Choose Us */}
        <WhyChooseUs />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffffff" height="h-12" />

        {/* Section 3: Business Value */}
        <BusinessValue />

        {/* Projects Section from Landing Page (After 3rd Section) */}
        <PageDivider upperColor="#ffffff" lowerColor="#030712" height="h-14" />
        <RecentWorkShowcase />
        <PageDivider upperColor="#030712" lowerColor="#ffffff" height="h-14" />

        {/* Section 4: Core Development Platforms */}
        <ServicesAccordion />
        <PageDivider upperColor="#ffffff" lowerColor="#1e88e5" height="h-12" />

        {/* Section 5: Benefits Section */}
        <BenefitsSection />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffffff" height="h-12" />

        {/* Section 6: Trust & Advantages */}
        <TrustSection />
        <PageDivider upperColor="#ffffff" lowerColor="#1e88e5" height="h-12" />

        {/* Section 7: More Reasons to Hire SWS */}
        <WhyHireUs />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffffff" height="h-12" />

        {/* Section 8: Investment Benefits */}
        <InvestmentBenefits />
        <PageDivider upperColor="#ffffff" lowerColor="#1e88e5" height="h-12" />

        {/* Section 9: Pricing Packages */}
        <PricingPackages />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffffff" height="h-12" />

        {/* Section 10: Reliable Team & Synergy */}
        <ReliableTeam />
        <PageDivider upperColor="#ffffff" lowerColor="#1e88e5" height="h-12" />

        {/* Section 11: Core Features */}
        <CoreFeatures />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffffff" height="h-12" />

        {/* Section 12: Comprehensive Web Development Services */}
        <WebdevelopmentSection />

        {/* Section 13: Industries */}
        <IndustriesSection />

        {/* Section 14: FAQ */}
        <WebsiteFaq />
      </div>
    </>
  );
};

export default page;

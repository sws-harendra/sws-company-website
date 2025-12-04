
import PageDivider from "@/components/PageDivider"
import BenefitsSection from "./components/BenefitsSection"
import BusinessValue from "./components/BusinessValue"
import HeroSection from "./components/HeroSection"
import InvestmentBenefits from "./components/InvestmentBenefits"
import PricingPackages from "./components/PricingPackages"
import ReliableTeam from "./components/ReliableTeam"
import ServicesAccordion from "./components/ServicesAccordion"
import TrustSection from "./components/TrustSection"
import WhyChooseUs from "./components/WhyChooseUs"
import WhyHireUs from "./components/WhyHireUs"
import CoreFeatures from "./components/CoreFeatures"
import WebsiteFaq from "./components/WebsiteFaq"
import Seo from "@/components/Seo"

const page = () => {
  return (
    <>
      <Seo
        title="Website Development Company in Patna | Professional Web Design Services"
        description="Startup Web Support is the leading website development company in Patna offering professional web design, custom website development, eCommerce solutions, and responsive web development services for businesses and startups."
        canonical="https://startupwebsupport.com/web-development-company-in-patna"
        image="website-development.png"
      />

      <div>
        <HeroSection />
        <BusinessValue />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <WhyChooseUs />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <ServicesAccordion />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <BenefitsSection />
        <TrustSection />
        <WhyHireUs />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <InvestmentBenefits />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <PricingPackages />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <ReliableTeam />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <CoreFeatures />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <WebsiteFaq />
      </div>
    </>
  )
}

export default page

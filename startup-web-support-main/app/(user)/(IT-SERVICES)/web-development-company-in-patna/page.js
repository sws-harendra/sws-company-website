
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
        title="website development company in patna | Startup Web Support"
        description="Professional website development company in Patna delivering responsive, secure, and scalable websites tailored to startups and growing businesses."
        canonical="https://startupwebsupport.com/web-development-company-in-patna"
        image="website-development.png"
        keywords="web development company in patna, website development company in patna, web development in patna, Web development company Patna, website development in patna, Best web development company in Patna, web designer in patna, website design in patna, website design company in patna, website developer in patna, web design company in patna, web design company patna, best website development company in patna, website company in patna, web developer in patna, website design services in patna, website company in bihar, website designing company in patna, best website designing company in patna, website designer in patna, website development company in bihar, web development company, website development, web development services, eCommerce Development, ERP Development, development services, CMS Development, web development, website development company, web development agency, website designing company, Best web development services Patna, Patna web design agency, Top web development company Patna, Website design and development Patna, Web development solutions Patna, Best Website Development Company Patna"
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

import SoftwareBenefits from "./components/SoftwareBenefits"
import AdvancedFeatures from "./components/AdvancedFeatures";
import PageDivider from "@/components/PageDivider";
import SoftwareDevFaq from "./components/SoftwareDevFaq";
import SoftwareService from "./components/SoftwareService";

 export const metadata = {
  title: "Software Development Company in Patna | Software Development Services",
  description: "Trusted software development company in Patna delivering custom software, web and app solutions to help businesses scale with secure, reliable technology.",
  keywords:"software development company in patna, best Software Company in Patna, software development in Patna, Top Software Companies in Patna, software development services in patna, best software development company in Patna,software development company, software development services, custom software development services, Cross Platform Development, enterprise software solutions, business automation software, software company in near me, software development agency, inventory management software development, billing software development company, Local Business Apps, SaaS software development company, fitness center management software, gym membership tracking software, poultry farm management software, bespoke software developers, school management software company, inventory tracking software for small business,coaching institute management software"
};

const page = () => {
  return (
    <>
    
    <div>
    <SoftwareBenefits />
    <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
    <AdvancedFeatures />
    <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
    <SoftwareService/>

    <SoftwareDevFaq/>
    </div>
    </>
  )
}

export default page

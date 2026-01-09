import SoftwareBenefits from "./components/SoftwareBenefits"
import AdvancedFeatures from "./components/AdvancedFeatures";
import PageDivider from "@/components/PageDivider";
import SoftwareDevFaq from "./components/SoftwareDevFaq";

 export const metadata = {
  title: "Softwere Devlopment Company in Patna | Startup Web Support",
  description: "Leading software development company in Patna offering custom solutions, innovative web apps, and reliable IT services for startups and businesses.",
  keywords:"Softwere Devlopment Company in Patna",
};

const page = () => {
  return (
    <>
    
    <div>
    <SoftwareBenefits />
    <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
    <AdvancedFeatures />
    <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
    <SoftwareDevFaq/>
    </div>
    </>
  )
}

export default page

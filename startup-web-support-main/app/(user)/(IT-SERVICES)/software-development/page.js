import SoftwareBenefits from "./components/SoftwareBenefits"
import AdvancedFeatures from "./components/AdvancedFeatures";
import PageDivider from "@/components/PageDivider";
import SoftwareDevFaq from "./components/SoftwareDevFaq";

const page = () => {
  return (
    <div>
      <SoftwareBenefits />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <AdvancedFeatures />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <SoftwareDevFaq/>
    </div>
  )
}

export default page

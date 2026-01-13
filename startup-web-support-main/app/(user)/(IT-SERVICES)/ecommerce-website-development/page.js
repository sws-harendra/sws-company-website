import EcommerceFeatures from "./components/EcommerceFeatures";
import GlobalEcommerce from "./components/GlobalEcommerce";
import PageDivider from "@/components/PageDivider";
import HowWeServe from "./components/HowWeServe";
import AdvancedFeatures from "../software-development/components/AdvancedFeatures";
import EcommerceFaq from "./components/EcommerceFaq";
import Seo from "@/components/Seo";

const page = () => {

  return (
    <>
      <Seo
        title="eCommerce Web and App Development Company  in Patna"
        description="Professional eCommerce web and app development company in Patna delivering secure, scalable, and user-friendly online store solutions for business growth."
        canonical="https://startupwebsupport.com/ecommerce-website-development"
        image="sws-logo.png"
        keywords="ecommerce website development, ecommerce service provider"
      />

      <div>

        <EcommerceFeatures />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <GlobalEcommerce />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <HowWeServe />
        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
        <AdvancedFeatures />
        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
        <EcommerceFaq />
      </div>
    </>
  )
}

export default page

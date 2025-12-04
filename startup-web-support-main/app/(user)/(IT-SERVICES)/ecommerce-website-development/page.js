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
        title="Ecommerce Website Development in Patna | Online Store Design & Development"
        description="Startup Web Support offers professional ecommerce website development in Patna including online store design, product management system, payment gateway integration, and custom ecommerce solutions for startups and businesses."
        canonical="https://startupwebsupport.com/ecommerce-website-development"
        image="sws-logo.png"
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

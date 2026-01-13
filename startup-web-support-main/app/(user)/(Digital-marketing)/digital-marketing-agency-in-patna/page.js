import AdvertisingSections from "./components/AdvertisingSections"
import MarketingAdCompany from "./components/Hero"
import MarketingFeatures from "./components/MarketingFeatures"
import Faq from "./components/Faq"
import Hero from "./components/Hero"
import Seo from "@/components/Seo"

const page = () => {
  return (
    <>
      <Seo
        title="Digital Marketing Company in Patna | digital marketing agency for startup"
        description="Results driven digital marketing agency in Patna offering SEO, PPC, social media, and startup-focused strategies to boost online growth and visibility."
        canonical="https://startupwebsupport.com/digital-marketing-agency-in-patna"
        image="sws-logo.png"
        keywords="Digital Marketing Company in Patna, digital marketing in patna, best digital marketing company in patna, digital marketing agency in patna, best digital marketing agency in patna, digital marketing agency in bihar, digital marketing services in patna, Digital Marketing Services Patna, best digital marketing company in bihar, Digital Marketing Agency Patna, best digital marketing services in patna, best digital marketing company in india, best digital marketing company,digital marketing agency for startup,patna digital marketing agency"
      />

      <div>
        <Hero />
        <MarketingFeatures />
        <AdvertisingSections />
        <Faq />
      </div>
    </>
  )
}

export default page

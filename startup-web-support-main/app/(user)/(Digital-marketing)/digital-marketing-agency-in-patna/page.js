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
        title="Digital Marketing Agency in Patna | SEO, SMM & Lead Generation Services"
        description="Startup Web Support is a leading digital marketing agency in Patna offering SEO services, social media marketing, Google ads, Facebook ads, and lead generation solutions to help businesses grow online."
        canonical="https://startupwebsupport.com/digital-marketing-agency-in-patna"
        image="sws-logo.png"
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

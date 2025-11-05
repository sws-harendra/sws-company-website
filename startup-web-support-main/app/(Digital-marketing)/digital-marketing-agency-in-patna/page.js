import AdvertisingSections from "./components/AdvertisingSections"
import MarketingAdCompany from "./components/Hero"
import MarketingFeatures from "./components/MarketingFeatures"
import Faq from "./components/Faq"
import Hero from "./components/Hero"

const page = () => {
  return (
    <div>
        <Hero/>
        <MarketingFeatures/>
        <AdvertisingSections/>
        <Faq/>
    </div>
  )
}

export default page

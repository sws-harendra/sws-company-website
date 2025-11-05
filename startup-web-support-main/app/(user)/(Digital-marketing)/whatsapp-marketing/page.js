import PageDivider from "@/components/PageDivider"
import SuccessStories from "./components/SuccessStories"
import WhatsAppMarketingHero from "./components/WhatsAppMarketingHero"
import WhatsAppServicesDetails from "./components/WhatsAppServicesDetails"
import WhyBestChoice from "./components/WhyBestChoice"
import WhyWhatsAppMarketing from "./components/WhyWhatsAppMarketing"
import WhatsAppFaq from "./components/WhatsAppFaq"

const page = () => {
    return (
        <div>
            <WhatsAppMarketingHero />
            <WhatsAppServicesDetails />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <WhyWhatsAppMarketing />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <WhyBestChoice />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <SuccessStories />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <WhatsAppFaq/>

        </div>
    )
}

export default page

import PageDivider from "@/components/PageDivider"
import CustomEmailCampaigns from "./components/CustomEmailCampaigns"
import EmailMarketingFeatures from "./components/EmailMarketingFeatures"
import EmailMarketingHero from "./components/EmailMarketingHero"
import EmailMarketingFaq from "./components/EmailMarketingFaq"

const page = () => {
    return (
        <div>
            <EmailMarketingHero />
            <CustomEmailCampaigns />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <EmailMarketingFeatures />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <EmailMarketingFaq />
        </div>
    )
}

export default page

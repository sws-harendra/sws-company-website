import PageDivider from "@/components/PageDivider";
import CustomEmailCampaigns from "./components/CustomEmailCampaigns";
import EmailMarketingFeatures from "./components/EmailMarketingFeatures";
import EmailMarketingHero from "./components/EmailMarketingHero";
import EmailMarketingFaq from "./components/EmailMarketingFaq";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <div>
      <Seo
        title="Email Marketing Services in Patna to Boost Leads and Sales."
        description="Reach your audience with email marketing services in Patna. Run targeted campaigns, automate emails, nurture leads, and increase engagement and sales."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />

      <EmailMarketingHero />
      <CustomEmailCampaigns />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <EmailMarketingFeatures />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <EmailMarketingFaq />
    </div>
  );
};

export default page;

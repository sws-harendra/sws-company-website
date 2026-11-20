import PageDivider from "@/components/PageDivider";
import SuccessStories from "./components/SuccessStories";
import WhatsAppMarketingHero from "./components/WhatsAppMarketingHero";
import WhatsAppServicesDetails from "./components/WhatsAppServicesDetails";
import WhyBestChoice from "./components/WhyBestChoice";
import WhyWhatsAppMarketing from "./components/WhyWhatsAppMarketing";
import WhatsAppFaq from "./components/WhatsAppFaq";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <div>
      <Seo
        title="WhatsApp Marketing Services in Patna to Grow Your Business"
        description="Connect with customers using WhatsApp marketing services in Patna. Run targeted campaigns, share updates, automate replies, generate leads, and grow sales."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />
      <WhatsAppMarketingHero />
      <WhatsAppServicesDetails />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <WhyWhatsAppMarketing />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <WhyBestChoice />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <SuccessStories />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <WhatsAppFaq />
    </div>
  );
};

export default page;

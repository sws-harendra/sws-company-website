import Seo from "@/components/Seo";
import CompactCtaBanner from "./components/CompactCtaBanner";
import ContentMarketingFaq from "./components/ContentMarketingFaq";
import ContentMarketingHero from "./components/ContentMarketingHero";
import PartnershipBenefits from "./components/PartnershipBenefits";

const page = () => {
  return (
    <div>
      <Seo
        title="Content Marketing Services in Patna to Drive Business Growth"
        description="Grow your business with content marketing services in Patna. Get strategic content planning, engaging blogs, SEO-friendly content, and more audience engagement."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />
      <ContentMarketingHero />
      <PartnershipBenefits />
      <CompactCtaBanner />
      <ContentMarketingFaq />
    </div>
  );
};

export default page;

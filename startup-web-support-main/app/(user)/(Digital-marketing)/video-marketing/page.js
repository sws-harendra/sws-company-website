import PageDivider from "@/components/PageDivider";
import TailoredVideoServices from "./components/TailoredVideoServices";
import VideoMarketingHero from "./components/VideoMarketingHero";
import WhyVideoMarketing from "./components/WhyVideoMarketing";
import VideoSeoAdsSection from "./components/VideoSeoAdsSection";
import VideoMarketingCta from "./components/VideoMarketingCta";
import VideoMarketingFaq from "./components/VideoMarketingFaq";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <div>
      <Seo
        title="Video Marketing Services in Patna to Grow Your Business Online."
        description="Promote your business with video marketing services in Patna. Create engaging brand videos, product demos, and video ads to reach audiences and generate leads."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />
      <VideoMarketingHero />
      <WhyVideoMarketing />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <TailoredVideoServices />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <VideoSeoAdsSection />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <VideoMarketingCta />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <VideoMarketingFaq />
    </div>
  );
};

export default page;

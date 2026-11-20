import PageDivider from "@/components/PageDivider";
import BrandIdentitySection from "./components/BrandIdentitySection";
import BrandingHero from "./components/BrandingHero";
import ContentStrategySection from "./components/ContentStrategySection";
import DigitalPrSection from "./components/DigitalPrSection";
import SocialBrandingSection from "./components/SocialBrandingSection";
import BrandTransformationCta from "./components/BrandTransformationCta";
import BrandingFaq from "./components/BrandingFaq";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <div>
      <Seo
        title="Branding & Promotion Services in Patna to Grow Your Business."
        description="Build a strong brand with expert branding and promotion services in Patna. Get creative design, digital PR, and targeted campaigns to grow your business."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />
      <BrandingHero />
      <BrandIdentitySection />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <ContentStrategySection />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <DigitalPrSection />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <SocialBrandingSection />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <BrandTransformationCta />
      <BrandingFaq />
    </div>
  );
};

export default page;

import AboutUs from "@/components/AboutUs";
import ClientsScroller from "@/components/ClientsScroller";
import FeaturedServices from "@/components/FeaturedServices";
import IndustriesSection from "@/components/IndustriesSection";
import PageDivider from "@/components/PageDivider";
import ServiceFeatures from "@/components/ServiceFeatures";
import HeroSlider from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import Call from "@/components/call";
import WhatsAppButton from "@/components/whatsapp";

const page = () => {
  return (
    <div className="overflow-hidden">
      {/* <Hero /> */}
      <Call />
      <WhatsAppButton />
      <HeroSlider />
      <FeaturedServices />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <AboutUs />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <ServiceFeatures />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <IndustriesSection />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <ClientsScroller />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <Testimonials />
    </div>
  );
};

export default page;

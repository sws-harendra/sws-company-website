import Seo from "@/components/Seo";
import Hero from "./components/Hero";
import TeamSection from "./components/Teams";
import VisionMissionSection from "./components/VisionMissionSection";

const page = () => {
  return (
    <>
      <Seo
        title="About Us | Startup Web Support – Leading IT Company in Patna"
        description="Learn about Startup Web Support, a leading IT company in Patna offering website development, software solutions, digital marketing, SEO, and mobile app development services."
        canonical="https://startupwebsupport.com/about-us"
        image="sws-logo.png"
      />

      <div>
        <Hero />
        <VisionMissionSection />
        <TeamSection />
      </div>
    </>
  );
};

export default page;

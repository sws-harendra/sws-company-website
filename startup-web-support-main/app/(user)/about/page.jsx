import Hero from "./components/Hero";
import TeamSection from "./components/Teams";
import VisionMissionSection from "./components/VisionMissionSection";

const page = () => {
  return (
    <div>
      <Hero />
      <VisionMissionSection />
      <TeamSection />
    </div>
  );
};

export default page;

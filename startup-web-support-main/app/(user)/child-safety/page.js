import ChildSafetyHero from "./components/ChildSafetyHero"
import ChildSafetyPolicyContent from "./components/ChildSafetyPolicyContent"

const metadata = {
  title: "Child Safety Policy | Startup Web Support",
  description: "Learn how Startup Web Support ensures child safety with strict policies, data protection practices, and a secure digital environment for all users.",
};

const page = () => {
  return (
    <div>
      <ChildSafetyHero />
      <ChildSafetyPolicyContent />
    </div>
  )
}

export default page

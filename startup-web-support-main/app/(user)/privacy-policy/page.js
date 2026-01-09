import PrivacyPolicyContent from "./components/PrivacyPolicyContent"
import PrivacyPolicyHero from "./components/PrivacyPolicyHero"

export const metadata = {
  title: "Privacy Policy | Startup Web Support",
  description: "Trusted software company in Patna delivering web development, mobile apps, and IT solutions to help businesses grow with secure, scalable technology.",
};

const page = () => {
  return (
    <div>
      <PrivacyPolicyHero/>
      <PrivacyPolicyContent/>
    </div>
  )
}

export default page

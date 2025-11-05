import PageDivider from "@/components/PageDivider"
import LegalHero from "./components/LegalHero"
import PartnershipSection from "./components/PartnershipSection"
import ProprietorshipSection from "./components/ProprietorshipSection"
import PrivateLimitedSection from "./components/PrivateLimitedSection"
import TrustRegistrationSection from "./components/TrustRegistrationSection"
import LlpRegistrationSection from "./components/LlpRegistrationSection"
import Section8CompanySection from "./components/Section8CompanySection"
import NidhiCompanySection from "./components/NidhiCompanySection"
import OpcRegistrationSection from "./components/OpcRegistrationSection"

const page = () => {
    return (
        <div>
            <LegalHero />
            <ProprietorshipSection />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <PartnershipSection />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <PrivateLimitedSection />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <TrustRegistrationSection />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <LlpRegistrationSection />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <Section8CompanySection />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <NidhiCompanySection />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <OpcRegistrationSection />
        </div>
    )
}

export default page

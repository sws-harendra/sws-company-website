import HostingSolutions from "./components/HostingSolutions";
import HighPerformanceHosting from "./components/HighPerformanceHosting";
import PageDivider from "@/components/PageDivider";
import DomainHostingFaq from "./components/DomainHostingFaq";
import Seo from "@/components/Seo";
import DomainHostingSection from './components/DomainHostingSection';
import DomainHostingPackageSection from "./components/DomainHostingPackageSection";

const page = () => {
    return (
        <>
            <Seo
                title="Domain and Hosting Provider Company in Patna | Startup Web Support"
                description="Reliable domain and hosting provider company in Patna offering secure, fast, and affordable hosting solutions with expert support for startups and businesses."
                canonical="https://startupwebsupport.com/domain-and-hosting"
                image="sws-logo.png"
                keywords="domain hosting Patna, domain registration Patna, domain hosting, domain hosting company India, domain hosting services, domain hosting with email, domain hosting for small business, domain registration & hosting, web hosting & domain, web hosting in patna, web hosting patna, cheap domain hosting India, domain and hosting services"
            />

            <div>
                <HostingSolutions />
                <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
                <HighPerformanceHosting />
                <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
                <DomainHostingSection/> 
                <DomainHostingPackageSection />
                <DomainHostingFaq />
            </div>
        </>
    )
}

export default page

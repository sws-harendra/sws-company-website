import HostingSolutions from "./components/HostingSolutions";
import HighPerformanceHosting from "./components/HighPerformanceHosting";
import PageDivider from "@/components/PageDivider";
import DomainHostingFaq from "./components/DomainHostingFaq";
import Seo from "@/components/Seo";

const page = () => {
    return (
        <>
            <Seo
                title="Domain & Hosting Services in Patna | Fast & Secure Web Hosting Solutions"
                description="Startup Web Support provides domain registration and fast, secure web hosting services in Patna. Get reliable hosting, domain setup, business email, and complete website support at affordable pricing."
                canonical="https://startupwebsupport.com/domain-and-hosting"
                image="sws-logo.png"
            />

            <div>
                <HostingSolutions />
                <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
                <HighPerformanceHosting />
                <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
                <DomainHostingFaq />
            </div>
        </>
    )
}

export default page

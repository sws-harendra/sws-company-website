import HostingSolutions from "./components/HostingSolutions";
import HighPerformanceHosting from "./components/HighPerformanceHosting";
import PageDivider from "@/components/PageDivider";
import DomainHostingFaq from "./components/DomainHostingFaq";

const page = () => {
    return (
        <div>
            <HostingSolutions />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <HighPerformanceHosting />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <DomainHostingFaq />
        </div>
    )
}

export default page

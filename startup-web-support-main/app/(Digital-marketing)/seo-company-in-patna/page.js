import PageDivider from "@/components/PageDivider"
import Hero from "./components/Hero"
import SeoCoreServices from "./components/SeoCoreServices"
import WhyChooseSeo from "./components/WhyChooseSeo"
import WhyBestSeo from "./components/WhyBestSeo"
import SeoCta from "./components/SeoCta"
import SeoFaq from "./components/SeoFaq"

const page = () => {
    return (
        <div>
            <Hero />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <SeoCoreServices />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <WhyChooseSeo />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <WhyBestSeo />
            <SeoCta/>
            <SeoFaq/>
        </div>
    )
}

export default page

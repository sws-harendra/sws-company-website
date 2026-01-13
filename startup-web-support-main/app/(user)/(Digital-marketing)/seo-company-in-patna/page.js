import PageDivider from "@/components/PageDivider"
import Hero from "./components/Hero"
import SeoCoreServices from "./components/SeoCoreServices"
import WhyChooseSeo from "./components/WhyChooseSeo"
import WhyBestSeo from "./components/WhyBestSeo"
import SeoCta from "./components/SeoCta"
import SeoFaq from "./components/SeoFaq"
export const metadata = {
  title: "SEO Company In Patna | Best SEO Services Agency In Patna",
  description: "Trusted software development company in Patna delivering custom software, web and app solutions to help businesses scale with secure, reliable technologyBest SEO company in Patna delivering result-driven SEO services to boost website rankings, traffic, and online visibility for lasting business growth.",
  keywords:"Keyword:  seo company in patna, seo services in patna, Best SEO Company in Patna, seo in patna, seo agency in patna, top seo company in patna, best seo services in patna, seo company in bihar, seo company patna, seo services patna, seo agency patna, seo services in bihar, SEO Service in Patna, search engine optimization in patna, best seo company in bihar, best seo in patna, best seo company in India, best seo company, top seo company in india, top seo agency, web seo company, top seo agency in india, best seo service provider in india, best search engine optimization company, best search engine optimization company in india"
};

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

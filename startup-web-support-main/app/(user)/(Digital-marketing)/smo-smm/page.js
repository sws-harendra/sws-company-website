import PageDivider from "@/components/PageDivider"
import SmoServicesDetails from "./components/SmoServicesDetails"
import SmoSmmHero from "./components/SmoSmmHero"
import WhySmoSmm from "./components/WhySmoSmm"
import WhyChooseSmoSmmDetails from "./components/WhyChooseSmoSmmDetails"
import TrendingSmoSmmStrategies from "./components/TrendingSmoSmmStrategies"
import SmoSmmFaq from "./components/SmoSmmFaq"

const page = () => {
    return (
        <div>
            <SmoSmmHero />
            <SmoServicesDetails />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <WhySmoSmm />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <WhyChooseSmoSmmDetails />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <TrendingSmoSmmStrategies />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <SmoSmmFaq />
        </div>
    )
}

export default page

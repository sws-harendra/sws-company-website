import PageDivider from "@/components/PageDivider"
import InternshipDetails from "./components/InternshipDetails"
import ITInternshipHero from "./components/ITInternshipHero"
import WhyChooseInternship from "./components/WhyChooseInternship"
import InternshipExpectations from "./components/InternshipExpectations"
import InternshipSkills from "./components/InternshipSkills"
import HowToApplyInternship from "./components/HowToApplyInternship"

const page = () => {
    return (
        <div>
            <ITInternshipHero />
            <InternshipDetails />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <WhyChooseInternship />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <InternshipExpectations />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <InternshipSkills />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <HowToApplyInternship />
        </div>
    )
}

export default page

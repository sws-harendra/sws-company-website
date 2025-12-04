import PageDivider from "@/components/PageDivider"
import InternshipDetails from "./components/InternshipDetails"
import ITInternshipHero from "./components/ITInternshipHero"
import WhyChooseInternship from "./components/WhyChooseInternship"
import InternshipExpectations from "./components/InternshipExpectations"
import InternshipSkills from "./components/InternshipSkills"
import HowToApplyInternship from "./components/HowToApplyInternship"
import Seo from "@/components/Seo"

const page = () => {
    return (
        <>
            <Seo
                title="IT Internship in Patna | BCA & MCA Internship with Live Projects"
                description="Join the best IT internship in Patna for BCA, MCA, and B.Tech students. Get practical training in web development, software development, digital marketing, and mobile app development with live projects and certification."
                canonical="https://startupwebsupport.com/it-internship"
                image="sws-logo.png"
            />

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
        </>
    )
}

export default page

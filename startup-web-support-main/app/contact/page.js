import PageDivider from "@/components/PageDivider"
import Contact from "./components/Contact"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfoSection"

const page = () => {
  return (
    <div>
      <ContactHero />
      <Contact />
      <ContactInfo />
    </div>
  )
}

export default page

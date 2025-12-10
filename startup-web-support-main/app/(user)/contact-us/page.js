import PageDivider from "@/components/PageDivider"
import Contact from "./components/Contact"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfoSection"
import Seo from "@/components/Seo"

const page = () => {
  return (
    <>
      <Seo
        title="Contact Startup Web Support | IT Company in Patna"
        description="Contact Startup Web Support, a leading IT company in Patna for website development, software development, digital marketing, SEO services, and mobile app development. Get in touch with our team today."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />

      <div>
        <ContactHero />
        <Contact />
        <ContactInfo />
      </div>
    </>
  )
}

export default page

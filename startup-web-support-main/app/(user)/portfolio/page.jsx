import Seo from "@/components/Seo"
import PortfolioGrid from "./components/PortfolioGrid"
import PortfolioHero from "./components/PortfolioHero"

const page = () => {
  return (
    <>
      <Seo
        title="Our Portfolio | Website Development & IT Projects by Startup Web Support"
        description="Explore the portfolio of Startup Web Support showcasing website development projects, software solutions, digital marketing results, and IT services delivered to clients across Patna and Bihar."
        canonical="https://startupwebsupport.com/portfolio"
        image="./hms/dashboard.png"
      />

      <div>
        <PortfolioHero />
        <PortfolioGrid />
      </div>
    </>
  )
}

export default page
